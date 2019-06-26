<?php

require 'DatosBD.php';

$_Ip = $_POST['_Ip'];
$_Usuario_servidor = $_POST['_Usuario_servidor'];
$_Pass_servidor = $_POST['_Pass_servidor'];
$_Base_datos = $_POST['_Base_datos'];

$_matnr = $_POST['_matnr'];
$_werks = $_POST['_werks'];

$con = open_conection($_Ip,$_Usuario_servidor,$_Pass_servidor,$_Base_datos);

if ($_matnr == "" && $_werks == "") {

	$sql = "select * from mara
	        inner join marc on mara.matnr = marc.matnr";

} else {

	$sql = "select * from mara
			inner join marc on mara.matnr = marc.matnr
			where mara.matnr = '".$_matnr."' and
			      marc.werks = '".$_werks."'";


}


$result = mysqli_query($con,$sql);

$material = array();

while($row = mysqli_fetch_array($result)) 
{ 	    
    $matnr=$row['matnr'];
    $maktg=$row['maktg'];
	$mtart=$row['mtart'];
	$matkl=$row['matkl'];
	$bismt=$row['bismt'];
	$meins=$row['meins'];
	$bstme=$row['bstme'];
	$brgew=$row['brgew'];
	$ntgew=$row['ntgew'];
	$gewei=$row['gewei'];
	$volum=$row['volum'];
	$voleh=$row['voleh'];
	$raube=$row['raube'];
	$tempb=$row['tempb'];
	$ean11=$row['ean11'];
	$numtp=$row['numtp'];
	$vabme=$row['vabme'];
	$magrv=$row['magrv'];;
	$mhdrz=$row['mhdrz'];
	$mhdhb=$row['mhdhb'];
	$mhdlp=$row['mhdlp'];
	$kosch=$row['kosch'];
	$iprkz=$row['iprkz'];
	$rdmhd=$row['rdmhd'];
	
	$werks=$row['werks'];
	$mmsta=$row['mmsta'];
	$ekgrp=$row['ekgrp'];
	$ausme=$row['ausme'];
	$maxlz=$row['maxlz'];
	$lzeih=$row['lzeih'];

	/*$aland=$row['aland'];
	$taxm1=$row['taxm1'];
	$taxm2=$row['taxm2'];
	$taxm3=$row['taxm3'];
	$taxm4=$row['taxm4'];
	$taxm5=$row['taxm5'];
	$taxm6=$row['taxm6'];
	$taxm7=$row['taxm7'];
	$taxm8=$row['taxm8'];
	$taxm9=$row['taxm9'];
	$taxim=$row['taxim'];*/

    $material[] = array(
    						'matnr'=>$matnr,
    						'maktg'=>$maktg,
							'mtart'=>$mtart,
							'matkl'=>$matkl,
							'bismt'=>$bismt,
							'meins'=>$meins,
							'bstme'=>$bstme,
							'brgew'=>$brgew,
							'ntgew'=>$ntgew,
							'gewei'=>$gewei,
							'volum'=>$volum,
							'voleh'=>$voleh,
							'raube'=>$raube,
							'tempb'=>$tempb,
							'ean11'=>$ean11,
							'numtp'=>$numtp,
							'vabme'=>$vabme,
							'magrv'=>$magrv,
							'mhdrz'=>$mhdrz,
							'mhdhb'=>$mhdhb,
							'mhdlp'=>$mhdlp,
							'kosch'=>$kosch,
							'iprkz'=>$iprkz,
							'rdmhd'=>$rdmhd,

							'werks'=>$werks,
							'mmsta'=>$mmsta,
							'ekgrp'=>$ekgrp,
							'ausme'=>$ausme,
							'maxlz'=>$maxlz,
							'lzeih'=>$lzeih

							/*'aland'=>$aland,
							'taxm1'=>$taxm1,
							'taxm2'=>$taxm2,
							'taxm3'=>$taxm3,
							'taxm4'=>$taxm4,
							'taxm5'=>$taxm5,
							'taxm6'=>$taxm6,
							'taxm7'=>$taxm7,
							'taxm8'=>$taxm8,
							'taxm9'=>$taxm9,
							'taxim'=>$taxim*/
    					 );
}

close_conection($con);

$json_string = json_encode($material);

echo $json_string;

?>