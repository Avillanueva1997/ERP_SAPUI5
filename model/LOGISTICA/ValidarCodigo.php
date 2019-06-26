<?php

require '../DatosBD.php';

$_Ip = $_POST['_Ip'];
$_Usuario_servidor = $_POST['_Usuario_servidor'];
$_Pass_servidor = $_POST['_Pass_servidor'];
$_Base_datos = $_POST['_Base_datos'];

$_mblnr = $_POST['_mblnr'];


$con = open_conection($_Ip,$_Usuario_servidor,$_Pass_servidor,$_Base_datos);


$sql = "select * from mkpf where mblnr = '".$_mblnr."'";

$result = mysqli_query($con,$sql);

while($row = mysqli_fetch_array($result)) {
    echo $row['mblnr'];
}

close_conection($con);

?>