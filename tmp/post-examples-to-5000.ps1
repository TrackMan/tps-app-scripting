$Target='http://localhost:5000/api/webhook/39a1ebb6-c429-4e01-b83d-8774a4573a1f'
Write-Host "Posting example events to $Target with 1 second(s) delay"
$dir = "d:\src\app-scripting\server\examples\events"
$files = Get-ChildItem -Path $dir -Filter *.json | Sort-Object Name
foreach ($f in $files) {
    Write-Host "Posting $($f.Name)..."
    $body = Get-Content -Raw -Path $f.FullName
    try {
        $res = Invoke-RestMethod -Uri $Target -Method Post -Body $body -ContentType 'application/json' -TimeoutSec 6 -ErrorAction Stop
        Write-Host "-> Response: $($res | ConvertTo-Json -Compress)"
    } catch {
        Write-Host "POST error: $($_.Exception.Message)"
    }
    Start-Sleep -Seconds 1
}
Write-Host "Done posting examples to $Target."