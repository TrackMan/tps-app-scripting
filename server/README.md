# App Scripting Server (dev mock)

Simple TypeScript + Express mock server used for local development by the editor.

Endpoints:
- GET /health — basic health check
- GET /me — returns a mock authenticated profile
- POST /logout — mock logout endpoint

Run (from repo root):

```powershell
cd server
npm install
npm run dev
```
