<?php

require 'DatosBD.php';

$_Ip = $_POST['_Ip'];
$_Usuario_servidor = $_POST['_Usuario_servidor'];
$_Pass_servidor = $_POST['_Pass_servidor'];
$_Base_datos = $_POST['_Base_datos'];

$_empresa=$_POST['_empresa'];
$_usuario=$_POST['_usuario'];

$con = open_conection($_Ip,$_Usuario_servidor,$_Pass_servidor,$_Base_datos);

$sql = "select * from usuario where empresa = '" . $_empresa . "' and usuario = '".$_usuario."'";

$result = mysqli_query($con,$sql);

$usuario = array();

while($row = mysqli_fetch_array($result)) 
{
	$empresa=$row['empresa'];
	$usuario=$row['usuario'];
	$nombre=$row['nombre'];
	$apellido=$row['apellido'];
	$correo=$row['correo'];
	$celular=$row['celular'];
	$estado=$row['estado'];
	$log=$row['log'];
    
    $usuario = array(
    						'empresa'=>$empresa,
							'usuario'=>$usuario,
							'nombre'=>$nombre,
							'apellido'=>$apellido,
							'correo'=>$correo,
							'celular'=>$celular,
							'estado'=>$estado,
							'log'=>$log
    					 );
}

close_conection($con);

$json_string = json_encode($usuario);

echo $json_string;

?>