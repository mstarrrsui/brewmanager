$a=Get-Content $args[0]
$x=[xml] $a
$hoplist = [System.Collections.ArrayList]@()

$x.hops.hop | foreach-object {
	$myhash = @{
		Name=$_.name
		Origin=$_.origin
		Description=$_.notes
		Alpha=$_.alpha
		UseIn=$_.use
		Type=$_.type
		Beta=$_.beta
		HSI=$_.hsi
	}
	$hoplist.Add($myhash)
}
ConvertTo-Json $hoplist