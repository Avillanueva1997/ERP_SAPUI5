<?php

require '../DatosBD.php';

$_Ip = $_POST['_Ip'];
$_Usuario_servidor = $_POST['_Usuario_servidor'];
$_Pass_servidor = $_POST['_Pass_servidor'];
$_Base_datos = $_POST['_Base_datos'];

$_spras=$_POST['_spras'];
$_matkl=$_POST['_matkl'];
$_butxt=$_POST['_butxt'];

$con = open_conection($_Ip,$_Usuario_servidor,$_Pass_servidor,$_Base_datos);

$sql = "update t023
		set butxt='".$_butxt."'	
		where spras ='".$_spras."' and 
		      matkl ='".$_matkl."'";

$result = mysqli_query($con,$sql);

close_conection($con);

echo $result;

?>