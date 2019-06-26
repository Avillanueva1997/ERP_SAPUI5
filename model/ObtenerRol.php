<?php

require_once('../security.php');
require 'DatosBD.php';

$_Empresa = $_POST['_Empresa'];
$_Usuario = $_POST['_Usuario'];
$_Password = $_POST['_Password'];

$con = open_conection($host, $user, $pass, $db);

$sql = "select * from login where empresa = '" . $_Empresa . "' and usuario = '" . $_Usuario . "' and contrasena = '" . $_Password . "'";

$result = mysqli_query($con,$sql);

$row = mysqli_fetch_array($result, MYSQLI_BOTH);

$rol = $row['rol'];

close_conection($con);

//$json_string = json_encode($rol);

echo $rol;

?>