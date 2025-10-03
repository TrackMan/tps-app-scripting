# Restart Local Development Environment
# This script helps restart both backend and frontend servers

Write-Host ""
Write-Host "🔄 Restarting Local Development Environment" -ForegroundColor Cyan
Write-Host "=" * 60 -ForegroundColor Gray
Write-Host ""

# Function to find and kill processes on a port
function Stop-ProcessOnPort {
    param([int]$Port)
    
    $connections = netstat -ano | Select-String ":$Port.*LISTENING"
    if ($connections) {
        foreach ($conn in $connections) {
            if ($conn -match "\s+(\d+)\s*$") {
                $pid = $matches[1]
                try {
                    $process = Get-Process -Id $pid -ErrorAction Stop
                    Write-Host "   Stopping $($process.ProcessName) (PID: $pid) on port $Port..." -ForegroundColor Yellow
                    Stop-Process -Id $pid -Force -ErrorAction Stop
                    Start-Sleep -Milliseconds 500
                    Write-Host "   ✅ Stopped" -ForegroundColor Green
                } catch {
                    Write-Host "   ⚠️  Could not stop process $pid" -ForegroundColor Yellow
                }
            }
        }
    } else {
        Write-Host "   ℹ️  No process found on port $Port" -ForegroundColor Gray
    }
}

# Step 1: Verify .env configuration
Write-Host "Step 1: Verifying configuration..." -ForegroundColor White
$envPath = ".\server\.env"
$envOk = $false

if (Test-Path $envPath) {
    $envContent = Get-Content $envPath -Raw
    if ($envContent -match "AZURE_STORAGE_CONNECTION_STRING=(.+)") {
        $connString = $matches[1].Trim()
        if ($connString -and $connString.Length -gt 100) {
            Write-Host "   ✅ Azure Storage connection string configured" -ForegroundColor Green
            $envOk = $true
        } else {
            Write-Host "   ❌ Azure Storage connection string is empty or invalid" -ForegroundColor Red
        }
    } else {
        Write-Host "   ❌ Azure Storage connection string not found in .env" -ForegroundColor Red
    }
} else {
    Write-Host "   ❌ server\.env file not found" -ForegroundColor Red
}

if (-not $envOk) {
    Write-Host ""
    Write-Host "⚠️  Configuration issue detected!" -ForegroundColor Yellow
    Write-Host "Run this first: .\setup-local-storage.bat" -ForegroundColor Yellow
    $continue = Read-Host "Continue anyway? (y/N)"
    if ($continue -ne "y" -and $continue -ne "Y") {
        exit 1
    }
}

# Step 2: Stop backend server (port 4000)
Write-Host ""
Write-Host "Step 2: Stopping backend server (port 4000)..." -ForegroundColor White
Stop-ProcessOnPort -Port 4000

# Step 3: Stop frontend dev server (port 5000)
Write-Host ""
Write-Host "Step 3: Stopping frontend dev server (port 5000)..." -ForegroundColor White
Stop-ProcessOnPort -Port 5000

Write-Host ""
Write-Host "=" * 60 -ForegroundColor Gray
Write-Host ""
Write-Host "✅ Servers stopped!" -ForegroundColor Green
Write-Host ""
Write-Host "Now start them manually:" -ForegroundColor Cyan
Write-Host ""
Write-Host "📦 Terminal 1 - Backend:" -ForegroundColor Yellow
Write-Host "   cd server" -ForegroundColor Gray
Write-Host "   npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "   Look for this message:" -ForegroundColor White
Write-Host "   ✅ Azure Table Storage connected: WebhookEvents" -ForegroundColor Green
Write-Host ""
Write-Host "📦 Terminal 2 - Frontend:" -ForegroundColor Yellow
Write-Host "   npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "Then test:" -ForegroundColor Cyan
Write-Host "   .\scripts\test-webhook-integration.ps1" -ForegroundColor Gray
Write-Host ""
