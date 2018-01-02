<?php

require 'DatosBD.php';
require 'Correlativo.php';

$_Ip = $_POST['_Ip'];
$_Usuario_servidor = $_POST['_Usuario_servidor'];
$_Pass_servidor = $_POST['_Pass_servidor'];
$_Base_datos = $_POST['_Base_datos'];

$_arreglo=$_POST['arreglo'];

$con = open_conection($_Ip,$_Usuario_servidor,$_Pass_servidor,$_Base_datos);

$_matnr = nro_material($con);

$sql = "";

$result = mysqli_query($con,$sql);

close_conection($con);

echo $_matnr;

?>