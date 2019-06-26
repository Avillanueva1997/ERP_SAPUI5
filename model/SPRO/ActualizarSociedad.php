<?php

require '../DatosBD.php';

$_Ip = $_POST['_Ip'];
$_Usuario_servidor = $_POST['_Usuario_servidor'];
$_Pass_servidor = $_POST['_Pass_servidor'];
$_Base_datos = $_POST['_Base_datos'];

$_bukrs=$_POST['_bukrs'];
$_butxt=$_POST['_butxt'];
$_spras=$_POST['_spras'];

$con = open_conection($_Ip,$_Usuario_servidor,$_Pass_servidor,$_Base_datos);

$sql = "update t001
		set butxt='".$_butxt."',
			spras='".$_spras."'	
		where bukrs ='".$_bukrs."'";

$result = mysqli_query($con,$sql);

close_conection($con);

echo $result;

?>