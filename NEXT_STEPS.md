# Next Steps: Deploy Persistent Webhook Storage

 **Code Implementation:** Complete  
 **TypeScript Compilation:** Success  
 **Documentation:** Complete  

## What We Built

Added Azure Table Storage integration for persistent webhook event storage:

1. **New Storage Module** (`server/src/storage.ts`)
   - Handles all Table Storage operations
   - Graceful degradation if not configured
   - Async writes (non-blocking)

2. **Enhanced Webhook API** (`server/src/webhook.ts`)
   - Writes to both memory + storage
   - Queries combine both sources
   - Enhanced API responses with storage status

3. **Comprehensive Documentation**
   - `AZURE_TABLE_STORAGE_SETUP.md` - Complete guide
   - `AZURE_STORAGE_QUICK_SETUP.md` - Quick start
   - `STORAGE_IMPLEMENTATION_SUMMARY.md` - Implementation details
   - Updated `server/README.md`

## Ready to Deploy

### Step 1: Create Azure Storage Account (5 minutes)

**Option A - Azure Portal:**
```
1. Go to portal.azure.com
2. Resource Groups → tps-app-scripting-rg → + Create
3. Search "Storage account" → Create
4. Name: tpsappscriptingstorage
5. Region: Same as App Service
6. Performance: Standard, Redundancy: LRS
7. Create
```

**Option B - Azure CLI:**
```bash
az storage account create \
  --name tpsappscriptingstorage \
  --resource-group tps-app-scripting-rg \
  --location northeurope \
  --sku Standard_LRS \
  --kind StorageV2
```

### Step 2: Get Connection String (1 minute)

**Portal:**
```
Storage Account → Access keys → Show keys → Copy "Connection string"
```

**CLI:**
```bash
az storage account show-connection-string \
  --name tpsappscriptingstorage \
  --resource-group tps-app-scripting-rg \
  --output tsv
```

### Step 3: Configure App Service (2 minutes)

**Portal:**
```
1. App Service (tps-app-scripting-editor) → Configuration
2. Application settings → + New application setting
3. Name: AZURE_STORAGE_CONNECTION_STRING
4. Value: <paste connection string>
5. Save → Continue (restart)
```

**CLI:**
```bash
CONNECTION_STRING=$(az storage account show-connection-string \
  --name tpsappscriptingstorage \
  --resource-group tps-app-scripting-rg \
  --output tsv)

az webapp config appsettings set \
  --name tps-app-scripting-editor \
  --resource-group tps-app-scripting-rg \
  --settings AZURE_STORAGE_CONNECTION_STRING="$CONNECTION_STRING"

az webapp restart \
  --name tps-app-scripting-editor \
  --resource-group tps-app-scripting-rg
```

### Step 4: Deploy Code (5 minutes)

```bash
# Commit all changes
git add .
git commit -m "feat: Add Azure Table Storage for persistent webhook events

- Add @azure/data-tables SDK
- Create storage.ts module for Table Storage operations
- Update webhook.ts to persist events to storage
- Enhance API responses with storage status
- Add comprehensive documentation
- Graceful degradation if storage not configured"

# Push to trigger GitHub Actions deployment
git push origin main
```

### Step 5: Verify (2 minutes)

```bash
# Watch deployment logs
az webapp log tail \
  --name tps-app-scripting-editor \
  --resource-group tps-app-scripting-rg

# Look for:
#  Azure Table Storage initialized: WebhookEvents
```

**Test the API:**
```bash
# Send a test event
curl -X POST https://app-scripting-editor.trackmangolfdev.com/api/webhook/test \
  -H "Content-Type: application/json" \
  -d '[{"eventType":"Test","data":{"message":"Testing storage"}}]'

# Verify storage is enabled
curl https://app-scripting-editor.trackmangolfdev.com/api/webhook/test/events

# Response should include:
# "storageEnabled": true
# "source": "memory" or "memory+storage"
```

## Expected Outcome

After deployment:
-  All webhook events persisted to Azure Table Storage
-  Events survive server restarts and redeployments
-  Unlimited event history (not capped at 200)
-  API shows `"storageEnabled": true`
-  Cost: < $1/month for typical usage

## Rollback Plan

If any issues:

```bash
# Option 1: Remove storage config (revert to memory-only)
az webapp config appsettings delete \
  --name tps-app-scripting-editor \
  --resource-group tps-app-scripting-rg \
  --setting-names AZURE_STORAGE_CONNECTION_STRING

# Option 2: Revert code
git revert HEAD
git push origin main
```

## Files Changed

```
 New: server/src/storage.ts (212 lines)
 New: server/.env.example
 New: AZURE_TABLE_STORAGE_SETUP.md (407 lines)
 New: AZURE_STORAGE_QUICK_SETUP.md (154 lines)
 New: STORAGE_IMPLEMENTATION_SUMMARY.md (386 lines)
 New: NEXT_STEPS.md (this file)
 Modified: server/src/webhook.ts (+3 imports, +30 lines)
 Modified: server/README.md (complete rewrite)
 Modified: server/package.json (+1 dependency)
```

## Total Time Estimate

- Azure setup: ~10 minutes
- Git commit/push: ~2 minutes
- CI/CD deployment: ~5 minutes
- Verification: ~2 minutes

**Total: ~20 minutes** ⏱️

## Questions?

See detailed documentation:
- Quick setup: [`AZURE_STORAGE_QUICK_SETUP.md`](./AZURE_STORAGE_QUICK_SETUP.md)
- Full guide: [`AZURE_TABLE_STORAGE_SETUP.md`](./AZURE_TABLE_STORAGE_SETUP.md)
- Summary: [`STORAGE_IMPLEMENTATION_SUMMARY.md`](./STORAGE_IMPLEMENTATION_SUMMARY.md)

---

**Ready to proceed?** Start with Step 1 above! 
