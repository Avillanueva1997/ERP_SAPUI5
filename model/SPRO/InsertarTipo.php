<?php

require '../DatosBD.php';

$_Ip = $_POST['_Ip'];
$_Usuario_servidor = $_POST['_Usuario_servidor'];
$_Pass_servidor = $_POST['_Pass_servidor'];
$_Base_datos = $_POST['_Base_datos'];

$_mtart=$_POST['_mtart'];
$_spras=$_POST['_spras'];
$_mtbez=$_POST['_mtbez'];



$con = open_conection($_Ip,$_Usuario_servidor,$_Pass_servidor,$_Base_datos);

$sql = "INSERT INTO t134 VALUES (
									'".$_mtart."',
									'".$_spras"',
									'".$_mtbez."'
								)";

$result = mysqli_query($con,$sql);

close_conection($con);

echo $result;

?>