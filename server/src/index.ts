import path from "path";
import fs from "fs";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { registerWebhookRoutes } from './webhook';

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

// Register webhook-related routes (event store, SSE, diagnostics)
registerWebhookRoutes(app);


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

  // Lightweight request logging for debugging static asset requests
  app.use((req: Request, _res: Response, next: NextFunction) => {
    if (req.method === 'GET' && (req.path === '/' || req.path === '/index.html' || req.path === '/env-config.js')) {
      console.log(`Static request for ${req.path} (accept: ${req.headers.accept})`);
    }
    next();
  });

  // Ensure root and env-config are served directly (helps when clients send non-standard Accept headers)
  app.get('/', (_req: Request, res: Response) => {
    if (fs.existsSync(FRONTEND_INDEX)) return res.sendFile(FRONTEND_INDEX);
    return res.status(500).send('Frontend index.html missing in image.');
  });

  app.get('/env-config.js', (_req: Request, res: Response) => {
    const file = path.join(staticPath, 'env-config.js');
    if (fs.existsSync(file)) return res.sendFile(file);
    return res.status(404).send('// env-config not found');
  });

  // Serve runtime-config.js (generated at container startup) if present,
  // otherwise generate a minimal runtime-config from env vars to help the
  // browser when runtime-config.js is missing from the static bundle.
  app.get('/runtime-config.js', (_req: Request, res: Response) => {
    const file = path.join(staticPath, 'runtime-config.js');
    if (fs.existsSync(file)) {
      // Ensure we send correct JS content type for static file
      res.type('application/javascript');
      return res.sendFile(file);
    }

    // Build runtime config from VITE_ env vars (fall back to empty strings)
    const runtime = {
      VITE_BACKEND_BASE_URL: process.env.VITE_BACKEND_BASE_URL || '',
      VITE_LOGIN_BASE_URL: process.env.VITE_LOGIN_BASE_URL || '',
      VITE_NODE_ENV: process.env.VITE_NODE_ENV || 'production',
      VITE_OAUTH_WEB_CLIENT_ID: process.env.VITE_OAUTH_WEB_CLIENT_ID || '',
      VITE_OAUTH_WEB_CLIENT_SECRET: process.env.VITE_OAUTH_WEB_CLIENT_SECRET ? 'SET' : '',
      _generated: new Date().toISOString(),
    } as Record<string, any>;

    const content = `// Runtime configuration (generated)\nwindow.runtimeConfig = ${JSON.stringify(
      runtime,
    )};\n`;
    res.type('application/javascript');
    return res.status(200).send(content);
  });

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
