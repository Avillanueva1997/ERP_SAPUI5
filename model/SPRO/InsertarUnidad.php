<?php

require '../DatosBD.php';

$_Ip = $_POST['_Ip'];
$_Usuario_servidor = $_POST['_Usuario_servidor'];
$_Pass_servidor = $_POST['_Pass_servidor'];
$_Base_datos = $_POST['_Base_datos'];

$_msehi=$_POST['_msehi'];
$_spras=$_POST['_spras'];
$_mseht=$_POST['_mseht'];


$con = open_conection($_Ip,$_Usuario_servidor,$_Pass_servidor,$_Base_datos);

$sql = "INSERT INTO t006 VALUES (
									'".$_msehi."',
									'".$_spras."',
									'".$_mseht."'
								)";

$result = mysqli_query($con,$sql);

close_conection($con);

echo $result;

?>