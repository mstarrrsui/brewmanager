$a=Get-Content $args[0]
$x=[xml] $a
$hoplist = [System.Collections.ArrayList]@()

$x.hops.hop | % {$i=0} {
	$myhash = @{
	    id=$i
		name=$_.name
		countryOfOrigin=$_.origin
		description=$_.notes
		alphaAcid=$_.alpha
		useIn=$_.use
		type=$_.type
		betaAcid=$_.beta
		hsi=$_.hsi
	}
	$hoplist.Add($myhash)
	$i++
}
ConvertTo-Json $hoplist