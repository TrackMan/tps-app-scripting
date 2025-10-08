# App Scripting Webhook Server

The webhook server provides endpoints for receiving and viewing webhook events from TrackMan devices.

## Features

-  **Webhook ingestion** - Receives Azure EventGrid webhook events
-  **Hybrid storage** - In-memory cache + Azure Table Storage persistence
-  **Server-Sent Events** - Real-time event streaming to web clients
-  **Event inspection** - Browse and search webhook history
-  **Event classification** - TypeScript types for all event payloads

## Quick Start

```powershell
cd server
npm install
npm run dev
```

Server runs on `http://localhost:4000`

## Configuration

Create a `.env` file (or use environment variables):

```bash
# Server port
PORT=4000

# Optional: Comma-separated list of allowed webhook paths
# WEBHOOK_ALLOWED_KEYS=path1,path2,path3

# Azure Table Storage for persistent event storage
# If not set, events are only stored in-memory (lost on restart)
AZURE_STORAGE_CONNECTION_STRING=DefaultEndpointsProtocol=https;AccountName=...

# CORS (optional)
# CORS_ORIGIN=https://app-scripting-editor.trackmangolfdev.com
```

See [`.env.example`](./.env.example) for full configuration options.

## Storage

The server uses a **hybrid storage approach**:

1. **In-Memory Cache** (Fast, last 200 events per webhook)
   - Instant access for recent events
   - Used for real-time SSE streaming
   - Lost on server restart

2. **Azure Table Storage** (Persistent, unlimited history)
   - All events persisted permanently
   - Queryable with pagination
   - Survives restarts and deployments
   - Optional - gracefully degrades to memory-only if not configured

 **Full setup guide:** See [`AZURE_TABLE_STORAGE_SETUP.md`](../AZURE_TABLE_STORAGE_SETUP.md) in the root directory.

## API Endpoints

### Webhook Ingestion

**POST** `/api/webhook/:userPath`
- Receives webhook events from Azure EventGrid
- Stores events in memory + Table Storage
- Broadcasts to connected SSE clients
- Returns: `{ received: number, validationResponse?: string }`

### Event Retrieval

**GET** `/api/webhook/:userPath/events`
- Returns events for a webhook path
- Query params:
  - `limit` (default: 200) - Max events to return
  - `storage` (default: true) - Set to `false` to skip Table Storage
- Returns: `{ count, events, source, storageEnabled }`

**DELETE** `/api/webhook/:userPath/events`
- Clears all events for a webhook path
- Deletes from both memory and Table Storage
- Returns: `{ cleared, memory, storage }`

### Real-Time Streaming

**GET** `/api/webhook/:userPath/stream`
- Server-Sent Events stream
- Receives new events as they arrive
- Auto-reconnects on disconnect

## Development

```powershell
# Install dependencies
npm install

# Run in development mode (hot reload)
npm run dev

# Build for production
npm run build

# Run production build
npm start

# Type checking
npm run type-check
```

## Architecture

```
┌─────────────────────────────────────────────────────┐
│  POST /api/webhook/:userPath                        │
│                                                      │
│  1. Validate Azure EventGrid envelope               │
│  2. Store in-memory (sync, fast)                   │
│  3. Persist to Table Storage (async, durable)      │
│  4. Broadcast via SSE (real-time updates)          │
└─────────────────────────────────────────────────────┘

GET /api/webhook/:userPath/events
  ├─ Check in-memory cache first (fast)
  ├─ Query Table Storage if needed (more history)
  └─ Merge and deduplicate by event ID
```

## Event Types

The server recognizes and types these event categories:

- **App Scripting** - `AppScripting.Status`
- **Session** - `TPS.SessionInfo`, `TPS.StartActivity`, `TPS.EndActivity`
- **Live Data** - `TPS.Live.OnStrokeConditionChanged`, `TPS.Live.OnStrokeCompletedEvent`
- **Simulator** - Player changes, club changes, shots, holes, scorecards

See [`src/events.ts`](./src/events.ts) for full type definitions.

## Deployment

The server is deployed to Azure App Service as a Docker container.

**Production:** `https://app-scripting-editor.trackmangolfdev.com`  
**API Base:** `https://app-scripting-editor.trackmangolfdev.com/api`

See deployment documentation in root:
- [`AZURE_DEPLOYMENT_SETUP.md`](../AZURE_DEPLOYMENT_SETUP.md)
- [`DEPLOYMENT_FIX.md`](../DEPLOYMENT_FIX.md)
- [`AZURE_TABLE_STORAGE_SETUP.md`](../AZURE_TABLE_STORAGE_SETUP.md)

## Testing

Send test webhooks using curl:

```bash
# Send a test event
curl -X POST http://localhost:4000/api/webhook/test-path \
  -H "Content-Type: application/json" \
  -d '[{"eventType":"TPS.SessionInfo","data":{"Id":"123","Status":"Active"}}]'

# View events
curl http://localhost:4000/api/webhook/test-path/events

# Stream events (SSE)
curl -N http://localhost:4000/api/webhook/test-path/stream
```

Or use webhook.site to capture and forward real webhooks.

## Troubleshooting

**Events not persisting after restart:**
- Check if `AZURE_STORAGE_CONNECTION_STRING` is set
- Look for ` Azure Table Storage initialized` in logs

**Storage errors:**
- Verify connection string format
- Check Azure Storage Account firewall rules
- Ensure storage account exists and is accessible

**Missing events:**
- Check `/api/webhook/:path/events?storage=false` to test memory-only
- Verify events are being received (check POST logs)
- Test with webhook.site to isolate device vs. server issues

See full troubleshooting guide in [`AZURE_TABLE_STORAGE_SETUP.md`](../AZURE_TABLE_STORAGE_SETUP.md).
