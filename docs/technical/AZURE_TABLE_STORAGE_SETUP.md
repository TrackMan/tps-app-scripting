# Azure Table Storage Setup for Webhook Events

This document describes how to set up Azure Table Storage for persistent webhook event storage.

## Overview

The webhook backend uses a **hybrid storage approach**:

1. **In-Memory Cache** (Fast, last 200 events per webhook)
   - Instant access for recent events
   - Survives across requests but not server restarts
   - Used for real-time SSE streaming

2. **Azure Table Storage** (Persistent, unlimited history)
   - All events persisted permanently
   - Queryable with pagination
   - Survives server restarts and deployments
   - Cost-effective (~pennies per month)

## Architecture

```
┌─────────────────────────────────────────────────────┐
│  POST /api/webhook/:userPath                        │
│                                                      │
│  1. Store in-memory (sync, fast)                   │
│  2. Write to Table Storage (async, persistent)     │
│  3. Broadcast via SSE                              │
└─────────────────────────────────────────────────────┘

GET /api/webhook/:userPath/events
  ├─ Check in-memory first (fast)
  ├─ Query Table Storage if needed (more history)
  └─ Merge and deduplicate by event ID

DELETE /api/webhook/:userPath/events
  ├─ Clear in-memory events
  └─ Delete from Table Storage
```

## Azure Resources

**Resource Group:** `tps-app-scripting-rg`  
**Storage Account:** `tpsappscriptingstorage` (to be created)  
**Table Name:** `WebhookEvents`  
**Region:** Same as App Service (for low latency)

## Setup Instructions

### Option 1: Azure Portal (Recommended)

1. **Create Storage Account:**
   ```
   Navigate to: https://portal.azure.com
   → Resource Groups → tps-app-scripting-rg → Create → Storage Account
   
   Settings:
   - Name: tpsappscriptingstorage
   - Region: Same as App Service (North Europe or your region)
   - Performance: Standard
   - Redundancy: LRS (Locally Redundant Storage) - cheapest option
   - Advanced → Enable hierarchical namespace: No
   - Networking → Public access: Enabled (or restrict to App Service subnet)
   ```

2. **Get Connection String:**
   ```
   Storage Account → Access keys → Show keys
   Copy "Connection string" from key1 or key2
   ```

3. **Configure App Service:**
   ```
   App Service (tps-app-scripting-editor) → Configuration → Application settings
   → New application setting:
   
   Name: AZURE_STORAGE_CONNECTION_STRING
   Value: DefaultEndpointsProtocol=https;AccountName=tpsappscriptingstorage;AccountKey=...;EndpointSuffix=core.windows.net
   
   → Save → Restart
   ```

### Option 2: Azure CLI

```bash
# Login
az login

# Create Storage Account
az storage account create \
  --name tpsappscriptingstorage \
  --resource-group tps-app-scripting-rg \
  --location northeurope \
  --sku Standard_LRS \
  --kind StorageV2

# Get Connection String
CONNECTION_STRING=$(az storage account show-connection-string \
  --name tpsappscriptingstorage \
  --resource-group tps-app-scripting-rg \
  --output tsv)

# Set App Service Configuration
az webapp config appsettings set \
  --name tps-app-scripting-editor \
  --resource-group tps-app-scripting-rg \
  --settings AZURE_STORAGE_CONNECTION_STRING="$CONNECTION_STRING"

# Restart App Service
az webapp restart \
  --name tps-app-scripting-editor \
  --resource-group tps-app-scripting-rg
```

## Table Structure

**Table Name:** `WebhookEvents`

| Field | Type | Description |
|-------|------|-------------|
| `PartitionKey` | string | Webhook path (e.g., `39a1ebb6-c429-4e01-b83d-8774a4573a1f`) |
| `RowKey` | string | Reverse timestamp + event ID for descending order |
| `eventType` | string | Event type (e.g., `TPS.SessionInfo`) |
| `timestamp` | string | ISO 8601 timestamp |
| `eventId` | string | Event ID (optional) |
| `data` | string | JSON stringified event data |
| `raw` | string | JSON stringified raw event payload |
| `typed` | string | JSON stringified typed payload (optional) |
| `common` | string | JSON stringified common metadata (optional) |

**Indexing:**
- Primary Key: `PartitionKey` (webhook path) + `RowKey` (timestamp)
- Queries by webhook path are very fast (partition scan)
- Events automatically ordered newest-first by reverse timestamp

## API Endpoints

### GET `/api/webhook/:userPath/events`

Returns events for a webhook path, combining in-memory and persistent storage.

**Query Parameters:**
- `limit` (default: 200) - Maximum events to return
- `storage` (default: true) - Set to `false` to skip Table Storage query

**Response:**
```json
{
  "count": 150,
  "events": [...],
  "source": "memory+storage",
  "storageEnabled": true
}
```

**Sources:**
- `memory` - Only in-memory events (< limit events, or ?storage=false)
- `memory+storage` - Combined from both sources
- `memory (storage error)` - Fallback to memory due to storage error

### DELETE `/api/webhook/:userPath/events`

Clears all events for a webhook path from both memory and storage.

**Response:**
```json
{
  "cleared": 250,
  "memory": 50,
  "storage": 200
}
```

## Cost Estimation

**Azure Table Storage Pricing (as of 2025):**
- Storage: $0.045 per GB per month
- Transactions: $0.00036 per 10,000 operations

**Example Usage: 10,000 events/month**
- Average event size: ~1 KB
- Storage: 10 MB = $0.0005/month
- Write operations: 10,000 = $0.0036/month
- Read operations: ~1,000 = $0.0004/month
- **Total: ~$0.004/month** 

**Example Usage: 1 million events/month**
- Storage: 1 GB = $0.045/month
- Write operations: 1,000,000 = $0.036/month
- Read operations: ~100,000 = $0.004/month
- **Total: ~$0.085/month** 

## Local Development

For local development, you can use:

1. **Azure Storage Emulator** (Windows only):
   ```bash
   # Install Azurite (modern replacement)
   npm install -g azurite
   
   # Start emulator
   azurite-table --location ./azurite --debug ./azurite/debug.log
   
   # Use connection string in .env:
   AZURE_STORAGE_CONNECTION_STRING="UseDevelopmentStorage=true"
   ```

2. **Azure Storage Account** (Recommended):
   - Use the same connection string as production
   - Events will be stored in the same table
   - Add `_dev` suffix to webhook paths to avoid collision

3. **No Configuration** (Fallback):
   - Don't set `AZURE_STORAGE_CONNECTION_STRING`
   - Events will only be stored in-memory
   - Warning logged on startup

## Monitoring

### Check Storage Status

The server logs will show:
```
 Azure Table Storage initialized: WebhookEvents
```

Or if disabled:
```
️  AZURE_STORAGE_CONNECTION_STRING not set. Table Storage disabled. Events will only be stored in-memory.
```

### Azure Portal Metrics

Navigate to: Storage Account → Monitoring → Metrics

Useful metrics:
- **Transactions** - Total operations (writes/reads)
- **Ingress** - Data written to storage
- **Success E2E Latency** - Storage response times

### Application Insights

If Application Insights is enabled, storage errors will appear as exceptions:
```
Failed to persist event to Table Storage: <error>
```

## Data Retention

Currently, events are stored indefinitely. To implement automatic cleanup:

### Option 1: Azure Storage Lifecycle Management
```
Storage Account → Data management → Lifecycle management
→ Add rule:
- Delete blobs older than X days
```
**Note:** Lifecycle management doesn't support Table Storage directly.

### Option 2: Scheduled Cleanup Job
Create an Azure Function (Timer Trigger) to delete old events:
```typescript
// Run daily at midnight
export default async function cleanup(context: InvocationContext): Promise<void> {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - 90); // Keep 90 days
  
  // Query and delete events older than cutoffDate
  // Implementation left as exercise
}
```

## Security

### Connection String Protection
-  **Never commit** connection strings to git
-  Use App Service **Application Settings** (encrypted at rest)
-  Consider **Managed Identity** for production (no connection string needed)

### Managed Identity Setup (Advanced)
```bash
# Enable Managed Identity on App Service
az webapp identity assign \
  --name tps-app-scripting-editor \
  --resource-group tps-app-scripting-rg

# Grant Storage permissions
PRINCIPAL_ID=$(az webapp identity show \
  --name tps-app-scripting-editor \
  --resource-group tps-app-scripting-rg \
  --query principalId -o tsv)

az role assignment create \
  --assignee $PRINCIPAL_ID \
  --role "Storage Table Data Contributor" \
  --scope /subscriptions/<subscription-id>/resourceGroups/tps-app-scripting-rg/providers/Microsoft.Storage/storageAccounts/tpsappscriptingstorage
```

Then update code to use `DefaultAzureCredential` instead of connection string.

## Troubleshooting

### Storage Not Working

**Check logs:**
```bash
az webapp log tail \
  --name tps-app-scripting-editor \
  --resource-group tps-app-scripting-rg
```

**Common issues:**
1. Connection string not set → Check App Service Configuration
2. Connection string invalid → Verify format and account key
3. Network blocked → Check Storage Account firewall rules
4. Table creation failed → Check storage account permissions

### Storage Enabled But No Events

1. Check API response: `GET /api/webhook/:userPath/events`
   - `storageEnabled: true` → Storage is initialized
   - `source: "memory"` → Not enough events to query storage
   - `source: "memory+storage"` → Storage queried successfully

2. Query Table Storage directly:
   ```bash
   az storage entity query \
     --account-name tpsappscriptingstorage \
     --table-name WebhookEvents \
     --filter "PartitionKey eq '<your-webhook-path>'"
   ```

### High Costs

Table Storage is extremely cheap, but if costs are unexpectedly high:

1. Check transaction count in Azure Portal metrics
2. Verify no infinite retry loops in application logs
3. Consider enabling CDN/caching for GET requests
4. Implement data retention (delete old events)

## Migration from In-Memory Only

If you already have events in memory and want to backfill Table Storage:

1. Deploy the updated code with storage integration
2. Events will automatically persist going forward
3. Old in-memory events will remain accessible until server restart
4. No manual migration needed (ephemeral data)

## Backup and Disaster Recovery

**Table Storage Benefits:**
-  **Geo-redundant** (if using GRS SKU)
-  **Durable** (automatic replication)
-  **Point-in-time restore** (if enabled)

**Manual Backup:**
```bash
# Export table to JSON
az storage entity query \
  --account-name tpsappscriptingstorage \
  --table-name WebhookEvents \
  --output json > backup.json
```

## References

- [Azure Table Storage Documentation](https://docs.microsoft.com/en-us/azure/storage/tables/)
- [Azure Data Tables SDK for Node.js](https://www.npmjs.com/package/@azure/data-tables)
- [Azure Storage Pricing](https://azure.microsoft.com/en-us/pricing/details/storage/tables/)
