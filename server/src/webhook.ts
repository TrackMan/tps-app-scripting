import express, { Request, Response } from 'express';
import eventsLib, { classifyEventPayload, KnownEventPayload } from './events';

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

    if (validationEvent) {
      const code = extractValidationCode(validationEvent) || (validationEvent.data && validationEvent.data.validationCode) || undefined;
      console.log(`EventGrid subscription validation (event) for ${userPath}:`, validationEvent?.data || validationEvent, '=> code=', code);
      if (code) return res.status(200).json({ validationResponse: code });
    }

    const aegHeader = (req.header('aeg-event-type') || '').toString();
    if (aegHeader && aegHeader.toLowerCase().includes('subscriptionvalidation') && events.length > 0) {
      const maybe = events[0] as any;
      const code = extractValidationCode(maybe);
      console.log(`EventGrid header-based validation for ${userPath}: aeg=${aegHeader} =>`, maybe, '=> code=', code);
      if (code) return res.status(200).json({ validationResponse: code });
    }

    // Normal events: log and ack
    try {
      console.log(`Received ${events.length} event(s) for webhook ${userPath}`);
      console.log(JSON.stringify(events.map((e: any) => ({ id: e.id, eventType: e.eventType })), null, 2));
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

    // Append events to in-memory store for this path
    try {
      const records: EventRecord[] = events.map((e: any) => normalize(e));

      const existing = eventStore.get(userPath) || [];
      const combined = [...records.reverse(), ...existing];
      const trimmed = combined.slice(0, EVENT_STORE_CAP);
      eventStore.set(userPath, trimmed);
    } catch (err) {
      console.warn('Failed to store events in memory', (err as Error).message);
    }

    // Notify any SSE clients connected to this webhook path
    try {
      for (const e of events) {
        // reuse normalization logic to ensure SSE payloads include typed when available
        const ev = ((): EventRecord => {
          try {
            const nr = (normalize as any)(e) as EventRecord;
            return nr;
          } catch (err) {
            return {
              id: e?.id,
              eventType: String(e?.eventType || e?.EventType || e?.type || '').trim(),
              timestamp: e?.eventTime || e?.time || new Date().toISOString(),
              data: e?.data ?? e?.Data ?? null,
              raw: e,
              typed: null,
              common: null,
            };
          }
        })();
        sendSseToPath(userPath, ev);
      }
    } catch (err) {
      console.warn('Failed to broadcast SSE', (err as Error).message);
    }

    return res.status(200).json({ received: events.length });
  });

  // Return events for a specific webhook path (newest first).
  app.get('/api/webhook/:userPath/events', (req: Request, res: Response) => {
    const userPath = req.params.userPath;
    const list = eventStore.get(userPath) || [];
    return res.json({ count: list.length, events: list });
  });

  // Server-Sent Events stream for a webhook path.
  app.get('/api/webhook/:userPath/stream', (req: Request, res: Response) => {
    const userPath = req.params.userPath;

    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
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

    req.on('close', () => {
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
}

export { eventStore, lastWebhookDiagnostics, sseClients };
