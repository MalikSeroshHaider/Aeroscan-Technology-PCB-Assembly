Add-Type -AssemblyName System.Drawing
$t1Path = "c:\Users\Misbah\Desktop\pcb manufacturinggg\public\assets\service_through_hole_pcb_assembly.jpg"
$t2Path = "c:\Users\Misbah\Desktop\pcb manufacturinggg\public\assets\service_manual_component_insertion.jpg"

$t1 = [System.Drawing.Image]::FromFile($t1Path)
Write-Host "Target 1 (Through-Hole): Width $($t1.Width), Height $($t1.Height)"
$t1.Dispose()

$t2 = [System.Drawing.Image]::FromFile($t2Path)
Write-Host "Target 2 (Manual Insertion): Width $($t2.Width), Height $($t2.Height)"
$t2.Dispose()
