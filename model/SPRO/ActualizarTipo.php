<?php

require '../DatosBD.php';

$_Ip = $_POST['_Ip'];
$_Usuario_servidor = $_POST['_Usuario_servidor'];
$_Pass_servidor = $_POST['_Pass_servidor'];
$_Base_datos = $_POST['_Base_datos'];

$_spras=$_POST['_spras'];
$_mtart=$_POST['_mtart'];
$_mtbez=$_POST['_mtbez'];

$con = open_conection($_Ip,$_Usuario_servidor,$_Pass_servidor,$_Base_datos);

$sql = "update t134
		set mtbez='".$_mtbez."'	
		where spras ='".$_spras."' and 
		      mtart ='".$_mtart."'";

$result = mysqli_query($con,$sql);

close_conection($con);

echo $result;

?>