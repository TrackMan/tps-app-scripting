#  Fix: Webhook Tab Not Showing Events Locally

## The Root Cause

Your local frontend is configured to use the **cloud backend** (`VITE_BACKEND_BASE_URL=https://dr-cloud-api-dev.trackmangolfdev.com`), which means:

1.  GraphQL queries work (they go to cloud)
2.  Auth works (goes to cloud)
3.  **Webhook events DON'T show** because:
   - The `WebhookView` component uses `VITE_BACKEND_BASE_URL` directly
   - This **bypasses the Vite proxy** that routes `/api` to your local server
   - So it's fetching from the cloud server, not your local Azure Storage

## The Solutions

### Solution 1: Use Localhost Backend (Recommended for Full Local Development)

Update `.env` to point to localhost:

```bash
# .env file
VITE_BACKEND_BASE_URL=http://localhost:4000
VITE_LOGIN_BASE_URL=https://tm-login-dev.trackmangolfdev.com
```

**Pros:**
-  Uses your local server and local Azure Storage connection
-  Can see events in real-time as they're stored
-  Full local development experience

**Cons:**
-  Requires local backend server running
-  Requires local Azure Storage connection string

---

### Solution 2: Comment Out VITE_BACKEND_BASE_URL (Use Vite Proxy)

Comment out the backend URL to use the Vite proxy:

```bash
# .env file
# VITE_BACKEND_BASE_URL=https://dr-cloud-api-dev.trackmangolfdev.com
VITE_LOGIN_BASE_URL=https://tm-login-dev.trackmangolfdev.com
```

**How it works:**
- When `VITE_BACKEND_BASE_URL` is not set, `WebhookView` falls back to `window.location.origin`
- This becomes `http://localhost:5000` (or your Vite dev server port)
- Vite proxy intercepts `/api/*` requests and forwards them to `localhost:4000`

**Pros:**
-  Uses local server for webhooks
-  Can still use cloud for other services if needed

**Cons:**
-  All API requests now go through proxy

---

### Solution 3: Hybrid - Fix WebhookView to Respect Proxy

Update `WebhookView.tsx` to detect localhost and use relative URLs:

```typescript
// In WebhookView.tsx
const viteEnvBase = (import.meta as any)?.env?.VITE_BACKEND_BASE_URL;
const windowOrigin = typeof window !== 'undefined' ? window.location.origin : '';

// Use relative path when running locally to leverage Vite proxy
const isLocalhost = windowOrigin.includes('localhost') || windowOrigin.includes('127.0.0.1');
const normalizedBase = isLocalhost ? '' : String(viteEnvBase || windowOrigin || '').replace(/\/$/, '');

const url = (localWebhook || webhookPath) ? `${normalizedBase}/api/webhook/${(localWebhook || webhookPath)}` : null;
```

**Pros:**
-  Automatically detects localhost
-  Uses proxy for localhost, direct URLs for deployed
-  Best of both worlds

**Cons:**
-  Requires code change

---

## Quick Fix (Choose One)

### Option A: Full Local Development

```bash
# 1. Update .env
echo "VITE_BACKEND_BASE_URL=http://localhost:4000" > .env.local

# 2. Restart Vite dev server
npm run dev
```

### Option B: Use Vite Proxy

```bash
# 1. Comment out in .env
# VITE_BACKEND_BASE_URL=https://dr-cloud-api-dev.trackmangolfdev.com

# 2. Restart Vite dev server
npm run dev
```

### Option C: Use .env.local Override

Create a `.env.local` file (git-ignored by default):

```bash
# .env.local (for local development only)
VITE_BACKEND_BASE_URL=http://localhost:4000
```

This overrides `.env` without changing the committed file.

---

## Verification

After applying the fix:

1. Open browser DevTools → Network tab
2. Go to Webhook tab
3. Look for request to `/api/webhook/YOUR_PATH/events`
4. Check the request URL:
   -  Should be: `http://localhost:4000/api/webhook/...`
   -  Not: `https://dr-cloud-api-dev.trackmangolfdev.com/api/webhook/...`

5. Check response JSON:
   ```json
   {
     "count": 150,
     "events": [...],
     "source": "memory+storage",
     "storageEnabled": true
   }
   ```

---

## Why This Matters

### Current Setup (Not Working)
```
Frontend (localhost:5173)
  ↓
  VITE_BACKEND_BASE_URL
  ↓
Cloud Backend (dr-cloud-api-dev.trackmangolfdev.com)
  ↓
Cloud Azure Storage (different data!)
```

### After Fix (Working)
```
Frontend (localhost:5173)
  ↓
  Vite Proxy /api/* → localhost:4000
  ↓
Local Backend (localhost:4000)
  ↓
Azure Storage (with your connection string)
  ↓
Shows ALL events from cloud deployment! 
```

---

## Best Practice: .env.local

Create a `.env.local` file for your local overrides:

```bash
# .env.local (git-ignored, local development only)
VITE_BACKEND_BASE_URL=http://localhost:4000
```

Keep `.env` with cloud settings:

```bash
# .env (committed, used as default)
VITE_BACKEND_BASE_URL=https://dr-cloud-api-dev.trackmangolfdev.com
```

This way:
-  `.env` has production-like defaults
-  `.env.local` overrides for local dev
-  Other developers can have their own `.env.local`
-  No accidental commits of local settings

---

## Alternative: Programmatic Fix

I can update the code to automatically detect localhost and use the proxy. Would you like me to do that?
