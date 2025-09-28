param(
    [int]$DelaySeconds = 1
)

Write-Host "Posting example events from server/examples/events with $DelaySeconds second(s) delay between posts"

$dir = "d:\src\app-scripting\server\examples\events"
$files = Get-ChildItem -Path $dir -Filter *.json | Sort-Object Name

foreach ($f in $files) {
    $p = $f.FullName
    Write-Host "Posting $($f.Name)..."
    try {
        $body = Get-Content -Raw -Path $p
    } catch {
        Write-Host ("Failed to read {0}: {1}" -f $p, $_.Exception.Message)
        continue
    }

    try {
        $res = Invoke-RestMethod -Uri 'http://localhost:4000/api/webhook/demo' -Method Post -Body $body -ContentType 'application/json' -TimeoutSec 10 -ErrorAction Stop
        Write-Host "-> Response: $($res | ConvertTo-Json -Compress)"
    } catch {
        Write-Host (("POST error: {0}" -f $_.Exception.Message))
    }

    Start-Sleep -Seconds $DelaySeconds
}

Write-Host "Done posting examples."
