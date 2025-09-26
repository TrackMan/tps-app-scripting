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
