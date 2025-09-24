import path from "path";
import fs from "fs";
import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000;

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
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

app.get("/api/me", (_req, res) => {
  res.json({ authenticated: true, profile: mockUser });
});

app.post("/api/logout", (_req, res) => {
  res.json({ ok: true });
});

// Serve static frontend if present in the final image at '../editor-dist'
const staticPath = path.join(__dirname, "..", "editor-dist");
if (fs.existsSync(staticPath)) {
  app.use(express.static(staticPath));

  // SPA fallback: any non-API route should return index.html so the client-side router can handle it
  app.get("/*", (req, res, next) => {
    if (req.path.startsWith("/api/")) return next();
    res.sendFile(path.join(staticPath, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
