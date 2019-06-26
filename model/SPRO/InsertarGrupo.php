<?php

require '../DatosBD.php';

$_Ip = $_POST['_Ip'];
$_Usuario_servidor = $_POST['_Usuario_servidor'];
$_Pass_servidor = $_POST['_Pass_servidor'];
$_Base_datos = $_POST['_Base_datos'];

$_matkl=$_POST['_matkl'];
$_spras=$_POST['_spras'];
$_butxt=$_POST['_butxt'];


$con = open_conection($_Ip,$_Usuario_servidor,$_Pass_servidor,$_Base_datos);

$sql = "INSERT INTO t023 VALUES (
									'".$_matkl."',
									'".$_spras."',
									'".$_butxt."'
								)";

$result = mysqli_query($con,$sql);

close_conection($con);

echo $result;

?>