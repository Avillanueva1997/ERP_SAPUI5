<?php

require '../DatosBD.php';

$_Ip = $_POST['_Ip'];
$_Usuario_servidor = $_POST['_Usuario_servidor'];
$_Pass_servidor = $_POST['_Pass_servidor'];
$_Base_datos = $_POST['_Base_datos'];

$_mblnr=$_POST['_mblnr'];
$_mjahr=$_POST['_mjahr'];
$_zeile=$_POST['_zeile'];
$_matnr=$_POST['_matnr'];
$_maktx=$_POST['_maktx'];
$_menge=$_POST['_menge'];
$_meins=$_POST['_meins'];
$_lgort=$_POST['_lgort'];
$_kostl=$_POST['_kostl'];
$_sakto=$_POST['_sakto'];
$_charg=$_POST['_charg'];
$_bwtar=$_POST['_bwtar'];
$_bwart=$_POST['_bwart'];
$_shkzg=$_POST['_shkzg'];
$_insmk=$_POST['_insmk'];
$_kunnr=$_POST['_kunnr'];
$_lifnr=$_POST['_lifnr'];
$_werks=$_POST['_werks'];

$con = open_conection($_Ip,$_Usuario_servidor,$_Pass_servidor,$_Base_datos);

$sql = "INSERT INTO mseg VALUES (
								 	'".$_mblnr."',
									'".$_mjahr."',
									'".$_zeile."',
									'".$_matnr."',
									'".$_maktx."',
									'".$_menge."',
									'".$_meins."',
									'".$_lgort."',
									'".$_kostl."',
									'".$_sakto."',
									'".$_charg."',
									'".$_bwtar."',
									'".$_bwart."',
									'".$_shkzg."',
									'".$_insmk."',
									'".$_kunnr."',
									'".$_lifnr."',
									'".$_werks."'
								)";

$result = mysqli_query($con,$sql);

close_conection($con);

echo $result;

?>