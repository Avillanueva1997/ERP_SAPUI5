<?php

require_once('../security.php');
require 'DatosBD.php';

$_Empresa = $_POST['_Empresa'];
$_Usuario = $_POST['_Usuario'];
$_Password = $_POST['_Password'];

$sql = "select * from login where empresa = '" . $_Empresa . "' and usuario = '" . $_Usuario . "' and contrasena = '" . $_Password . "'";
$con = open_conection($host, $user, $pass, $db);
$result = mysqli_query($con,$sql);
    
close_conection($con);

echo $result->num_rows;

?>