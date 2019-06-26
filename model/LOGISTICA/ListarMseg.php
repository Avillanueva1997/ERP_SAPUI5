<?php

require '../DatosBD.php';

$_Ip = $_POST['_Ip'];
$_Usuario_servidor = $_POST['_Usuario_servidor'];
$_Pass_servidor = $_POST['_Pass_servidor'];
$_Base_datos = $_POST['_Base_datos'];

$_mblnr = $_POST['_mblnr'];
$_mjahr = $_POST['_mjahr'];
//$_zeile = $_POST['_zeile'];


$con = open_conection($_Ip,$_Usuario_servidor,$_Pass_servidor,$_Base_datos);

if ($_mblnr == "" && $_mjahr == "") {

	$sql = "select * from mseg";
	
} else {

	$sql = "select * from mseg where mblnr = '" . $_mblnr . "' and mjahr = '" . $_mjahr . "'";

}


$result = mysqli_query($con,$sql);

$mseg = array();

while($row = mysqli_fetch_array($result)) 
{ 	    
    $mblnr=$row['mblnr'];
	$mjahr=$row['mjahr'];
	$zeile=$row['zeile'];
	$matnr=$row['matnr'];
	$maktx=$row['maktx'];
	$menge=$row['menge'];
	$meins=$row['meins'];
	$lgort=$row['lgort'];
	$kostl=$row['kostl'];
	$sakto=$row['sakto'];
	$charg=$row['charg'];
	$bwtar=$row['bwtar'];
	$bwart=$row['bwart'];
	$shkzg=$row['shkzg'];
	$insmk=$row['insmk'];
	$kunnr=$row['kunnr'];
	$lifnr=$row['lifnr'];
	$werks=$row['werks'];
	$umwrk=$row['umwrk'];
	$umlgo=$row['umlgo'];

    $mseg[] = array(
    						'mblnr'=>$mblnr,
							'mjahr'=>$mjahr,
							'zeile'=>$zeile,
							'matnr'=>$matnr,
							'maktx'=>$maktx,
							'menge'=>$menge,
							'meins'=>$meins,
							'lgort'=>$lgort,
							'kostl'=>$kostl,
							'sakto'=>$sakto,
							'charg'=>$charg,
							'bwtar'=>$bwtar,
							'bwart'=>$bwart,
							'shkzg'=>$shkzg,
							'insmk'=>$insmk,
							'kunnr'=>$kunnr,
							'lifnr'=>$lifnr,
							'werks'=>$werks,
							'umwrk'=>$umwrk,
							'umlgo'=>$umlgo

    					 );
}

close_conection($con);

$json_string = json_encode($mseg);

echo $json_string;

?>