<?php

require 'DatosBD.php';

$_Ip = $_POST['_Ip'];
$_Usuario_servidor = $_POST['_Usuario_servidor'];
$_Pass_servidor = $_POST['_Pass_servidor'];
$_Base_datos = $_POST['_Base_datos'];

$_lifnr=$_POST['lifnr'];
$_banks=$_POST['banks'];
$_bankl=$_POST['bankl'];
$_bankn=$_POST['bankn'];
$_bkont=$_POST['bkont'];
$_bvtyp=$_POST['bvtyp'];
$_xezer=$_POST['xezer'];
$_bkref=$_POST['bkref'];
$_koinh=$_POST['koinh'];

$con = open_conection($_Ip,$_Usuario_servidor,$_Pass_servidor,$_Base_datos);

$sql = "INSERT INTO lfbk VALUES (
								 	'".$_lifnr."',
									'".$_banks."',
									'".$_bankl."',
									'".$_bankn."',
									'".$_bkont."',
									'".$_bvtyp."',
									'".$_xezer."',
									'".$_bkref."',
									'".$_koinh."'
								)";

$result = mysqli_query($con,$sql);

close_conection($con);

echo $result;

?>