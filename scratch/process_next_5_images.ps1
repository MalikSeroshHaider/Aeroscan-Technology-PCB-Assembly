Add-Type -AssemblyName System.Drawing

function Save-OptimizedImage($srcPath, $destPath, $maxWidth = 1920) {
    if (-not (Test-Path $srcPath)) {
        Write-Error "Source path does not exist: $srcPath"
        return
    }
    $img = [System.Drawing.Image]::FromFile($srcPath)
    $w = $img.Width
    $h = $img.Height
    
    if ($w -gt $maxWidth -or $h -gt $maxWidth) {
        if ($w -gt $h) {
            $newW = $maxWidth
            $newH = [int]($h * ($maxWidth / $w))
        } else {
            $newH = $maxWidth
            $newW = [int]($w * ($maxWidth / $h))
        }
    } else {
        $newW = $w
        $newH = $h
    }
    
    $bmp = New-Object System.Drawing.Bitmap($newW, $newH)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.DrawImage($img, 0, 0, $newW, $newH)
    
    $encoder = [System.Drawing.Imaging.Encoder]::Quality
    $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter($encoder, [long]85)
    $jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
    
    $bmp.Save($destPath, $jpegCodec, $encoderParams)
    
    $g.Dispose()
    $bmp.Dispose()
    $img.Dispose()
    Write-Host "Saved $destPath ($newW x $newH)"
}

$baseDir = "C:\Users\Misbah\.gemini\antigravity\brain\dfb75563-16c2-474a-9298-e1b705b8fbfe\.user_uploaded"
$outDir = "c:\Users\Misbah\Desktop\pcbb\public\videos"

Save-OptimizedImage "$baseDir\media__1785392390636.jpg" "$outDir\Assembled_Printed_Circuit_Board.jpg"
Save-OptimizedImage "$baseDir\media__1785392397711.jpg" "$outDir\Manual_testing.jpg"
Save-OptimizedImage "$baseDir\media__1785392404508.jpg" "$outDir\PCB_Installation_Process.jpg"
Save-OptimizedImage "$baseDir\media__1785392410338.jpg" "$outDir\PCB_Maintenance.jpg"
Save-OptimizedImage "$baseDir\media__1785392419504.jpg" "$outDir\PCB_rework_and_repair.jpg"
