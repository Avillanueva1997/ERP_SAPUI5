<?php

require '../../DatosBD.php';

$_Ip = $_POST['_Ip'];
$_Usuario_servidor = $_POST['_Usuario_servidor'];
$_Pass_servidor = $_POST['_Pass_servidor'];
$_Base_datos = $_POST['_Base_datos'];

$_ebeln = $_POST['_ebeln'];


$con = open_conection($_Ip,$_Usuario_servidor,$_Pass_servidor,$_Base_datos);

if ($_ebeln == "" ) {

	$sql = "select * from ekko";
	
} else {

	$sql = "select * from ekko where ebeln = '" . $_ebeln . "'";

}


$result = mysqli_query($con,$sql);

$ekko = array();

while($row = mysqli_fetch_array($result)) 
{ 	    
    $ebeln=$row['ebeln'];
	$bukrs=$row['bukrs'];
	$zterm=$row['zterm'];
	$waers=$row['waers'];
	$wkurs=$row['wkurs'];
	$kufix=$row['kufix'];
	$zbd1t=$row['zbd1t'];
	$zbd2t=$row['zbd2t'];
	$zbd3t=$row['zbd3t'];
	$adrnr=$row['adrnr'];
	$ekorg=$row['ekorg'];
	$ekgrp=$row['ekgrp'];
	$statu=$row['statu'];
	$erdat=$row['erdat'];
	$ernam=$row['ernam'];

    $ekko[] = array(
    						'ebeln'=>$ebeln,
							'bukrs'=>$bukrs,
							'zterm'=>$zterm,
							'waers'=>$waers,
							'wkurs'=>$wkurs,
							'kufix'=>$kufix,
							'zbd1t'=>$zbd1t,
							'zbd2t'=>$zbd2t,
							'zbd3t'=>$zbd3t,
							'adrnr'=>$adrnr,
							'ekorg'=>$ekorg,
							'ekgrp'=>$ekgrp,
							'statu'=>$statu,
							'erdat'=>$erdat,
							'ernam'=>$ernam
						);
}

close_conection($con);

$json_string = json_encode($ekko);

echo $json_string;

?>