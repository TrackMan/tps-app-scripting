param()

function Write-Log($msg) { Write-Host "[start-run] $msg" }

$frontendUrl = 'http://localhost:5000/'
$backendHealth = 'http://localhost:4000/api/health'

Write-Log "Checking if something is listening on port 5000..."
try {
    $tn = Test-NetConnection -ComputerName 'localhost' -Port 5000 -WarningAction SilentlyContinue
} catch {
    $tn = $null
}

if ($tn -and $tn.TcpTestSucceeded) {
    Write-Log "Port 5000 already listening."
} else {
    Write-Log "Port 5000 not in use. Starting Vite dev server (npx vite --port 5000)."
    try {
        # Start Vite in background from repo root
        Start-Process -FilePath npx -ArgumentList 'vite','--port','5000' -WorkingDirectory 'D:\src\app-scripting' -NoNewWindow -WindowStyle Hidden -PassThru | Out-Null
        Start-Sleep -Milliseconds 500
    } catch {
        Write-Log "Failed to start Vite: $($_.Exception.Message)"
        exit 1
    }
}

Write-Log "Waiting for frontend to respond at $frontendUrl"
$frontOk = $false
for ($i=0; $i -lt 30; $i++) {
    try {
        $r = Invoke-WebRequest -Uri $frontendUrl -UseBasicParsing -TimeoutSec 3
        if ($r.StatusCode -eq 200) { $frontOk = $true; break }
    } catch {
        Start-Sleep -Milliseconds 500
    }
}

if (-not $frontOk) {
    Write-Log "Frontend did not respond on $frontendUrl within timeout. Check Vite output in your terminal."
    # still continue to check backend and allow user to decide
} else {
    Write-Log "Frontend is responding (HTTP 200)."
}

Write-Log "Checking backend health at $backendHealth"
$backOk = $false
try {
    $hb = Invoke-WebRequest -Uri $backendHealth -UseBasicParsing -TimeoutSec 5
    if ($hb.StatusCode -eq 200) { $backOk = $true }
} catch {
    Write-Log "Backend health check failed: $($_.Exception.Message)"
}

if (-not $backOk) {
    Write-Log "Backend is not responding at $backendHealth. Start the backend first (node server/dist/index.js)."
    exit 1
} else {
    Write-Log "Backend is healthy."
}

if (-not $frontOk) {
    Write-Log "WARNING: Frontend not confirmed. Proceeding to POST examples to backend anyway because backend is healthy."
}

Write-Log "Running example poster tmp/post-examples.ps1"
try {
    pwsh -File tmp/post-examples.ps1
} catch {
    Write-Log "Posting examples failed: $($_.Exception.Message)"
    exit 1
}

Write-Log "Done. Check the frontend at $frontendUrl (or the backend-served static site at http://localhost:4000/)."
