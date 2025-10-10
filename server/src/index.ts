// Load environment variables from .env file
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(__dirname, '../.env') });

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

// Handle JSON parse errors from express.json() so malformed requests don't crash the process
app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
  try {
    // Body parser errors often come with .type === 'entity.parse.failed'
    if (err && (err.type === 'entity.parse.failed' || err.type === 'request.entity.parse.failed')) {
      console.warn('JSON parse error on request:', err.message?.toString?.() || err);
      if (!res.headersSent) return res.status(400).json({ error: 'invalid_json', message: err.message });
      return;
    }

    // Generic SyntaxError with body property
    if (err instanceof SyntaxError && Object.prototype.hasOwnProperty.call(err, 'body')) {
      console.warn('SyntaxError parsing JSON body:', err.message);
      if (!res.headersSent) return res.status(400).json({ error: 'invalid_json', message: err.message });
      return;
    }

    // If no specific handling, delegate
    return next(err);
  } catch (outer) {
    console.error('Error in JSON error handler', outer);
    return next(err);
  }
});

// Global handlers for dev so malformed requests or other issues don't kill the process silently
process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err && (err as Error).stack ? (err as Error).stack : err);
});
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled rejection:', reason);
});


// API mounted under /api to make it easy to host frontend and backend together
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ status: "ok", uptime: process.uptime() });
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
      // Legacy environment variables (default/current environment)
      VITE_BACKEND_BASE_URL: process.env.VITE_BACKEND_BASE_URL || '',
      VITE_LOGIN_BASE_URL: process.env.VITE_LOGIN_BASE_URL || '',
      VITE_NODE_ENV: process.env.VITE_NODE_ENV || 'production',
      VITE_OAUTH_WEB_CLIENT_ID: process.env.VITE_OAUTH_WEB_CLIENT_ID || '',
      VITE_OAUTH_WEB_CLIENT_SECRET: process.env.VITE_OAUTH_WEB_CLIENT_SECRET || '',
      VITE_OAUTH_REDIRECT_URI: process.env.VITE_OAUTH_REDIRECT_URI || '',
      
      // Development environment variables
      VITE_DEV_BACKEND_BASE_URL: process.env.VITE_DEV_BACKEND_BASE_URL || '',
      VITE_DEV_LOGIN_BASE_URL: process.env.VITE_DEV_LOGIN_BASE_URL || '',
      VITE_DEV_OAUTH_WEB_CLIENT_ID: process.env.VITE_DEV_OAUTH_WEB_CLIENT_ID || '',
      VITE_DEV_OAUTH_WEB_CLIENT_SECRET: process.env.VITE_DEV_OAUTH_WEB_CLIENT_SECRET || '',
      
      // Production environment variables
      VITE_PROD_BACKEND_BASE_URL: process.env.VITE_PROD_BACKEND_BASE_URL || '',
      VITE_PROD_LOGIN_BASE_URL: process.env.VITE_PROD_LOGIN_BASE_URL || '',
      VITE_PROD_OAUTH_WEB_CLIENT_ID: process.env.VITE_PROD_OAUTH_WEB_CLIENT_ID || '',
      VITE_PROD_OAUTH_WEB_CLIENT_SECRET: process.env.VITE_PROD_OAUTH_WEB_CLIENT_SECRET || '',
      
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

  // Emergency fallback: if the static frontend isn't present in the image
  // (for example a mis-built image or multi-stage copy failure), serve a
  // small informational HTML page at / so users hitting the site root get a
  // helpful message instead of a generic Azure "Application Error".
  app.get('/', (_req: Request, res: Response) => {
    res.type('text/html');
    const html = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>App Scripting — Frontend unavailable</title>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <style>body{font-family:Segoe UI,Roboto,Arial,sans-serif;margin:2rem;color:#222}a{color:#0366d6}</style>
  </head>
  <body>
    <h1>Frontend temporarily unavailable</h1>
    <p>The frontend static bundle was not found inside this container image.</p>
    <p>You can still use the API directly:</p>
    <ul>
      <li><a href="/api/health">/api/health</a></li>
    </ul>
    <p>If you maintain this deployment, rebuild the editor image so the
    <code>editor-dist</code> directory is present, or deploy the editor/nginx image.</p>
    <hr/>
    <p><small>Generated at ${new Date().toISOString()}</small></p>
  </body>
</html>`;
    return res.status(200).send(html);
  });

  // Provide a minimal env-config.js so clients can still fetch runtime settings
  app.get('/env-config.js', (_req: Request, res: Response) => {
    res.type('application/javascript');
    return res.status(200).send('// env-config not present in image (fallback)\n');
  });

  // Provide the same runtime-config.js fallback as we do when static files exist
  app.get('/runtime-config.js', (_req: Request, res: Response) => {
    res.type('application/javascript');
    const runtime = {
      // Legacy environment variables (default/current environment)
      VITE_BACKEND_BASE_URL: process.env.VITE_BACKEND_BASE_URL || '',
      VITE_LOGIN_BASE_URL: process.env.VITE_LOGIN_BASE_URL || '',
      VITE_NODE_ENV: process.env.VITE_NODE_ENV || 'production',
      VITE_OAUTH_WEB_CLIENT_ID: process.env.VITE_OAUTH_WEB_CLIENT_ID || '',
      VITE_OAUTH_WEB_CLIENT_SECRET: process.env.VITE_OAUTH_WEB_CLIENT_SECRET || '',
      VITE_OAUTH_REDIRECT_URI: process.env.VITE_OAUTH_REDIRECT_URI || '',
      
      // Development environment variables
      VITE_DEV_BACKEND_BASE_URL: process.env.VITE_DEV_BACKEND_BASE_URL || '',
      VITE_DEV_LOGIN_BASE_URL: process.env.VITE_DEV_LOGIN_BASE_URL || '',
      VITE_DEV_OAUTH_WEB_CLIENT_ID: process.env.VITE_DEV_OAUTH_WEB_CLIENT_ID || '',
      VITE_DEV_OAUTH_WEB_CLIENT_SECRET: process.env.VITE_DEV_OAUTH_WEB_CLIENT_SECRET || '',
      
      // Production environment variables
      VITE_PROD_BACKEND_BASE_URL: process.env.VITE_PROD_BACKEND_BASE_URL || '',
      VITE_PROD_LOGIN_BASE_URL: process.env.VITE_PROD_LOGIN_BASE_URL || '',
      VITE_PROD_OAUTH_WEB_CLIENT_ID: process.env.VITE_PROD_OAUTH_WEB_CLIENT_ID || '',
      VITE_PROD_OAUTH_WEB_CLIENT_SECRET: process.env.VITE_PROD_OAUTH_WEB_CLIENT_SECRET || '',
      
      _generated: new Date().toISOString(),
    } as Record<string, any>;
    const content = `// Runtime configuration (generated)\nwindow.runtimeConfig = ${JSON.stringify(
      runtime,
    )};\n`;
    return res.status(200).send(content);
  });
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
