Add-Type -AssemblyName System.Drawing

$uploadedPath = "C:\Users\Misbah\.gemini\antigravity\brain\00b3e6f4-0ab3-4bfc-9394-7701a778d931\.user_uploaded\media__1785309610885.jpg"
$targetPath = "c:\Users\Misbah\Desktop\pcb manufacturinggg\public\assets\service_pcb_rework_repair.jpg"

$bmp = [System.Drawing.Bitmap]::FromFile($uploadedPath)

$jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]95)

# Save with overwrite
$bmp.Save($targetPath, $jpegCodec, $encoderParams)
$bmp.Dispose()

Write-Host "Successfully replaced PCB Rework & Repair image at $targetPath"
