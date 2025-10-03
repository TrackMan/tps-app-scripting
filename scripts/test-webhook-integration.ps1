# Test Webhook Integration - Local Environment
# This script tests if your local setup can access Azure Storage events

Write-Host ""
Write-Host "🧪 Testing Webhook Integration" -ForegroundColor Cyan
Write-Host "=" * 70 -ForegroundColor Gray
Write-Host ""

$testsPassed = 0
$testsFailed = 0

# Test 1: Check if local server is running
Write-Host "Test 1: Local server is running..." -ForegroundColor White
try {
    $response = Invoke-WebRequest -Uri "http://localhost:4000/api/health" -Method GET -TimeoutSec 3 -UseBasicParsing -ErrorAction Stop
    if ($response.StatusCode -eq 200) {
        Write-Host "   ✅ PASS: Server is running on port 4000" -ForegroundColor Green
        $testsPassed++
    }
} catch {
    Write-Host "   ❌ FAIL: Server not responding on port 4000" -ForegroundColor Red
    Write-Host "   → Start server: cd server && npm run dev" -ForegroundColor Yellow
    $testsFailed++
}

# Test 2: Check Azure Storage connection
Write-Host ""
Write-Host "Test 2: Azure Storage connection..." -ForegroundColor White
$envPath = ".\server\.env"
if (Test-Path $envPath) {
    $envContent = Get-Content $envPath -Raw
    if ($envContent -match "AZURE_STORAGE_CONNECTION_STRING=(.+)") {
        $connString = $matches[1].Trim()
        if ($connString -and $connString.Length -gt 100 -and $connString -match "AccountName=") {
            Write-Host "   ✅ PASS: Connection string configured" -ForegroundColor Green
            $testsPassed++
        } else {
            Write-Host "   ❌ FAIL: Connection string invalid or empty" -ForegroundColor Red
            $testsFailed++
        }
    } else {
        Write-Host "   ❌ FAIL: Connection string not found" -ForegroundColor Red
        $testsFailed++
    }
} else {
    Write-Host "   ❌ FAIL: .env file not found" -ForegroundColor Red
    $testsFailed++
}

# Test 3: Check server logs for storage initialization
Write-Host ""
Write-Host "Test 3: Check server logs..." -ForegroundColor White
if (Test-Path ".\server\server.log") {
    $logContent = Get-Content ".\server\server.log" -Raw -ErrorAction SilentlyContinue
    if ($logContent -match "Azure Table Storage connected: WebhookEvents") {
        Write-Host "   ✅ PASS: Storage successfully initialized" -ForegroundColor Green
        $testsPassed++
    } elseif ($logContent -match "AZURE_STORAGE_CONNECTION_STRING not set") {
        Write-Host "   ❌ FAIL: Storage not initialized (connection string missing)" -ForegroundColor Red
        $testsFailed++
    } else {
        Write-Host "   ⚠️  SKIP: Cannot determine storage status from logs" -ForegroundColor Yellow
    }
} else {
    Write-Host "   ⚠️  SKIP: No log file found" -ForegroundColor Yellow
}

# Test 4: Get user's webhook path
Write-Host ""
Write-Host "Test 4: Get webhook path from frontend..." -ForegroundColor White
Write-Host "   → You need to be logged in and have opened the Webhook tab" -ForegroundColor Gray
Write-Host "   → Enter your webhook path (or press Enter to skip):" -ForegroundColor Gray
$webhookPath = Read-Host "   Webhook path"

if ($webhookPath) {
    # Test 5: Fetch events from local server
    Write-Host ""
    Write-Host "Test 5: Fetch events from local server..." -ForegroundColor White
    try {
        $eventsUrl = "http://localhost:4000/api/webhook/$webhookPath/events"
        $response = Invoke-WebRequest -Uri $eventsUrl -Method GET -TimeoutSec 5 -UseBasicParsing -ErrorAction Stop
        
        if ($response.StatusCode -eq 200) {
            $data = $response.Content | ConvertFrom-Json
            Write-Host "   ✅ PASS: Events endpoint accessible" -ForegroundColor Green
            Write-Host "   → Count: $($data.count)" -ForegroundColor Gray
            Write-Host "   → Source: $($data.source)" -ForegroundColor Gray
            Write-Host "   → Storage enabled: $($data.storageEnabled)" -ForegroundColor Gray
            
            if ($data.storageEnabled -eq $true) {
                Write-Host "   ✅ Storage is enabled!" -ForegroundColor Green
                $testsPassed++
            } else {
                Write-Host "   ❌ Storage is disabled!" -ForegroundColor Red
                $testsFailed++
            }
            
            if ($data.count -gt 0) {
                Write-Host "   ✅ Found $($data.count) events" -ForegroundColor Green
                $testsPassed++
                
                # Show first event details
                if ($data.events -and $data.events.Count -gt 0) {
                    $firstEvent = $data.events[0]
                    Write-Host ""
                    Write-Host "   Latest event:" -ForegroundColor Cyan
                    Write-Host "     Type: $($firstEvent.eventType)" -ForegroundColor Gray
                    Write-Host "     Time: $($firstEvent.timestamp)" -ForegroundColor Gray
                    Write-Host "     ID: $($firstEvent.id)" -ForegroundColor Gray
                }
            } else {
                Write-Host "   ⚠️  No events found" -ForegroundColor Yellow
                Write-Host "   → This is normal if no webhook events have been sent yet" -ForegroundColor Gray
            }
        }
    } catch {
        Write-Host "   ❌ FAIL: Cannot fetch events" -ForegroundColor Red
        Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Red
        $testsFailed++
    }
    
    # Test 6: Check Vite proxy
    Write-Host ""
    Write-Host "Test 6: Check Vite proxy configuration..." -ForegroundColor White
    try {
        $viteResponse = Invoke-WebRequest -Uri "http://localhost:5000/api/webhook/$webhookPath/events" -Method GET -TimeoutSec 5 -UseBasicParsing -ErrorAction Stop
        if ($viteResponse.StatusCode -eq 200) {
            Write-Host "   ✅ PASS: Vite proxy working" -ForegroundColor Green
            $testsPassed++
        }
    } catch {
        Write-Host "   ❌ FAIL: Vite proxy not working" -ForegroundColor Red
        Write-Host "   → Make sure Vite dev server is running: npm run dev" -ForegroundColor Yellow
        $testsFailed++
    }
}

# Test 7: Check frontend environment
Write-Host ""
Write-Host "Test 7: Check frontend environment..." -ForegroundColor White
if (Test-Path ".env") {
    $frontendEnv = Get-Content ".env" -Raw
    if ($frontendEnv -match "VITE_BACKEND_BASE_URL=(.+)") {
        $backendUrl = $matches[1].Trim()
        Write-Host "   Backend URL: $backendUrl" -ForegroundColor Gray
        
        if ($backendUrl -match "localhost|127\.0\.0\.1") {
            Write-Host "   ✅ PASS: Configured for localhost" -ForegroundColor Green
            $testsPassed++
        } else {
            Write-Host "   ⚠️  INFO: Configured for cloud backend" -ForegroundColor Yellow
            Write-Host "   → WebhookView now auto-detects localhost and uses proxy" -ForegroundColor Gray
            Write-Host "   → This should still work!" -ForegroundColor Green
        }
    } else {
        Write-Host "   ⚠️  INFO: VITE_BACKEND_BASE_URL not set" -ForegroundColor Yellow
        Write-Host "   → Will use window.location.origin (localhost)" -ForegroundColor Gray
    }
}

# Summary
Write-Host ""
Write-Host "=" * 70 -ForegroundColor Gray
Write-Host ""
Write-Host "📊 Test Results:" -ForegroundColor Cyan
Write-Host "   Passed: $testsPassed" -ForegroundColor Green
Write-Host "   Failed: $testsFailed" -ForegroundColor Red
Write-Host ""

if ($testsFailed -eq 0) {
    Write-Host "✅ All tests passed! Your local environment is properly configured." -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "  1. Open http://localhost:5000" -ForegroundColor White
    Write-Host "  2. Login and select a bay" -ForegroundColor White
    Write-Host "  3. Go to Webhook tab" -ForegroundColor White
    Write-Host "  4. You should see events from Azure Storage!" -ForegroundColor White
} else {
    Write-Host "❌ Some tests failed. Please fix the issues above." -ForegroundColor Red
    Write-Host ""
    Write-Host "Common fixes:" -ForegroundColor Yellow
    Write-Host "  1. Run: .\setup-local-storage.bat" -ForegroundColor Gray
    Write-Host "  2. Start server: cd server && npm run dev" -ForegroundColor Gray
    Write-Host "  3. Start frontend: npm run dev" -ForegroundColor Gray
    Write-Host "  4. Check: WEBHOOK_LOCAL_FIX.md" -ForegroundColor Gray
}

Write-Host ""
