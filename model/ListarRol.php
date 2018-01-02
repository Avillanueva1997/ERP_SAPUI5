<?php

require 'DatosBD.php';

$_Ip = $_POST['_Ip'];
$_Usuario_servidor = $_POST['_Usuario_servidor'];
$_Pass_servidor = $_POST['_Pass_servidor'];
$_Base_datos = $_POST['_Base_datos'];

$_rol=$_POST['_rol'];

$con = open_conection($_Ip,$_Usuario_servidor,$_Pass_servidor,$_Base_datos);

$sql = "select a.rol, a.transaccion, b.idioma, b.descripcion from rol as a left join transacciont as b on a.transaccion = b.transaccion where rol = '".$_rol."'";

$result = mysqli_query($con,$sql);

$roles = array();

while($row = mysqli_fetch_array($result)) 
{
	$rol=$row['rol'];
	$transaccion=$row['transaccion'];
	$idioma=$row['idioma'];
	$descripcion=$row['descripcion'];
    
    $roles = array(
    					    'rol'=>$rol,
							'transaccion'=>$transaccion,
							'idioma'=>$idioma,
							'descripcion'=>$descripcion
    					 );
}

close_conection($con);

$json_string = json_encode($roles);

echo $json_string;

?>