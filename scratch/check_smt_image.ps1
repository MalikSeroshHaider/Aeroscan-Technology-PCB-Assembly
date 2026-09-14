Add-Type -AssemblyName System.Drawing
$uploadedPath = "C:\Users\Misbah\.gemini\antigravity\brain\00b3e6f4-0ab3-4bfc-9394-7701a778d931\.user_uploaded\media__1785309074175.png"
$targetPath = "c:\Users\Misbah\Desktop\pcb manufacturinggg\public\assets\service_smt_pcb_assembly.jpg"

$uploaded = [System.Drawing.Image]::FromFile($uploadedPath)
Write-Host ("Newly Uploaded Image: " + $uploaded.Width + "x" + $uploaded.Height)
$uploaded.Dispose()

$target = [System.Drawing.Image]::FromFile($targetPath)
Write-Host ("Current SMT PCB Assembly Image: " + $target.Width + "x" + $target.Height)
$target.Dispose()
