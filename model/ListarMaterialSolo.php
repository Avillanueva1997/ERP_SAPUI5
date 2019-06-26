<?php

require 'DatosBD.php';

$_Ip = $_POST['_Ip'];
$_Usuario_servidor = $_POST['_Usuario_servidor'];
$_Pass_servidor = $_POST['_Pass_servidor'];
$_Base_datos = $_POST['_Base_datos'];

$_matnr = $_POST['_matnr'];
//$_werks = $_POST['_werks'];

$con = open_conection($_Ip,$_Usuario_servidor,$_Pass_servidor,$_Base_datos);

if ($_matnr == "") {

	$sql = "select * from mara";

} else {

	$sql = "select * from mara where matnr = '".$_matnr."'";
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
	$magrv=$row['magrv'];
	$mhdrz=$row['mhdrz'];
	$mhdhb=$row['mhdhb'];
	$mhdlp=$row['mhdlp'];
	$kosch=$row['kosch'];
	$iprkz=$row['iprkz'];
	$rdmhd=$row['rdmhd'];
	


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

    					 );
}

close_conection($con);

$json_string = json_encode($material);

echo $json_string;

?>