param()

function Log($m) { Write-Host "[start-vite] $m" }

$port = 5000
$url = "http://localhost:$port/"

function Test-TcpPort([string]$hostname, [int]$port, [int]$timeoutMs = 500) {
    try {
        $client = New-Object System.Net.Sockets.TcpClient
        $iar = $client.BeginConnect($hostname, $port, $null, $null)
        $wait = $iar.AsyncWaitHandle.WaitOne($timeoutMs)
        if (-not $wait) { $client.Close(); return $false }
        $client.EndConnect($iar)
        $client.Close()
        return $true
    } catch {
        return $false
    }
}

Log "Checking if port $port is already listening (TCP connect test)..."
if (Test-TcpPort '127.0.0.1' $port 200) {
    Log "Port $port already has a listener on 127.0.0.1."
} elseif (Test-TcpPort '::1' $port 200) {
    Log "Port $port already has a listener on ::1."
} else {
    Log "No listener on port $port. Starting Vite (npx vite --port $port) in background."
    try {
        # Start Vite in a detached pwsh process so this script doesn't block
        $cmd = "npx vite --port $port"
        Start-Process -FilePath pwsh -ArgumentList '-NoProfile','-WindowStyle','Hidden','-Command',$cmd -WorkingDirectory 'D:\src\app-scripting' -PassThru | Out-Null
        Log "Spawned Vite process."
    } catch {
        Log "Failed to start Vite: $($_.Exception.Message)"
        exit 1
    }
}

# Poll for up to 30 seconds: first wait for TCP open, then check HTTP 200
$tcpOk = $false
for ($i = 0; $i -lt 30; $i++) {
    if (Test-TcpPort '127.0.0.1' $port 200 -or Test-TcpPort '::1' $port 200) { $tcpOk = $true; break }
    Start-Sleep -Seconds 1
}

if (-not $tcpOk) {
    Log "Port $port did not open within 30s. Frontend may have failed to start or bound to a different host."
    exit 2
}

Log "TCP port $port open. Checking HTTP response..."
$ok = $false
for ($i = 0; $i -lt 15; $i++) {
    try {
        $r = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 3
        if ($r.StatusCode -eq 200) { $ok = $true; break }
    } catch {
        Start-Sleep -Seconds 1
    }
}

if ($ok) {
    Log "Frontend is responding at $url"
    exit 0
} else {
    Log "Frontend TCP open but HTTP did not return 200 within timeout. Check Vite logs in your terminal."
    exit 3
}
