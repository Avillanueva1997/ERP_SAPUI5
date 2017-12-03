<?php

require 'DatosBD.php';

$_Ip = $_POST['_Ip'];
$_Usuario_servidor = $_POST['_Usuario_servidor'];
$_Pass_servidor = $_POST['_Pass_servidor'];
$_Base_datos = $_POST['_Base_datos'];

$_empresa=$_POST['_empresa'];
$_usuario=$_POST['_usuario'];
$_nombre=$_POST['_nombre'];
$_apellido=$_POST['_apellido'];
$_correo=$_POST['_correo'];
$_celular=$_POST['_celular'];
$_estado=$_POST['_estado'];
$_log=$_POST['_log'];
$_contrasena=$_POST['_contrasena'];

$con = open_conection($_Ip,$_Usuario_servidor,$_Pass_servidor,$_Base_datos);

$sql = "update usuario
		set nombre='".$_nombre."',
			apellido='".$_apellido."',
			correo='".$_correo."',
			celular='".$_celular."',
			estado='".$_estado."',
			log='".$_log."'			
		where empresa='".$_empresa."' and usuario = '".$_usuario."'";

$result = mysqli_query($con,$sql);

$con = open_conection('127.0.0.1','root','','erp_main');

$sql = "update login
		set contrasena='".$_contrasena."',
			log='".$_log."'
		where empresa='".$_empresa."' and usuario = '".$_usuario."'";

$result = mysqli_query($con,$sql);

close_conection($con);

echo $result;

?>