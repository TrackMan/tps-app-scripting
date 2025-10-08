# Quick Setup: Azure Table Storage

Follow these steps to enable persistent webhook event storage.

## Prerequisites

- Azure subscription with access to `tps-app-scripting-rg` resource group
- Azure CLI installed (optional, for CLI method)

## Step 1: Create Storage Account

### Option A: Azure Portal (5 minutes)

1. Navigate to [Azure Portal](https://portal.azure.com)
2. Go to **Resource Groups** → `tps-app-scripting-rg`
3. Click **+ Create** → Search for "Storage account" → **Create**
4. Fill in the form:
   - **Storage account name:** `tpsappscriptingstorage` (must be globally unique, lowercase, no hyphens)
   - **Region:** Same as your App Service (e.g., North Europe)
   - **Performance:** Standard
   - **Redundancy:** LRS (Locally Redundant Storage)
   - Leave other settings as default
5. Click **Review + Create** → **Create**
6. Wait ~1 minute for deployment

### Option B: Azure CLI (2 minutes)

```bash
az storage account create \
  --name tpsappscriptingstorage \
  --resource-group tps-app-scripting-rg \
  --location northeurope \
  --sku Standard_LRS \
  --kind StorageV2
```

## Step 2: Get Connection String

### Option A: Azure Portal

1. Go to the storage account → **Access keys** (left menu)
2. Click **Show keys**
3. Copy the **Connection string** from key1 or key2
4. Should look like:
   ```
   DefaultEndpointsProtocol=https;AccountName=tpsappscriptingstorage;AccountKey=xxxxxxxxxxxxx;EndpointSuffix=core.windows.net
   ```

### Option B: Azure CLI

```bash
az storage account show-connection-string \
  --name tpsappscriptingstorage \
  --resource-group tps-app-scripting-rg \
  --output tsv
```

## Step 3: Configure App Service

### Option A: Azure Portal

1. Go to **App Service** → `tps-app-scripting-editor`
2. Click **Configuration** (left menu under Settings)
3. Under **Application settings**, click **+ New application setting**
4. Add:
   - **Name:** `AZURE_STORAGE_CONNECTION_STRING`
   - **Value:** (paste the connection string from Step 2)
5. Click **OK**
6. Click **Save** at the top
7. Click **Continue** to confirm restart
8. Wait ~30 seconds for restart

### Option B: Azure CLI

```bash
# Get connection string
CONNECTION_STRING=$(az storage account show-connection-string \
  --name tpsappscriptingstorage \
  --resource-group tps-app-scripting-rg \
  --output tsv)

# Set App Service configuration
az webapp config appsettings set \
  --name tps-app-scripting-editor \
  --resource-group tps-app-scripting-rg \
  --settings AZURE_STORAGE_CONNECTION_STRING="$CONNECTION_STRING"

# Restart
az webapp restart \
  --name tps-app-scripting-editor \
  --resource-group tps-app-scripting-rg
```

## Step 4: Verify

1. Check App Service logs:
   ```bash
   az webapp log tail \
     --name tps-app-scripting-editor \
     --resource-group tps-app-scripting-rg
   ```

2. Look for this line:
   ```
   ✅ Azure Table Storage initialized: WebhookEvents
   ```

3. Send a test webhook event and verify it appears in:
   - `GET https://app-scripting-editor.trackmangolfdev.com/api/webhook/<path>/events`
   - Response should include `"storageEnabled": true`

## Optional: Local Development

Add to your local `server/.env` file:

```bash
AZURE_STORAGE_CONNECTION_STRING=DefaultEndpointsProtocol=https;AccountName=tpsappscriptingstorage;AccountKey=...;EndpointSuffix=core.windows.net
```

This will use the same storage account as production. Consider adding `_dev` suffix to webhook paths to avoid collisions.

## Costs

Expected cost: **< $1/month** for typical usage

- Storage: ~$0.045/GB/month
- Transactions: ~$0.00036/10,000 operations
- 10,000 events/month ≈ $0.004/month
- 1 million events/month ≈ $0.085/month

## Troubleshooting

**"Storage account name already exists"**
→ Use a different name (e.g., `tpsappscriptingstorage2`, `tpswebhookstorage`)

**Storage not working after configuration**
→ Check App Service logs for errors
→ Verify connection string format (no extra spaces/newlines)
→ Ensure App Service restarted after configuration change

**Events still not persisting**
→ Check if `AZURE_STORAGE_CONNECTION_STRING` appears in App Service Configuration
→ Try restarting the App Service manually
→ Check Azure Storage Account firewall settings (should allow App Service)

## Full Documentation

See [`AZURE_TABLE_STORAGE_SETUP.md`](./AZURE_TABLE_STORAGE_SETUP.md) for:
- Architecture details
- API documentation
- Advanced configuration (Managed Identity, retention, backup)
- Monitoring and metrics
- Security best practices
