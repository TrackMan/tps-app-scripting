# Local Development with Azure Table Storage

## Problem
Your localhost is not reading events from Azure Blob/Table Storage because the `AZURE_STORAGE_CONNECTION_STRING` environment variable is not configured in your local `.env` file.

## Solution
Configure your local development environment to use the same Azure Table Storage as your deployed cloud version.

---

## Quick Fix (Recommended)

### Step 1: Get Connection String from Azure

**Option A: Azure Portal**
1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to your Resource Group: `tps-app-scripting-rg`
3. Find your Storage Account (likely named `tpsappscriptingstorage`)
4. Click on **Access keys** (left sidebar under Security + networking)
5. Click **Show** next to key1
6. Copy the **Connection string**

**Option B: Azure CLI**
```bash
az storage account show-connection-string \
  --name tpsappscriptingstorage \
  --resource-group tps-app-scripting-rg \
  --output tsv
```

### Step 2: Update Local .env File

1. Open `d:\src\app-scripting\server\.env`
2. Paste the connection string:

```bash
# Server Configuration
PORT=4000

# Azure Table Storage for persistent webhook event storage
AZURE_STORAGE_CONNECTION_STRING=DefaultEndpointsProtocol=https;AccountName=tpsappscriptingstorage;AccountKey=YOUR_KEY_HERE;EndpointSuffix=core.windows.net

# Optional: Comma-separated list of allowed webhook paths
# WEBHOOK_ALLOWED_KEYS=

# CORS Configuration (optional)
# CORS_ORIGIN=https://app-scripting-editor.trackmangolfdev.com
```

### Step 3: Restart Your Local Server

```bash
cd server
npm run dev
```

You should see this message in the console:
```
✅ Azure Table Storage connected: WebhookEvents
```

Instead of:
```
⚠️  AZURE_STORAGE_CONNECTION_STRING not set. Table Storage disabled.
```

---

## Verification

### Check if Storage is Working

1. Open your local app: http://localhost:5173 (or your port)
2. Navigate to the **Webhook** tab
3. Open browser DevTools → Network tab
4. Check the response from `/api/webhook/YOUR_PATH/events`

You should see:
```json
{
  "count": 150,
  "events": [...],
  "source": "memory+storage",
  "storageEnabled": true
}
```

If `storageEnabled: false`, the connection string is not working.

### Test Event Retrieval

```bash
# Replace YOUR_WEBHOOK_PATH with your actual webhook path
curl http://localhost:4000/api/webhook/YOUR_WEBHOOK_PATH/events
```

You should see events from both:
- In-memory cache (last 200 events)
- Azure Table Storage (all historical events)

---

## How It Works

### Storage Architecture

```
┌─────────────────────────────────────────────────┐
│  Cloud (Deployed App Service)                   │
│  ┌──────────────┐      ┌─────────────────────┐ │
│  │ Node Server  │─────▶│ Azure Table Storage │ │
│  └──────────────┘      └─────────────────────┘ │
│       ▲ Writes events          ▲ Persists      │
│       │                         │               │
└───────┼─────────────────────────┼───────────────┘
        │                         │
        │                         │
┌───────┼─────────────────────────┼───────────────┐
│  Local (localhost)              │               │
│  ┌──────────────┐      ┌────────┴────────────┐ │
│  │ Node Server  │─────▶│ Azure Table Storage │ │
│  └──────────────┘      └─────────────────────┘ │
│       ▲ Reads events           ▲ Shared!        │
│       │                                         │
└───────┼─────────────────────────────────────────┘
```

### Event Flow (Localhost)

1. **Startup**: Server connects to Azure Table Storage using connection string
2. **Load Events**: GET `/api/webhook/:userPath/events`
   - Checks in-memory cache (empty on first load)
   - Queries Azure Table Storage for history
   - Returns merged results
3. **Real-time**: SSE stream at `/api/webhook/:userPath/stream`
   - New events arrive via webhook POST
   - Stored in-memory AND Azure Table Storage
   - Broadcast to connected clients

---

## Troubleshooting

### Issue: "AZURE_STORAGE_CONNECTION_STRING not set"

**Cause**: Connection string is empty or invalid in `.env` file

**Fix**:
1. Double-check you copied the entire connection string (it's very long!)
2. Make sure there are no extra spaces or line breaks
3. The string should start with: `DefaultEndpointsProtocol=https;`
4. Restart the server after updating `.env`

### Issue: "Failed to initialize Azure Table Storage"

**Causes**:
- Invalid connection string
- Network/firewall blocking Azure access
- Storage account doesn't exist
- Wrong storage account name

**Fix**:
```bash
# Verify storage account exists
az storage account show \
  --name tpsappscriptingstorage \
  --resource-group tps-app-scripting-rg

# Test connection string
az storage table list \
  --connection-string "YOUR_CONNECTION_STRING_HERE"
```

### Issue: "No events showing locally"

**Causes**:
- No events have been sent to the webhook yet
- Wrong webhook path
- Table doesn't have data

**Verify**:
```bash
# Check what's in Azure Table Storage
az storage entity query \
  --table-name WebhookEvents \
  --connection-string "YOUR_CONNECTION_STRING_HERE"
```

### Issue: "Events showing but very slow"

**Cause**: Querying too many events from Table Storage

**Fix**: Adjust query limit in the frontend
```typescript
// In WebhookInspector.tsx
const r = await fetch(`/api/webhook/${encodeURIComponent(userPath)}/events?limit=100`);
```

---

## Security Notes

### ⚠️ Important: .gitignore

Make sure `server/.env` is in your `.gitignore` to avoid committing secrets!

```bash
# Check if .env is ignored
cd server
git check-ignore .env
# Should output: .env

# If not ignored, add it:
echo ".env" >> .gitignore
```

### Connection String Contains Secrets

The connection string includes:
- Storage account name (public)
- Access key (SECRET - like a password!)

**Never commit the connection string to git!**

### Alternative: Use Azure CLI Authentication (Advanced)

For better security, you can use Azure CLI authentication instead of connection strings:
1. Login via Azure CLI: `az login`
2. Use `DefaultAzureCredential` in code
3. Grant your user account access to the storage account

This is more secure but requires additional setup.

---

## Cost Estimate

Using Azure Table Storage for webhook events is **very cheap**:

- **Storage**: ~$0.045 per GB/month
- **Transactions**: ~$0.00036 per 10,000 operations
- **Estimated**: ~$1-5 per month for typical usage

Example for 1 million events:
- 1 event ≈ 2 KB
- 1M events = 2 GB storage = ~$0.09/month
- 1M writes = ~$0.036
- **Total**: ~$0.13/month

---

## Next Steps

1. ✅ Get connection string from Azure
2. ✅ Update `server/.env` with connection string
3. ✅ Restart local server
4. ✅ Verify storage is enabled in console logs
5. ✅ Check webhook tab shows historical events
6. ✅ Test that new events are persisted

## Need Help?

Check these files:
- `AZURE_TABLE_STORAGE_SETUP.md` - Full Azure setup guide
- `STORAGE_IMPLEMENTATION_SUMMARY.md` - Implementation details
- `server/src/storage.ts` - Storage code
- `server/src/webhook.ts` - Webhook routes
