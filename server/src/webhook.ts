import express, { Request, Response } from 'express';
import eventsLib, { classifyEventPayload, KnownEventPayload } from './events';
import { webhookEventStorage } from './storage';

// In-memory event store per webhook path (newest items at start). This is ephemeral and
// will be lost if the server restarts. We keep a modest cap per path.
export type EventRecord = {
  id?: string;
  eventType: string;
  timestamp: string; // ISO
  data: any;
  raw: any;
  // optional strongly-typed payload when we can classify the event
  typed?: KnownEventPayload | null;
  // common metadata extracted from many events (facility/location/bay/etc)
  common?: import('./events').CommonEventData | null;
};

const EVENT_STORE_CAP = 200;
const eventStore = new Map<string, EventRecord[]>();

// For debugging: store last request headers and body per path
const lastWebhookDiagnostics = new Map<string, { headers: any; body: any }>();

// SSE clients per webhook path
const sseClients = new Map<string, Set<Response>>();

function sendSseToPath(userPath: string, payload: any) {
  const clients = sseClients.get(userPath);
  if (!clients) return;
  const data = typeof payload === 'string' ? payload : JSON.stringify(payload);
  for (const res of clients) {
    try {
      res.write(`data: ${data}\n\n`);
      // Explicitly flush to ensure immediate delivery (important for proxied connections)
      if (typeof (res as any).flush === 'function') {
        (res as any).flush();
      }
    } catch (err) {
      console.warn('Failed to write SSE to client', (err as Error).message);
    }
  }
}

export function registerWebhookRoutes(app: express.Application) {
  // Event Grid webhook for per-user webhook paths.
  // Example: POST /api/webhook/<user-unique-path>
  // If WEBHOOK_ALLOWED_KEYS is set (comma-separated), the :userPath must be present there.
  app.post('/api/webhook/:userPath', (req: Request, res: Response) => {
    const userPath = req.params.userPath;

    // Optional allow-list: comma separated keys in env var WEBHOOK_ALLOWED_KEYS
    const allowed = process.env.WEBHOOK_ALLOWED_KEYS;
    if (allowed) {
      const allowedSet = new Set(allowed.split(',').map((s) => s.trim()).filter(Boolean));
      if (!allowedSet.has(userPath)) {
        console.warn(`Rejected webhook for unknown key: ${userPath}`);
        return res.status(404).json({ error: 'unknown webhook path' });
      }
    }

    // Normalize body to array
    const events = Array.isArray(req.body) ? req.body : req.body ? [req.body] : [];

    // Save last request for diagnostics
    try {
      lastWebhookDiagnostics.set(userPath, { headers: req.headers, body: events });
    } catch (err) {
      // ignore
    }

    // Diagnostic: log aeg-event-type header when present (helps Azure debugging)
    try {
      const aeg = String(req.header('aeg-event-type') || '');
      if (aeg) console.log(`aeg-event-type: ${aeg}`);
    } catch (err) {
      // ignore
    }

    const extractValidationCode = (ev: any): string | undefined => {
      if (!ev) return undefined;
      const data = ev.data || ev.Data || ev.DATA || ev;
      if (data && typeof data === 'object') {
        for (const key of Object.keys(data)) {
          if (key.toLowerCase() === 'validationcode' && data[key]) return String(data[key]);
        }
      }
      for (const key of Object.keys(ev)) {
        if (key.toLowerCase() === 'validationcode' && ev[key]) return String(ev[key]);
      }
      return undefined;
    };

    const validationEvent = events.find((e: any) => {
      if (!e) return false;
      const et = (e.eventType || e.EventType || '').toString();
      return (
        et === 'Microsoft.EventGrid.SubscriptionValidationEvent' ||
        et === 'Microsoft.EventGridSubscriptionValidationEvent' ||
        et === 'Microsoft.EventGrid.SubscriptionValidation' ||
        et.toLowerCase().includes('subscriptionvalidation')
      );
    });

    // Handle validation but don't return early if there are other events to process
    let validationCode: string | undefined = undefined;
    if (validationEvent) {
      const code = extractValidationCode(validationEvent) || (validationEvent.data && validationEvent.data.validationCode) || undefined;
      console.log(`EventGrid subscription validation (event) for ${userPath}:`, validationEvent?.data || validationEvent, '=> code=', code);
      validationCode = code;
    }

    const aegHeader = (req.header('aeg-event-type') || '').toString();
    if (!validationCode && aegHeader && aegHeader.toLowerCase().includes('subscriptionvalidation') && events.length > 0) {
      const maybe = events[0] as any;
      const code = extractValidationCode(maybe);
      console.log(`EventGrid header-based validation for ${userPath}: aeg=${aegHeader} =>`, maybe, '=> code=', code);
      validationCode = code;
    }

    // Filter out validation events from processing
    const normalEvents = events.filter((e: any) => {
      const et = (e?.eventType || e?.EventType || '').toString();
      return !et.toLowerCase().includes('subscriptionvalidation');
    });

    // If we only received validation events, return the validation response
    if (validationCode && normalEvents.length === 0) {
      return res.status(200).json({ validationResponse: validationCode });
    }

    // Continue processing normal events (use normalEvents instead of events)
    const eventsToProcess = normalEvents.length > 0 ? normalEvents : events;    // Normal events: log and ack
    try {
      console.log(`Received ${eventsToProcess.length} event(s) for webhook ${userPath}`);
      console.log(JSON.stringify(eventsToProcess.map((e: any) => ({ id: e.id, eventType: e.eventType })), null, 2));
    } catch (err) {
      console.warn('Failed to log events', (err as Error).message);
    }

    // Prepare normalization helper and timestamp for this request so SSE can reuse it
    const now = new Date().toISOString();
    const normalize = (e: any): EventRecord => {
      const eventType = e?.eventType || e?.EventType || e?.type || e?.Type || (e && e['event-type']) || '';
      const timestamp = e?.eventTime || e?.event_time || e?.time || e?.Time || now;
      const data = e?.data ?? e?.Data ?? null;
      const base: EventRecord = {
        id: e?.id,
        eventType: String(eventType || '').trim(),
        timestamp: timestamp,
        data,
        raw: e,
        typed: null,
      };

        // Attempt to classify and attach typed payload and common metadata when possible
      try {
          const classified = classifyEventPayload(e);
          if (classified && classified.typed) {
            base.typed = classified.typed as KnownEventPayload;
            base.common = (classified as any).common ?? null;
            // prefer eventType from classifier when available
            if (classified.name) base.eventType = classified.name;
            console.log(`Classified event for webhook ${userPath} as ${classified.name}`);
          } else {
            // also try classifying the data payload directly
            const classifiedData = classifyEventPayload(data);
            if (classifiedData && classifiedData.typed) {
              base.typed = classifiedData.typed as KnownEventPayload;
              base.common = (classifiedData as any).common ?? null;
              if (classifiedData.name) base.eventType = classifiedData.name;
              console.log(`Classified event data for webhook ${userPath} as ${classifiedData.name}`);
            }
          }
      } catch (err) {
        // don't fail the webhook if classification fails
        console.warn('Event classification error:', (err as Error).message);
      }

      return base;
    };

    // Append minimal records (no heavy classification) to in-memory store for this path
    try {
      const minimalNormalize = (ev: any): EventRecord => {
        const eventType = ev?.eventType || ev?.EventType || ev?.type || ev?.Type || (ev && ev['event-type']) || '';
        const timestamp = ev?.eventTime || ev?.event_time || ev?.time || ev?.Time || new Date().toISOString();
        return {
          id: ev?.id,
          eventType: String(eventType || '').trim(),
          timestamp,
          data: ev?.data ?? ev?.Data ?? null,
          raw: ev,
          typed: null,
          common: null,
        };
      };

      const minimalRecords: EventRecord[] = eventsToProcess.map((e: any) => minimalNormalize(e));
      const existing = eventStore.get(userPath) || [];
      const combined = [...minimalRecords.reverse(), ...existing];
      const trimmed = combined.slice(0, EVENT_STORE_CAP);
      eventStore.set(userPath, trimmed);

      // Persist to Azure Table Storage (async, don't block webhook response)
      for (const record of minimalRecords) {
        webhookEventStorage.storeEvent(userPath, record).catch(err => {
          console.warn('Background storage error:', err?.message || err);
        });
      }
    } catch (err) {
      console.warn('Failed to store events in memory', (err as Error).message);
    }

    // Notify any SSE clients connected to this webhook path: send minimal record immediately,
    // then run classification asynchronously and send an enriched update when ready.
    try {
      for (const e of eventsToProcess) {
        const tStart = Date.now();
        try {
          console.log(`[webhook] receive start path=${userPath} eventId=${e?.id || 'n/a'} ts=${new Date(tStart).toISOString()}`);
        } catch (_) { /* ignore */ }

        // Build minimal record (same shape as stored)
        const minimal: EventRecord = {
          id: e?.id,
          eventType: String(e?.eventType || e?.EventType || e?.type || '').trim(),
          timestamp: e?.eventTime || e?.time || new Date().toISOString(),
          data: e?.data ?? e?.Data ?? null,
          raw: e,
          typed: null,
          common: null,
        };

        // Send minimal SSE immediately
        sendSseToPath(userPath, minimal);

        const tAfterSend = Date.now();
        try {
          console.log(`[webhook] minimal SSE sent path=${userPath} eventId=${minimal.id || 'n/a'} elapsedMs=${tAfterSend - tStart}`);
        } catch (_) {}

        // Classify/enrich asynchronously to avoid blocking the request
        (async () => {
          const classifyStart = Date.now();
          try {
            const classified = classifyEventPayload(e);
            if (classified && classified.typed) {
              // Build enriched record
              const enriched: EventRecord = { ...minimal };
              enriched.typed = classified.typed as any;
              enriched.common = (classified as any).common ?? null;
              if ((classified as any).name) enriched.eventType = (classified as any).name;

              // Update eventStore: replace the minimal record we inserted earlier (match by id if present)
              try {
                const existingList = eventStore.get(userPath) || [];
                const idx = existingList.findIndex(r => (r.id && enriched.id && r.id === enriched.id) || r.raw === enriched.raw);
                if (idx >= 0) {
                  const updated = existingList.slice();
                  updated[idx] = enriched;
                  eventStore.set(userPath, updated);
                }
              } catch (err) {
                console.warn('Failed to update eventStore with enriched record', (err as Error).message);
              }

              // Send enriched SSE to clients
              try {
                sendSseToPath(userPath, enriched);
                const classifyEnd = Date.now();
                console.log(`[webhook] enriched SSE sent path=${userPath} eventId=${enriched.id || 'n/a'} classifyMs=${classifyEnd - classifyStart} totalMs=${classifyEnd - tStart}`);
              } catch (err) {
                console.warn('Failed to send enriched SSE', (err as Error).message);
              }
            } else {
              // If classification yielded nothing useful, we still log timing
              const classifyEnd = Date.now();
              console.log(`[webhook] classification no-op path=${userPath} eventId=${e?.id || 'n/a'} classifyMs=${classifyEnd - classifyStart}`);
            }
          } catch (err) {
            console.warn('Async classification error', (err as Error).message);
          }
        })();
      }
    } catch (err) {
      console.warn('Failed to broadcast SSE', (err as Error).message);
    }

    // Return response with validation code if present, otherwise just received count
    if (validationCode) {
      return res.status(200).json({ validationResponse: validationCode, received: eventsToProcess.length });
    }
    return res.status(200).json({ received: eventsToProcess.length });
  });

  // Return events for a specific webhook path (newest first).
  // Combines in-memory cache with Table Storage for complete history.
  app.get('/api/webhook/:userPath/events', async (req: Request, res: Response) => {
    const userPath = req.params.userPath;
    const limit = parseInt(req.query.limit as string) || 2000;
    const includeStorage = req.query.storage !== 'false'; // Allow disabling via ?storage=false

    // Start with in-memory events (fast)
    const inMemoryEvents = eventStore.get(userPath) || [];
    
    // If we have enough in memory or storage is disabled, return immediately
    if (inMemoryEvents.length >= limit || !includeStorage) {
      return res.json({ 
        count: inMemoryEvents.length, 
        events: inMemoryEvents.slice(0, limit),
        source: 'memory',
        storageEnabled: webhookEventStorage.isEnabled(),
      });
    }

    // Query Table Storage for more history
    try {
      const { events: storageEvents } = await webhookEventStorage.getEvents(userPath, { limit });
      
      // Merge and deduplicate by event ID
      const eventMap = new Map<string, EventRecord>();
      
      // Add storage events first (older)
      for (const evt of storageEvents) {
        const key = evt.id || `${evt.timestamp}_${evt.eventType}`;
        eventMap.set(key, evt);
      }
      
      // Add in-memory events (newer, may override)
      for (const evt of inMemoryEvents) {
        const key = evt.id || `${evt.timestamp}_${evt.eventType}`;
        eventMap.set(key, evt);
      }
      
      const mergedEvents = Array.from(eventMap.values())
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        .slice(0, limit);

      return res.json({ 
        count: mergedEvents.length, 
        events: mergedEvents,
        source: 'memory+storage',
        storageEnabled: webhookEventStorage.isEnabled(),
      });
    } catch (err) {
      console.error('Error querying storage:', err);
      // Fallback to in-memory only
      return res.json({ 
        count: inMemoryEvents.length, 
        events: inMemoryEvents.slice(0, limit),
        source: 'memory (storage error)',
        storageEnabled: webhookEventStorage.isEnabled(),
      });
    }
  });

  // Delete (clear) events for a specific webhook path
  app.delete('/api/webhook/:userPath/events', async (req: Request, res: Response) => {
    const userPath = req.params.userPath;
    const list = eventStore.get(userPath) || [];
    const memoryCount = list.length;
    eventStore.set(userPath, []);
    
    // Also clear from Table Storage
    const storageCount = await webhookEventStorage.deleteEvents(userPath);
    
    console.log(`Cleared ${memoryCount} in-memory events and ${storageCount} storage events for webhook ${userPath}`);
    return res.json({ 
      cleared: memoryCount + storageCount,
      memory: memoryCount,
      storage: storageCount,
    });
  });

  // Server-Sent Events stream for a webhook path.
  app.get('/api/webhook/:userPath/stream', (req: Request, res: Response) => {
    const userPath = req.params.userPath;

    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no', // Disable buffering for Azure/nginx proxies
    });

    res.write(': connected\n\n');

    const set = sseClients.get(userPath) || new Set<Response>();
    set.add(res);
    sseClients.set(userPath, set);

    // Log connection for debugging (shows remote address and total clients for the path)
    try {
      const remote = (req.ip || (req.socket && (req.socket.remoteAddress || req.socket.remoteFamily)) || 'unknown');
      console.log(`SSE connected: path=${userPath} remote=${remote} clients=${set.size}`);
    } catch (err) {
      // ignore logging errors
    }

    // Send keepalive comments every 30 seconds to prevent proxy timeouts
    const keepaliveInterval = setInterval(() => {
      try {
        res.write(': keepalive\n\n');
      } catch (err) {
        clearInterval(keepaliveInterval);
      }
    }, 30000);

    req.on('close', () => {
      clearInterval(keepaliveInterval);
      const clients = sseClients.get(userPath);
      if (clients) {
        clients.delete(res);
        if (clients.size === 0) sseClients.delete(userPath);
      }
      try {
        const remote = (req.ip || (req.socket && (req.socket.remoteAddress || req.socket.remoteFamily)) || 'unknown');
        console.log(`SSE disconnected: path=${userPath} remote=${remote} remaining=${sseClients.get(userPath)?.size || 0}`);
      } catch (err) {
        // ignore
      }
    });
  });

  // Diagnostic: number of SSE clients for a given webhook path
  app.get('/__diag/webhook-sse/:userPath', (req: Request, res: Response) => {
    const userPath = req.params.userPath;
    const clients = sseClients.get(userPath) || new Set<Response>();
    return res.json({ path: userPath, clients: clients.size, keys: Array.from(sseClients.keys()) });
  });

  // Diagnostic endpoint to inspect last webhook request for a path
  app.get('/__diag/webhook/:userPath', (req: Request, res: Response) => {
    const userPath = req.params.userPath;
    const diag = lastWebhookDiagnostics.get(userPath) || null;
    const stored = eventStore.get(userPath) || [];
    return res.json({ lastRequest: diag, storedCount: stored.length });
  });

  // Debug: list all webhook keys currently stored (temporary)
  app.get('/__diag/webhook-keys', (_req: Request, res: Response) => {
    const keys = Array.from(eventStore.keys());
    return res.json({ keys, count: keys.length });
  });

  // CDN Proxy: Forward requests to cdn.trackmangolf.com to avoid CORS issues
  app.get('/cdn-proxy/*', async (req: Request, res: Response) => {
    try {
      const cdnPath = req.params[0]; // Everything after /cdn-proxy/
      const cdnUrl = `https://cdn.trackmangolf.com/${cdnPath}`;
      
      console.log(`[CDN Proxy] Fetching: ${cdnUrl}`);
      
      const response = await fetch(cdnUrl);
      
      if (!response.ok) {
        console.error(`[CDN Proxy] Failed to fetch ${cdnUrl}: ${response.status}`);
        return res.status(response.status).send(`Failed to fetch from CDN: ${response.statusText}`);
      }
      
      // Forward the content type from the CDN
      const contentType = response.headers.get('content-type');
      if (contentType) {
        res.setHeader('Content-Type', contentType);
      }
      
      // Set CORS headers to allow frontend access
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET');
      
      // Stream the response body
      const buffer = await response.arrayBuffer();
      res.send(Buffer.from(buffer));
    } catch (err) {
      console.error('[CDN Proxy] Error:', err);
      res.status(500).send('Failed to proxy CDN request');
    }
  });
}

export { eventStore, lastWebhookDiagnostics, sseClients };
