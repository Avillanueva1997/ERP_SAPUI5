<?php

require 'DatosBD.php';

$_Ip = $_POST['_Ip'];
$_Usuario_servidor = $_POST['_Usuario_servidor'];
$_Pass_servidor = $_POST['_Pass_servidor'];
$_Base_datos = $_POST['_Base_datos'];

$_infnr = $_POST['_infnr'];
$_ekorg = $_POST['_ekorg'];
$_esokz = $_POST['_esokz'];
$_werks = $_POST['_werks'];

$con = open_conection($_Ip,$_Usuario_servidor,$_Pass_servidor,$_Base_datos);

$sql = "delete from eina where infnr = '".$_infnr."'";

$result = mysqli_query($con,$sql);

$sql = "delete from eine where infnr = '".$_infnr."' and
				  ekorg = '".$_ekorg."' and
				  esokz = '".$_esokz."' and
				  werks = '".$_werks."'";

$result = mysqli_query($con,$sql);

close_conection($con);

echo $result;

?>