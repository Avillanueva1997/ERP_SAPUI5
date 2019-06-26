<?php

require '../DatosBD.php';

$_Ip = $_POST['_Ip'];
$_Usuario_servidor = $_POST['_Usuario_servidor'];
$_Pass_servidor = $_POST['_Pass_servidor'];
$_Base_datos = $_POST['_Base_datos'];

$_spras=$_POST['_spras'];
$_sptxt=$_POST['_sptxt'];

$con = open_conection($_Ip,$_Usuario_servidor,$_Pass_servidor,$_Base_datos);

$sql = "update t002
		set sptxt='".$_sptxt."'	
		where spras ='".$_spras."'";

$result = mysqli_query($con,$sql);

close_conection($con);

echo $result;

?>