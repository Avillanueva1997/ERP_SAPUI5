<?php

require 'DatosBD.php';

$_Ip = $_POST['_Ip'];
$_Usuario_servidor = $_POST['_Usuario_servidor'];
$_Pass_servidor = $_POST['_Pass_servidor'];
$_Base_datos = $_POST['_Base_datos'];

$_lifnr = $_POST['_Lifnr'];

$con = open_conection($_Ip,$_Usuario_servidor,$_Pass_servidor,$_Base_datos);

$sql = "delete from lfa1 where lifnr = '".$_lifnr."'";

$result = mysqli_query($con,$sql);

$sql = "delete from lfm1 where lifnr = '".$_lifnr."'";

$result = mysqli_query($con,$sql);

close_conection($con);

echo $result;

?>