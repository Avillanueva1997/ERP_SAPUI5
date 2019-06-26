<?php

require '../DatosBD.php';

$_Ip = $_POST['_Ip'];
$_Usuario_servidor = $_POST['_Usuario_servidor'];
$_Pass_servidor = $_POST['_Pass_servidor'];
$_Base_datos = $_POST['_Base_datos'];

$_bukrs=$_POST['_bukrs'];
$_werks=$_POST['_werks'];
$_name1=$_POST['_name1'];
$_spras=$_POST['_spras'];
$_adrnr=$_POST['_adrnr'];

$con = open_conection($_Ip,$_Usuario_servidor,$_Pass_servidor,$_Base_datos);

$sql = "update t001w
		set name1='".$_name1."',
			spras='".$_spras."',
			adrnr='".$_adrnr."'	
		where bukrs ='".$_bukrs."' and 
			  werks ='".$_werks."'";

$result = mysqli_query($con,$sql);

close_conection($con);

echo $result;

?>