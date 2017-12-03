<?php

require 'DatosBD.php';

$_Ip = $_POST['_Ip'];
$_Usuario_servidor = $_POST['_Usuario_servidor'];
$_Pass_servidor = $_POST['_Pass_servidor'];
$_Base_datos = $_POST['_Base_datos'];

$_empresa=$_POST['_empresa'];
$_usuario=$_POST['_usuario'];

$con = open_conection($_Ip,$_Usuario_servidor,$_Pass_servidor,$_Base_datos);

$sql = "delete from usuario where empresa = '" . $_empresa . "' and usuario = '".$_usuario."'";

$result = mysqli_query($con,$sql);

$con = open_conection('127.0.0.1','root','','erp_main');

$sql = "delete from login where empresa = '" . $_empresa . "' and usuario = '".$_usuario."'";

$result = mysqli_query($con,$sql);

close_conection($con);

echo $result;

?>