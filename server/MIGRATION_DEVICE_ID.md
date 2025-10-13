# Device ID Migration

## Overview

This migration adds a `deviceId` field to existing webhook events in Azure Table Storage to enable server-side filtering by bay/device.

## Why This Migration?

**Before:**
- All events fetched from storage (2000+)
- Client-side filtering by device/bay
- Slow queries, high bandwidth

**After:**
- Server-side filtering with indexed `deviceId` field
- Fetch only relevant events (500 per bay)
- Fast queries, low bandwidth
- ~75% reduction in data transfer

## Prerequisites

1. **Azure Storage Connection String** must be set in `server/.env`:
   ```env
   AZURE_STORAGE_CONNECTION_STRING=DefaultEndpointsProtocol=https;AccountName=...
   ```

2. **Node.js dependencies** installed:
   ```bash
   cd server
   npm install
   ```

## Running the Migration

### Interactive Mode (Recommended)

```bash
cd server
npm run migrate-device-ids
```

You'll see:
1. Scan progress (how many events found)
2. Statistics (events with/without deviceId)
3. Confirmation prompt before updating
4. Update progress
5. Final results

### Non-Interactive Mode (CI/CD)

```bash
cd server
npm run migrate-device-ids < /dev/null
```

Auto-confirms and proceeds without user input.

## What It Does

1. **Scans** all events in `WebhookEvents` Azure Table
2. **Extracts** `Device.Id` from JSON payload (from `raw.data.Device.Id` or `raw.Device.Id`)
3. **Updates** entity with `deviceId` field (uses 'Merge' mode - only updates new field)
4. **Skips** events that already have `deviceId` or don't have Device.Id in payload

## Expected Output

```
🔄 Starting migration for table: WebhookEvents

✅ Table exists

📥 Fetching all events from Azure Table Storage...
🔍 Scanning events...

   Scanned 4000 events...

📊 Scan Results:
   Total events: 4000
   Already have deviceId: 0
   Found deviceId to add: 3850
   No deviceId available: 150

❓ Proceed with updating 3850 events? (y/n)
y

🔄 Updating 3850 events...

   Updated 3850/3850 events...

✅ Migration Complete!

📊 Final Results:
   Total events scanned: 4000
   Successfully updated: 3850
   Errors: 0
   Already had deviceId: 0
   Events without deviceId: 150

✨ Migration script finished
```

## Events Without Device.Id

Some events may not have a `Device.Id` field:
- System events (e.g., validation requests)
- Events from older webhook versions
- Events without device context

These events will:
- ❌ Not be updated with `deviceId`
- ✅ Still be stored and accessible
- ✅ Appear in "all events" view (no bay filter)
- ❌ Not appear when filtering by specific bay

## Safety Features

1. **Non-destructive**: Uses 'Merge' mode - only adds `deviceId`, doesn't modify other fields
2. **Idempotent**: Safe to run multiple times - skips events already migrated
3. **Error handling**: Continues on errors, logs first 5 failures
4. **Confirmation**: Asks before making changes (interactive mode)
5. **Progress tracking**: Shows real-time progress

## Rollback

If migration causes issues:

1. **Clear deviceId field** (requires custom script or Azure Portal):
   - Not recommended - new events will have deviceId
   
2. **Roll back code changes**:
   ```bash
   git revert <commit-hash>
   ```
   - Server will work without deviceId field (falls back to client-side filtering)

## Performance

- **Speed**: ~100-200 events/second
- **Time**: ~20-40 seconds for 4000 events
- **Bandwidth**: Minimal (only updates one field per entity)

## Verification

After migration, test the filtering:

```bash
# Fetch all events (should show all ~4000 events)
curl http://localhost:4000/api/webhook/YOUR_PATH/events

# Fetch events for specific bay (should show ~500 events)
curl http://localhost:4000/api/webhook/YOUR_PATH/events?bayId=DEVICE_ID

# Check response metadata
curl http://localhost:4000/api/webhook/YOUR_PATH/events?bayId=DEVICE_ID | jq '.source, .filterDeviceId, .count'
```

Expected response:
```json
{
  "count": 487,
  "events": [...],
  "source": "memory+storage",
  "filterDeviceId": "DEVICE_ID",
  "storageEnabled": true
}
```

## Troubleshooting

### "AZURE_STORAGE_CONNECTION_STRING not set"
- Add connection string to `server/.env` file
- Check `.env` file is in correct location

### "Table does not exist"
- Wait for table to be created automatically
- Or create manually in Azure Portal

### High error rate
- Check Azure Storage account permissions
- Verify connection string is correct
- Check Azure Storage logs

### Migration hangs
- Check network connectivity to Azure
- Verify storage account is accessible
- Try non-interactive mode

## Questions?

- Check server logs for detailed error messages
- Review Azure Table Storage in Azure Portal
- Contact dev team for assistance
