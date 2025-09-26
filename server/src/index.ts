import path from "path";
import fs from "fs";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";

const app = express();
// Prefer explicit PORT, then WEBSITES_PORT (used by Azure App Service), then default to 4000
const PORT = process.env.PORT
  ? parseInt(process.env.PORT, 10)
  : process.env.WEBSITES_PORT
  ? parseInt(process.env.WEBSITES_PORT, 10)
  : 4000;

app.use(cors({ origin: true }));
app.use(express.json());

// Mock user for auth endpoints
const mockUser = {
  id: "user-1",
  name: "Demo User",
  avatar:
    "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&s=128",
};

// API mounted under /api to make it easy to host frontend and backend together
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

app.get("/api/me", (_req: Request, res: Response) => {
  res.json({ authenticated: true, profile: mockUser });
});

app.post("/api/logout", (_req: Request, res: Response) => {
  res.json({ ok: true });
});

// Event Grid webhook for per-user webhook paths.
// Example: POST /api/webhook/<user-unique-path>
// If WEBHOOK_ALLOWED_KEYS is set (comma-separated), the :userPath must be present there.
app.post("/api/webhook/:userPath", (req: Request, res: Response) => {
  const userPath = req.params.userPath;

  // Optional allow-list: comma separated keys in env var WEBHOOK_ALLOWED_KEYS
  const allowed = process.env.WEBHOOK_ALLOWED_KEYS;
  if (allowed) {
    const allowedSet = new Set(allowed.split(",").map(s => s.trim()).filter(Boolean));
    if (!allowedSet.has(userPath)) {
      console.warn(`Rejected webhook for unknown key: ${userPath}`);
      return res.status(404).json({ error: "unknown webhook path" });
    }
  }

  // Event Grid usually sends an array, but some proxies or transports may send a single
  // object. Normalize to an array for easier handling.
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

  // Helper: extract validation code from an event object in a forgiving way.
  const extractValidationCode = (ev: any): string | undefined => {
    if (!ev) return undefined;
    // Common places: ev.data.validationCode (case variants)
    const data = ev.data || ev.Data || ev.DATA || ev;
    if (data && typeof data === 'object') {
      for (const key of Object.keys(data)) {
        if (key.toLowerCase() === 'validationcode' && data[key]) return String(data[key]);
      }
    }
    // Some transports may put the code at the top-level
    for (const key of Object.keys(ev)) {
      if (key.toLowerCase() === 'validationcode' && ev[key]) return String(ev[key]);
    }
    return undefined;
  };

  // Event Grid subscription validation can arrive as:
  // - an event in the array with eventType matching expected strings
  // - header-based flows where 'aeg-event-type' tells us it's a validation attempt
  // Try to find any validation code in the incoming payloads.
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

  // Also handle the header-based SubscriptionValidation flow: check aeg header and try first event
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
    // For debugging include a small sample of events
    console.log(JSON.stringify(events.map((e: any) => ({ id: e.id, eventType: e.eventType })), null, 2));
  } catch (err) {
    console.warn('Failed to log events', (err as Error).message);
  }

  // Append events to in-memory store for this path
  try {
    const now = new Date().toISOString();
    const records: EventRecord[] = events.map((e: any) => ({
      id: e.id,
      eventType: e.eventType,
      timestamp: e.eventTime || now,
      data: e.data,
      raw: e,
    }));

    const existing = eventStore.get(userPath) || [];
    // Newest at start
    const combined = [...records.reverse(), ...existing];
    // Trim to cap
    const trimmed = combined.slice(0, EVENT_STORE_CAP);
    eventStore.set(userPath, trimmed);
  } catch (err) {
    console.warn('Failed to store events in memory', (err as Error).message);
  }

  // Notify any SSE clients connected to this webhook path
  try {
    for (const e of events) {
      const payload = {
        id: e.id,
        eventType: e.eventType,
        timestamp: e.eventTime || new Date().toISOString(),
        data: e.data,
        raw: e,
      };
      sendSseToPath(userPath, payload);
    }
  } catch (err) {
    console.warn('Failed to broadcast SSE', (err as Error).message);
  }

  // TODO: integrate with persistence / user properties: look up which user has this key
  // and forward/enqueue events appropriately.

  return res.status(200).json({ received: events.length });
});

// In-memory event store per webhook path (newest items at start). This is ephemeral and
// will be lost if the server restarts. We keep a modest cap per path.
type EventRecord = {
  id?: string;
  eventType: string;
  timestamp: string; // ISO
  data: any;
  raw: any;
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

// Return events for a specific webhook path (newest first). No auth is enforced here;
// possession of the path acts as the access key. If you want stronger auth, wire this
// up to your user system and verify ownership.
app.get('/api/webhook/:userPath/events', (_req: Request, res: Response) => {
  const userPath = _req.params.userPath;
  const list = eventStore.get(userPath) || [];
  return res.json({ count: list.length, events: list });
});

// Diagnostic endpoint to inspect last webhook request for a path
app.get('/__diag/webhook/:userPath', (_req: Request, res: Response) => {
  const userPath = _req.params.userPath;
  const diag = lastWebhookDiagnostics.get(userPath) || null;
  const stored = eventStore.get(userPath) || [];
  return res.json({ lastRequest: diag, storedCount: stored.length });
});

// Server-Sent Events stream for a webhook path.
app.get('/api/webhook/:userPath/stream', (req: Request, res: Response) => {
  const userPath = req.params.userPath;

  // Set SSE headers
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  });

  // Send an initial comment to establish the stream
  res.write(': connected\n\n');

  // Register client
  const set = sseClients.get(userPath) || new Set<Response>();
  set.add(res);
  sseClients.set(userPath, set);

  req.on('close', () => {
    // Remove client when they disconnect
    const clients = sseClients.get(userPath);
    if (clients) {
      clients.delete(res);
      if (clients.size === 0) sseClients.delete(userPath);
    }
  });
});

// Serve static frontend if present in the final image at '../editor-dist'
const staticPath = path.join(__dirname, "..", "editor-dist");
const FRONTEND_INDEX = path.join(staticPath, "index.html");

if (fs.existsSync(staticPath)) {
  console.log(`Static frontend directory found at ${staticPath}`);
  try {
    const files = fs.readdirSync(staticPath).slice(0, 50);
    console.log(`Files in editor-dist (showing up to 50): ${files.join(", ")}`);
  } catch (err) {
    console.warn(`Failed to list files in editor-dist: ${(err as Error).message}`);
  }

  app.use(express.static(staticPath));

  // SPA fallback: only serve index.html for GET requests that accept HTML,
  // and explicitly exclude API and diagnostic routes so API clients get JSON.
  app.get("/*", (req: Request, res: Response, next: NextFunction) => {
    if (req.method !== "GET") return next();
    if (req.path.startsWith("/api/") || req.path.startsWith("/__diag")) return next();

    const acceptHeader = req.headers.accept;
    const acceptsHtml =
      typeof acceptHeader === "string" && acceptHeader.indexOf("text/html") !== -1;
    if (!acceptsHtml) return next();

    if (fs.existsSync(FRONTEND_INDEX)) return res.sendFile(FRONTEND_INDEX);
    // If index.html is missing respond with a small diagnostic message
    return res.status(500).send("Frontend index.html missing in image. Check server logs for details.");
  });
} else {
  console.warn(`Static frontend directory not found at ${staticPath}`);
}

// Lightweight diagnostics endpoint so we can query the container about the frontend bundle
app.get("/__diag/frontend", (_req: Request, res: Response) => {
  const exists = fs.existsSync(staticPath);
  let files: string[] = [];
  if (exists) {
    try {
      files = fs.readdirSync(staticPath).slice(0, 100);
    } catch (err) {
      return res.status(500).json({ exists: true, error: (err as Error).message });
    }
  }
  return res.json({ exists, files });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
