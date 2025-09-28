param(
    [Parameter(Mandatory=$true)]
    [string]$WebhookPath,
    [int]$DelaySeconds = 1
)

Write-Host "Posting example events to /api/webhook/$WebhookPath with $DelaySeconds second(s) delay"

$dir = "d:\src\app-scripting\server\examples\events"
$files = Get-ChildItem -Path $dir -Filter *.json | Sort-Object Name

foreach ($f in $files) {
    $p = $f.FullName
    Write-Host "Posting $($f.Name) to $WebhookPath..."
    try {
        $body = Get-Content -Raw -Path $p
    } catch {
        Write-Host ("Failed to read {0}: {1}" -f $p, $_.Exception.Message)
        continue
    }

    try {
        $url = "http://localhost:4000/api/webhook/$WebhookPath"
        $res = Invoke-RestMethod -Uri $url -Method Post -Body $body -ContentType 'application/json' -TimeoutSec 10 -ErrorAction Stop
        Write-Host "-> Response: $($res | ConvertTo-Json -Compress)"
    } catch {
        Write-Host (("POST error: {0}" -f $_.Exception.Message))
    }

    Start-Sleep -Seconds $DelaySeconds
}

Write-Host "Done posting examples to $WebhookPath."
