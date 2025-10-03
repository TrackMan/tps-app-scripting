# Get Azure Storage Connection String for Local Development
# This script retrieves the connection string and updates your local .env file

Write-Host "🔍 Retrieving Azure Storage Connection String..." -ForegroundColor Cyan

# Check if Azure CLI is installed
try {
    $azVersion = az version 2>$null
    if (-not $azVersion) {
        throw "Azure CLI not found"
    }
} catch {
    Write-Host "❌ Azure CLI is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Azure CLI: https://aka.ms/installazurecli" -ForegroundColor Yellow
    exit 1
}

# Configuration
$resourceGroup = "tps-app-scripting-rg"
$storageAccountName = "tpsappscriptingstorage"
$envFilePath = ".\server\.env"

# Login check
Write-Host "Checking Azure login status..." -ForegroundColor Gray
$loginStatus = az account show 2>$null
if (-not $loginStatus) {
    Write-Host "⚠️  Not logged in to Azure" -ForegroundColor Yellow
    Write-Host "Running: az login" -ForegroundColor Gray
    az login
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Azure login failed" -ForegroundColor Red
        exit 1
    }
}

Write-Host "✅ Logged in to Azure" -ForegroundColor Green

# Get storage account connection string
Write-Host "`nRetrieving connection string from storage account: $storageAccountName" -ForegroundColor Cyan
$connectionString = az storage account show-connection-string `
    --name $storageAccountName `
    --resource-group $resourceGroup `
    --output tsv 2>$null

if ($LASTEXITCODE -ne 0 -or -not $connectionString) {
    Write-Host "❌ Failed to retrieve connection string" -ForegroundColor Red
    Write-Host ""
    Write-Host "Possible issues:" -ForegroundColor Yellow
    Write-Host "  1. Storage account '$storageAccountName' doesn't exist" -ForegroundColor Gray
    Write-Host "  2. Resource group '$resourceGroup' doesn't exist" -ForegroundColor Gray
    Write-Host "  3. You don't have access to the storage account" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Try listing storage accounts:" -ForegroundColor Cyan
    Write-Host "  az storage account list --resource-group $resourceGroup --output table" -ForegroundColor Gray
    exit 1
}

Write-Host "✅ Connection string retrieved" -ForegroundColor Green

# Check if .env file exists
if (-not (Test-Path $envFilePath)) {
    Write-Host "⚠️  .env file not found at: $envFilePath" -ForegroundColor Yellow
    Write-Host "Creating from .env.example..." -ForegroundColor Gray
    
    $examplePath = ".\server\.env.example"
    if (Test-Path $examplePath) {
        Copy-Item $examplePath $envFilePath
        Write-Host "✅ Created .env file" -ForegroundColor Green
    } else {
        Write-Host "❌ .env.example not found. Creating basic .env file..." -ForegroundColor Red
        @"
# Server Configuration
PORT=4000

# Azure Table Storage for persistent webhook event storage
AZURE_STORAGE_CONNECTION_STRING=

# Optional: Comma-separated list of allowed webhook paths
# WEBHOOK_ALLOWED_KEYS=

# CORS Configuration (optional)
# CORS_ORIGIN=https://app-scripting-editor.trackmangolfdev.com
"@ | Out-File -FilePath $envFilePath -Encoding UTF8
        Write-Host "✅ Created basic .env file" -ForegroundColor Green
    }
}

# Read current .env content
$envContent = Get-Content $envFilePath -Raw

# Check if connection string is already set
if ($envContent -match "AZURE_STORAGE_CONNECTION_STRING=.+") {
    Write-Host ""
    Write-Host "⚠️  Connection string already exists in .env" -ForegroundColor Yellow
    $response = Read-Host "Do you want to update it? (y/N)"
    if ($response -ne "y" -and $response -ne "Y") {
        Write-Host "Cancelled. No changes made." -ForegroundColor Gray
        exit 0
    }
}

# Update or add connection string
if ($envContent -match "AZURE_STORAGE_CONNECTION_STRING=.*") {
    # Replace existing line
    $envContent = $envContent -replace "AZURE_STORAGE_CONNECTION_STRING=.*", "AZURE_STORAGE_CONNECTION_STRING=$connectionString"
} else {
    # Add new line
    $envContent += "`nAZURE_STORAGE_CONNECTION_STRING=$connectionString`n"
}

# Write back to file
$envContent | Out-File -FilePath $envFilePath -Encoding UTF8 -NoNewline

Write-Host ""
Write-Host "✅ Updated .env file with connection string" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Summary:" -ForegroundColor Cyan
Write-Host "  Storage Account: $storageAccountName" -ForegroundColor Gray
Write-Host "  Resource Group: $resourceGroup" -ForegroundColor Gray
Write-Host "  .env File: $envFilePath" -ForegroundColor Gray
Write-Host ""
Write-Host "🚀 Next steps:" -ForegroundColor Cyan
Write-Host "  1. Restart your local server:" -ForegroundColor White
Write-Host "     cd server" -ForegroundColor Gray
Write-Host "     npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "  2. Look for this message in the console:" -ForegroundColor White
Write-Host "     ✅ Azure Table Storage connected: WebhookEvents" -ForegroundColor Green
Write-Host ""
Write-Host "  3. Navigate to Webhook tab and verify events are loading" -ForegroundColor White
Write-Host ""

# Optional: Show first/last few characters of connection string for verification
$preview = $connectionString.Substring(0, [Math]::Min(50, $connectionString.Length)) + "..."
Write-Host "Connection string preview:" -ForegroundColor Gray
Write-Host "  $preview" -ForegroundColor DarkGray
