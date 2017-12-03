<?php

require 'DatosBD.php';

$_Ip = $_POST['_Ip'];
$_Usuario_servidor = $_POST['_Usuario_servidor'];
$_Pass_servidor = $_POST['_Pass_servidor'];
$_Base_datos = $_POST['_Base_datos'];

$_Lifnr = $_POST['_Lifnr'];
$_Ekorg = $_POST['_Ekorg'];

$con = open_conection($_Ip,$_Usuario_servidor,$_Pass_servidor,$_Base_datos);

$sql = "select * from lfm1 where lifnr = '".$_Lifnr."' and ekorg = '".$_Ekorg."'";

$result = mysqli_query($con,$sql);

while($row = mysqli_fetch_array($result)) {
    echo $row['lifnr'];
}

close_conection($con);

?>