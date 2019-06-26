<?php

require '../DatosBD.php';

$_Ip = $_POST['_Ip'];
$_Usuario_servidor = $_POST['_Usuario_servidor'];
$_Pass_servidor = $_POST['_Pass_servidor'];
$_Base_datos = $_POST['_Base_datos'];

$_waers=$_POST['_waers'];
$_spras=$_POST['_spras'];
$_ktext=$_POST['_ktext'];

$con = open_conection($_Ip,$_Usuario_servidor,$_Pass_servidor,$_Base_datos);

$sql = "INSERT INTO tcurc VALUES (
									'".$_waers."',
									'".$_spras."',
									'".$_ktext"'
								)";

$result = mysqli_query($con,$sql);

close_conection($con);

echo $result;

?>