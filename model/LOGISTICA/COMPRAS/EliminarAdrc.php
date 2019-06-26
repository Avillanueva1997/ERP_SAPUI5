<?php

require '../../DatosBD.php';

$_Ip = $_POST['_Ip'];
$_Usuario_servidor = $_POST['_Usuario_servidor'];
$_Pass_servidor = $_POST['_Pass_servidor'];
$_Base_datos = $_POST['_Base_datos'];

$_addrnumber = $_POST['_addrnumber'];

$con = open_conection($_Ip,$_Usuario_servidor,$_Pass_servidor,$_Base_datos);

$sql = "delete from adrc where addrnumber = '".$_addrnumber."'";

$result = mysqli_query($con,$sql);

close_conection($con);

echo $result;

?>