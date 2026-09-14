Add-Type -AssemblyName System.Drawing
$uploadedPath = "C:\Users\Misbah\.gemini\antigravity\brain\00b3e6f4-0ab3-4bfc-9394-7701a778d931\.user_uploaded\media__1785309610885.jpg"
$targetPath = "c:\Users\Misbah\Desktop\pcb manufacturinggg\public\assets\service_pcb_rework_repair.jpg"

$uploaded = [System.Drawing.Image]::FromFile($uploadedPath)
Write-Host ("Newly Uploaded Rework Image: " + $uploaded.Width + "x" + $uploaded.Height)
$uploaded.Dispose()

$target = [System.Drawing.Image]::FromFile($targetPath)
Write-Host ("Current PCB Rework & Repair Image: " + $target.Width + "x" + $target.Height)
$target.Dispose()
