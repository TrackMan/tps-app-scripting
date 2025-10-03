# Verify Local Azure Storage Configuration
# This script checks if your local environment is properly configured

Write-Host ""
Write-Host "🔍 Verifying Local Azure Storage Configuration" -ForegroundColor Cyan
Write-Host "=" * 60 -ForegroundColor Gray
Write-Host ""

$allGood = $true

# Check 1: .env file exists
Write-Host "1. Checking .env file..." -ForegroundColor White
$envPath = ".\server\.env"
if (Test-Path $envPath) {
    Write-Host "   ✅ .env file exists" -ForegroundColor Green
} else {
    Write-Host "   ❌ .env file not found at: $envPath" -ForegroundColor Red
    $allGood = $false
}

# Check 2: Connection string is set
Write-Host ""
Write-Host "2. Checking AZURE_STORAGE_CONNECTION_STRING..." -ForegroundColor White
if (Test-Path $envPath) {
    $envContent = Get-Content $envPath -Raw
    if ($envContent -match "AZURE_STORAGE_CONNECTION_STRING=(.+)") {
        $connString = $matches[1].Trim()
        if ($connString -and $connString.Length -gt 50) {
            Write-Host "   ✅ Connection string is set" -ForegroundColor Green
            $preview = $connString.Substring(0, 50) + "..."
            Write-Host "   Preview: $preview" -ForegroundColor Gray
            
            # Validate format
            if ($connString -match "AccountName=([^;]+)") {
                $accountName = $matches[1]
                Write-Host "   Account Name: $accountName" -ForegroundColor Gray
            }
            if ($connString -match "AccountKey=") {
                Write-Host "   ✅ Account Key present" -ForegroundColor Green
            } else {
                Write-Host "   ⚠️  Account Key missing or malformed" -ForegroundColor Yellow
                $allGood = $false
            }
        } else {
            Write-Host "   ❌ Connection string is empty or too short" -ForegroundColor Red
            $allGood = $false
        }
    } else {
        Write-Host "   ❌ AZURE_STORAGE_CONNECTION_STRING not found in .env" -ForegroundColor Red
        $allGood = $false
    }
}

# Check 3: Server dependencies
Write-Host ""
Write-Host "3. Checking server dependencies..." -ForegroundColor White
$packageJsonPath = ".\server\package.json"
if (Test-Path $packageJsonPath) {
    $packageJson = Get-Content $packageJsonPath -Raw | ConvertFrom-Json
    $azureTablesVersion = $packageJson.dependencies.'@azure/data-tables'
    if ($azureTablesVersion) {
        Write-Host "   ✅ @azure/data-tables: $azureTablesVersion" -ForegroundColor Green
    } else {
        Write-Host "   ❌ @azure/data-tables not found in dependencies" -ForegroundColor Red
        $allGood = $false
    }
} else {
    Write-Host "   ⚠️  package.json not found" -ForegroundColor Yellow
}

# Check 4: node_modules installed
Write-Host ""
Write-Host "4. Checking installed packages..." -ForegroundColor White
$nodeModulesPath = ".\server\node_modules\@azure\data-tables"
if (Test-Path $nodeModulesPath) {
    Write-Host "   ✅ @azure/data-tables is installed" -ForegroundColor Green
} else {
    Write-Host "   ⚠️  @azure/data-tables not installed" -ForegroundColor Yellow
    Write-Host "   Run: cd server && npm install" -ForegroundColor Gray
}

# Check 5: Server process (optional)
Write-Host ""
Write-Host "5. Checking if server is running..." -ForegroundColor White
try {
    $response = Invoke-WebRequest -Uri "http://localhost:4000/api/health" -Method GET -TimeoutSec 2 -ErrorAction SilentlyContinue 2>$null
    if ($response.StatusCode -eq 200) {
        Write-Host "   ✅ Server is running on port 4000" -ForegroundColor Green
        
        # Check storage status from API if available
        try {
            $healthData = $response.Content | ConvertFrom-Json
            if ($healthData.storage -eq $true) {
                Write-Host "   ✅ Storage is enabled" -ForegroundColor Green
            } elseif ($healthData.storage -eq $false) {
                Write-Host "   ❌ Storage is disabled" -ForegroundColor Red
                $allGood = $false
            }
        } catch {
            # Health endpoint might not return storage status
        }
    }
} catch {
    Write-Host "   ⚠️  Server not running (this is OK if you haven't started it yet)" -ForegroundColor Yellow
}

# Check 6: Azure CLI (optional)
Write-Host ""
Write-Host "6. Checking Azure CLI..." -ForegroundColor White
try {
    $azVersion = az version 2>$null | ConvertFrom-Json
    if ($azVersion) {
        Write-Host "   ✅ Azure CLI is installed" -ForegroundColor Green
        Write-Host "   Version: $($azVersion.'azure-cli')" -ForegroundColor Gray
    }
} catch {
    Write-Host "   ⚠️  Azure CLI not installed (optional)" -ForegroundColor Yellow
    Write-Host "   Install from: https://aka.ms/installazurecli" -ForegroundColor Gray
}

# Summary
Write-Host ""
Write-Host "=" * 60 -ForegroundColor Gray

if ($allGood) {
    Write-Host ""
    Write-Host "✅ Configuration looks good!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "  1. Start the server:" -ForegroundColor White
    Write-Host "     cd server && npm run dev" -ForegroundColor Gray
    Write-Host ""
    Write-Host "  2. Look for this message in console:" -ForegroundColor White
    Write-Host "     ✅ Azure Table Storage connected: WebhookEvents" -ForegroundColor Green
    Write-Host ""
    Write-Host "  3. Open http://localhost:5173 → Webhook tab" -ForegroundColor White
    Write-Host "     You should see historical events from Azure!" -ForegroundColor Gray
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "❌ Configuration issues detected" -ForegroundColor Red
    Write-Host ""
    Write-Host "To fix:" -ForegroundColor Yellow
    Write-Host "  1. Run setup script:" -ForegroundColor White
    Write-Host "     .\setup-local-storage.bat" -ForegroundColor Gray
    Write-Host "     or" -ForegroundColor Gray
    Write-Host "     .\scripts\get-azure-storage-connection.ps1" -ForegroundColor Gray
    Write-Host ""
    Write-Host "  2. Or manually add connection string to server\.env:" -ForegroundColor White
    Write-Host "     AZURE_STORAGE_CONNECTION_STRING=DefaultEndpointsProtocol=https;..." -ForegroundColor Gray
    Write-Host ""
    Write-Host "See: LOCAL_AZURE_STORAGE_SETUP.md for detailed instructions" -ForegroundColor Cyan
    Write-Host ""
}

Write-Host ""
