<?php

require 'DatosBD.php';

$_Ip = $_POST['_Ip'];
$_Usuario_servidor = $_POST['_Usuario_servidor'];
$_Pass_servidor = $_POST['_Pass_servidor'];
$_Base_datos = $_POST['_Base_datos'];

$_Infnr = $_POST['_Infnr'];

$con = open_conection($_Ip,$_Usuario_servidor,$_Pass_servidor,$_Base_datos);

$sql = "select * from eine where infnr = '".$_Infnr."'";

$result = mysqli_query($con,$sql);

while($row = mysqli_fetch_array($result)) {
    echo $row['infnr'];
}

close_conection($con);

?>