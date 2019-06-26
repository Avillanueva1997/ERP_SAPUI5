<?php

require '../DatosBD.php';

$_Ip = $_POST['_Ip'];
$_Usuario_servidor = $_POST['_Usuario_servidor'];
$_Pass_servidor = $_POST['_Pass_servidor'];
$_Base_datos = $_POST['_Base_datos'];

$_bwart=$_POST['_bwart'];
$_spras=$_POST['_spras'];
$_shkzg=$_POST['_shkzg'];
$_btext=$_POST['_btext'];


$con = open_conection($_Ip,$_Usuario_servidor,$_Pass_servidor,$_Base_datos);

	$sql = "INSERT INTO t156 VALUES (
								 	'".$_bwart."',
									'".$_spras."',
									'".$_shkzg."',
									'".$_btext."'
								)";

    $result = mysqli_query($con,$sql);


close_conection($con);

echo $result;

?>