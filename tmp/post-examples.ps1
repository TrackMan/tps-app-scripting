param()

$dir = "d:\src\app-scripting\server\examples\events"
Write-Host "Using directory: $dir"
Get-ChildItem $dir -Filter *.json | ForEach-Object {
    Write-Host "Posting $($_.Name)"
    try {
        $body = Get-Content -Raw -Path $_.FullName
    } catch {
        Write-Host "Failed to read file: $($_.FullName) - $($_.Exception.Message)"
        return
    }

    try {
        $res = Invoke-RestMethod -Uri 'http://localhost:4000/api/webhook/demo' -Method Post -Body $body -ContentType 'application/json' -ErrorAction Stop
        if ($res -ne $null) {
            Write-Host "-> Response:" ($res | ConvertTo-Json -Compress)
        } else {
            Write-Host "-> Response: (no body, likely 200)"
        }
    } catch {
        Write-Host "POST error" $_.Exception.Message
    }

    Start-Sleep -Milliseconds 200
}

Write-Host "Fetching stored events..."
try {
    $events = Invoke-RestMethod -Uri 'http://localhost:4000/api/webhook/demo/events' -Method Get -ErrorAction Stop
    if ($null -eq $events) { Write-Host 'No response'; exit 1 }
    Write-Host 'Stored events count:' $events.events.Count
    $events.events | Select-Object -First 10 | ForEach-Object { Write-Host ($_.timestamp + ' ' + $_.eventType) }
} catch {
    Write-Host 'GET error' $_.Exception.Message
}
