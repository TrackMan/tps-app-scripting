import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000;

app.use(cors({ origin: true }));
app.use(express.json());

// Simple health endpoint
app.get("/health", (_req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

// Mock auth endpoints for the editor
let mockUser = {
  id: "user-1",
  name: "Demo User",
  avatar: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&s=128"
};

app.get("/me", (_req, res) => {
  res.json({ authenticated: true, profile: mockUser });
});

app.post("/logout", (_req, res) => {
  // for a mock server just return success
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
