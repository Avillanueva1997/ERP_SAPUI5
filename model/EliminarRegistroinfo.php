<?php

require 'DatosBD.php';

$_Ip = $_POST['_Ip'];
$_Usuario_servidor = $_POST['_Usuario_servidor'];
$_Pass_servidor = $_POST['_Pass_servidor'];
$_Base_datos = $_POST['_Base_datos'];

$_infnr = $_POST['_Infnr'];

$con = open_conection($_Ip,$_Usuario_servidor,$_Pass_servidor,$_Base_datos);

$sql = "delete from eina where infnr = '".$_infnr."'";

$result = mysqli_query($con,$sql);

$sql = "delete from eine where infnr = '".$_infnr."'";

$result = mysqli_query($con,$sql);

close_conection($con);

echo $result;

?>