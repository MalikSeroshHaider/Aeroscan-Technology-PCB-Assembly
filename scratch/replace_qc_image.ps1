Add-Type -AssemblyName System.Drawing

$uploadedPath = "C:\Users\Misbah\.gemini\antigravity\brain\00b3e6f4-0ab3-4bfc-9394-7701a778d931\.user_uploaded\media__1785309864146.jpg"
$targetPath = "c:\Users\Misbah\Desktop\pcb manufacturinggg\public\assets\service_functional_inspection_qc.jpg"

$uploaded = [System.Drawing.Image]::FromFile($uploadedPath)
Write-Host ("Newly Uploaded QC Image: " + $uploaded.Width + "x" + $uploaded.Height)
$uploaded.Dispose()

$bmp = [System.Drawing.Bitmap]::FromFile($uploadedPath)

$jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]95)

# Save with overwrite
$bmp.Save($targetPath, $jpegCodec, $encoderParams)
$bmp.Dispose()

Write-Host "Successfully replaced Functional Inspection & Quality Control image at $targetPath"
