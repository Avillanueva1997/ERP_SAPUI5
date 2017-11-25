<?php

require 'DatosBD.php';

$con = open_conection();

$_Nombre = $_POST['_Nombre'];
$_Apellido = $_POST['_Apellido'];
$_Correo = $_POST['_Correo'];
$_Celular = $_POST['_Celular'];
$_Contrasena = $_POST['_Contrasena'];

//$sql = "select * from usuario where usuario = 'FFARRO'";
//$sql = "CALL usuario('MPF','FFARRO'," . $_Nombre . "','" . $_Apellido . "','" . $_Correo . "','" . $_Celular . "',' ',' ')";
$sql = "insert into usuario (empresa,usuario,nombre,apellido,correo,celular,estado,log) values ('MPF','FFARRO','" . $_Nombre . "','". $_Apellido ."','" . $_Correo . "','" . $_Celular . "',' ',' ')";
$result = mysqli_query($con,$sql);
    
/*while($row = mysqli_fetch_array($result)) {
    echo $row['empresa'];
}*/

close_conection($con)

echo $result;

?>