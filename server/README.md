# App Scripting Server (dev mock)

Note: this top-level `server/` folder contains helper files and a copy of the mock server for historical reasons. The canonical server project used by CI and for local development is `server/server`.

To run or develop the mock server, use the inner folder (recommended):

```powershell
cd server/server
npm install
npm run dev
```

If you intend to make changes to the mock server, edit files under `server/server` so CI (which builds `./server/server`) and local dev remain consistent.
