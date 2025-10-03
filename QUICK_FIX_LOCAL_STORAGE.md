# 🔧 Quick Fix: Localhost Not Reading Azure Events

## The Problem
Your localhost isn't reading webhook events from Azure Storage because the connection string is missing from your local `.env` file.

## The Solution (Choose One)

### ⚡ Option 1: Automated Setup (Easiest)

**Double-click this file:**
```
setup-local-storage.bat
```

This will automatically:
- Get the connection string from Azure
- Update your `server\.env` file
- Show you what to do next

### 🖥️ Option 2: PowerShell Script

```powershell
.\scripts\get-azure-storage-connection.ps1
```

### 🌐 Option 3: Azure Portal (Manual)

1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to: **tps-app-scripting-rg** → **tpsappscriptingstorage**
3. Click: **Access keys** → **Show** → Copy **Connection string**
4. Open: `server\.env`
5. Paste:
```bash
AZURE_STORAGE_CONNECTION_STRING=DefaultEndpointsProtocol=https;AccountName=tpsappscriptingstorage;AccountKey=...;EndpointSuffix=core.windows.net
```

### 💻 Option 4: Azure CLI

```bash
az storage account show-connection-string \
  --name tpsappscriptingstorage \
  --resource-group tps-app-scripting-rg \
  --output tsv
```

Then paste the result into `server\.env`

## Verify Configuration

**Run the verification script:**
```powershell
.\scripts\verify-local-storage.ps1
```

This checks:
- ✅ .env file exists
- ✅ Connection string is configured
- ✅ Dependencies are installed
- ✅ Server can connect to Azure

## Start Server

```bash
cd server
npm run dev
```

**Look for:**
```
✅ Azure Table Storage connected: WebhookEvents
```

**NOT:**
```
⚠️  AZURE_STORAGE_CONNECTION_STRING not set. Table Storage disabled.
```

## Test It Works

1. Open http://localhost:5173
2. Go to **Webhook** tab
3. You should now see ALL events from Azure (not just in-memory ones)

## Files Created

- 📄 `LOCAL_AZURE_STORAGE_SETUP.md` - Detailed guide
- 📄 `setup-local-storage.bat` - Automated setup
- 📄 `scripts/get-azure-storage-connection.ps1` - Get connection string
- 📄 `scripts/verify-local-storage.ps1` - Verify configuration

## Still Having Issues?

Check the detailed guide:
```
LOCAL_AZURE_STORAGE_SETUP.md
```

Or check these sections:
- Troubleshooting
- How It Works
- Verification steps
