<?php

require 'DatosBD.php';

$_Ip = $_POST['_Ip'];
$_Usuario_servidor = $_POST['_Usuario_servidor'];
$_Pass_servidor = $_POST['_Pass_servidor'];
$_Base_datos = $_POST['_Base_datos'];

$_Matnr = $_POST['_Matnr'];
$_Werks = $_POST['_Werks'];
$_Lgort = $_POST['_Lgort'];

$con = open_conection($_Ip,$_Usuario_servidor,$_Pass_servidor,$_Base_datos);

$sql = "select * from mard where matnr = '".$_Matnr."' and werks = '".$_Werks."' and lgort = '".$_Lgort."'";

$result = mysqli_query($con,$sql);

$row_cnt = mysqli_num_rows($result);

if ($row_cnt == 0) {
	

	$sql = "insert into mard (matnr, werks, lgort) values('".$_Matnr."', '".$_Werks."', '".$_Lgort."')";

	$result = mysqli_query($con,$sql);

	echo 1;
} else{
	echo 0;
}

close_conection($con);

?>