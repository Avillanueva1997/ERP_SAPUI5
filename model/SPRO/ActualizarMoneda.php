<?php

require '../DatosBD.php';

$_Ip = $_POST['_Ip'];
$_Usuario_servidor = $_POST['_Usuario_servidor'];
$_Pass_servidor = $_POST['_Pass_servidor'];
$_Base_datos = $_POST['_Base_datos'];

$_spras=$_POST['_spras'];
$_waers=$_POST['_waers'];
$_ktext=$_POST['_ktext'];

$con = open_conection($_Ip,$_Usuario_servidor,$_Pass_servidor,$_Base_datos);

$sql = "update tcurc
		set ktext='".$_ktext."'	
		where spras ='".$_spras."' and 
			  waers ='".$_waers."'";

$result = mysqli_query($con,$sql);

close_conection($con);

echo $result;

?>