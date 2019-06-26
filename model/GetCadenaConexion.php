<?php

require_once('../security.php');
require 'DatosBD.php';

$_Empresa = $_POST['_Empresa'];

$sql = "select * from empresa where empresa = '" . $_Empresa . "'";
$con = open_conection($host, $user, $pass, $db);
$result = mysqli_query($con,$sql);
$cadena = array();

while($row = mysqli_fetch_array($result)) {
    $ip = $row['ip'];
    $usuario_servidor = $row['usuario_servidor'];
    $pass_servidor = $row['pass_servidor'];
    $base_datos = $row['base_datos'];
    $empresa = $row['empresa'];
    
    $cadena[] = array('ip' => $ip,'usuario_servidor'=>$usuario_servidor,'pass_servidor'=>$pass_servidor,'base_datos'=>$base_datos,'empresa'=>$empresa);
}
    
close_conection($con);

$json_string = json_encode($cadena);

echo $json_string;

?>