<?php

require 'DatosBD.php';

$_Ip = $_POST['_Ip'];
$_Usuario_servidor = $_POST['_Usuario_servidor'];
$_Pass_servidor = $_POST['_Pass_servidor'];
$_Base_datos = $_POST['_Base_datos'];

$_matnr = $_POST['_matnr'];
$_werks = $_POST['_werks'];
$_aland = $_POST['_aland'];

$con = open_conection($_Ip,$_Usuario_servidor,$_Pass_servidor,$_Base_datos);

$sql = "delete from mara where matnr = '".$_matnr."'";

$result = mysqli_query($con,$sql);

$sql = "delete from marc where matnr = '".$_matnr."' and werks = '".$_werks."'";

$result = mysqli_query($con,$sql);

$sql = "delete from mlan where matnr = '".$_matnr."' and aland = '".$_aland."'";

$result = mysqli_query($con,$sql);

close_conection($con);

echo $result;

?>