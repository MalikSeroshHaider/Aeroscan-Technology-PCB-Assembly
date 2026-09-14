Add-Type -AssemblyName System.Drawing
$uploadedPath = "C:\Users\Misbah\.gemini\antigravity\brain\00b3e6f4-0ab3-4bfc-9394-7701a778d931\.user_uploaded\media__1785309377665.png"
$targetPath = "c:\Users\Misbah\Desktop\pcb manufacturinggg\public\assets\service_reflow_soldering.jpg"

$uploaded = [System.Drawing.Image]::FromFile($uploadedPath)
Write-Host ("Newly Uploaded Reflow Image: " + $uploaded.Width + "x" + $uploaded.Height)
$uploaded.Dispose()

$target = [System.Drawing.Image]::FromFile($targetPath)
Write-Host ("Current Reflow Soldering Image: " + $target.Width + "x" + $target.Height)
$target.Dispose()
