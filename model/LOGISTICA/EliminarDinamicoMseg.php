<?php

require '../DatosBD.php';

$_Ip = $_POST['_Ip'];
$_Usuario_servidor = $_POST['_Usuario_servidor'];
$_Pass_servidor = $_POST['_Pass_servidor'];
$_Base_datos = $_POST['_Base_datos'];
$_Tabla = $_POST['_Tabla'];
$_mblnr = $_POST['_mblnr'];
$_mjahr = $_POST['_mjahr'];

$con = open_conection($_Ip,$_Usuario_servidor,$_Pass_servidor,$_Base_datos);

$sql = "delete from ".$_Tabla." where mblnr ='".$_mblnr."' and mjahr ='".$_mjahr."'";

$result = mysqli_query($con,$sql);

close_conection($con);

echo $result;

?>
