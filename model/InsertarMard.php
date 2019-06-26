<?php

require 'DatosBD.php';

$_Ip = $_POST['_Ip'];
$_Usuario_servidor = $_POST['_Usuario_servidor'];
$_Pass_servidor = $_POST['_Pass_servidor'];
$_Base_datos = $_POST['_Base_datos'];

$_matnr=$_POST['matnr'];
$_werks=$_POST['werks'];
$_lgort=$_POST['lgort'];

$con = open_conection($_Ip,$_Usuario_servidor,$_Pass_servidor,$_Base_datos);

$sql = "INSERT INTO mard(matnr, werks, lgort) VALUES (
								 	'".$_matnr."',
									'".$_werks."',
									'".$_lgort."'
								)";

$result = mysqli_query($con,$sql);

close_conection($con);

echo $result;

?>