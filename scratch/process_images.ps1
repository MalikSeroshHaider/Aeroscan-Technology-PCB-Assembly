Add-Type -AssemblyName System.Drawing

$img1Path = "C:\Users\Misbah\.gemini\antigravity\brain\f6fc7811-26e8-4c73-b420-ce26f4ce2764\.user_uploaded\media__1785310701499.jpg"
$img2Path = "C:\Users\Misbah\.gemini\antigravity\brain\f6fc7811-26e8-4c73-b420-ce26f4ce2764\.user_uploaded\media__1785310746731.jpg"

$target1 = "c:\Users\Misbah\Desktop\pcb manufacturinggg\public\assets\service_through_hole_pcb_assembly.jpg"
$target2 = "c:\Users\Misbah\Desktop\pcb manufacturinggg\public\assets\service_manual_component_insertion.jpg"

# Configure JPEG Quality Encoder
$encoder = [System.Drawing.Imaging.Encoder]::Quality
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter($encoder, 95L)
$jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }

# Process Image 1 (Through-Hole PCB Assembly) - Rotate 90 CW to fix orientation
Write-Host "Processing Image 1..."
$img1 = [System.Drawing.Image]::FromFile($img1Path)
$img1.RotateFlip([System.Drawing.RotateFlipType]::Rotate90FlipNone)
$img1.Save($target1, $jpegCodec, $encoderParams)
$img1.Dispose()
Write-Host "Saved Image 1 to $target1"

# Process Image 2 (Manual Component Insertion)
Write-Host "Processing Image 2..."
$img2 = [System.Drawing.Image]::FromFile($img2Path)
$img2.Save($target2, $jpegCodec, $encoderParams)
$img2.Dispose()
Write-Host "Saved Image 2 to $target2"
