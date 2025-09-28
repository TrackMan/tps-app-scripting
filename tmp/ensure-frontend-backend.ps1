param()

function Log($m) { Write-Host "[ensure] $m" }

$backend = 'http://localhost:4000/api/health'
$frontendUrl = 'http://localhost:5000/'

# 1) Check backend
Log "Checking backend health at $backend"
try {
    $hb = Invoke-WebRequest -Uri $backend -UseBasicParsing -TimeoutSec 5
    Log "Backend responded: $($hb.StatusCode)"
} catch {
    Log ("Backend did not respond: {0}" -f $_.Exception.Message)
    exit 1
}

# 2) Find processes listening on port 5000
Log "Detecting processes listening on TCP port 5000"
try {
    $listeners = Get-NetTCPConnection -LocalPort 5000 -ErrorAction SilentlyContinue | Select-Object -Unique LocalAddress,LocalPort,State,OwningProcess
} catch {
    $listeners = $null
}

if ($listeners -and $listeners.Count -gt 0) {
    Log "Found listeners on port 5000:"
    $listeners | ForEach-Object { Log (" - {0}:{1} {2} PID={3}" -f $_.LocalAddress,$_.LocalPort,$_.State,$_.OwningProcess) }
    $foundPids = $listeners | ForEach-Object { $_.OwningProcess } | Select-Object -Unique
    foreach ($foundPid in $foundPids) {
        try {
            $proc = Get-Process -Id $foundPid -ErrorAction Stop
            Log "Stopping process PID=$($proc.Id) Name=$($proc.ProcessName)"
            Stop-Process -Id $proc.Id -Force -ErrorAction Stop
            Log "Stopped PID $($proc.Id)"
        } catch {
            Log (("Failed to stop PID {0}: {1}" -f $foundPid, $_.Exception.Message))
        }
    }
    Start-Sleep -Seconds 1
} else {
    Log "No existing listener on port 5000"
}

# 3) Start Vite on port 5000
Log "Starting Vite on port 5000 (npx vite --port 5000)"
try {
    Start-Process -FilePath pwsh -ArgumentList '-NoProfile','-Command','npx vite --port 5000' -WorkingDirectory 'D:\src\app-scripting' -PassThru | Out-Null
    Log "Spawned Vite (background)."
} catch {
    Log (("Failed to spawn Vite: {0}" -f $_.Exception.Message))
    exit 2
}

# 4) Poll for HTTP readiness
Log "Waiting up to 30s for frontend to respond at $frontendUrl"
$ok = $false
for ($i=0; $i -lt 30; $i++) {
    try {
        $r = Invoke-WebRequest -Uri $frontendUrl -UseBasicParsing -TimeoutSec 3
        if ($r.StatusCode -eq 200) { $ok = $true; break }
    } catch {
        Start-Sleep -Seconds 1
    }
}

if ($ok) {
    Log "Frontend responding at $frontendUrl"
    exit 0
} else {
    Log "Frontend did not respond on port 5000 within timeout. Showing netstat for 5000 and 5001."
    netstat -ano | Select-String ':5000' | ForEach-Object { Write-Host $_ }
    netstat -ano | Select-String ':5001' | ForEach-Object { Write-Host $_ }
    exit 3
}
