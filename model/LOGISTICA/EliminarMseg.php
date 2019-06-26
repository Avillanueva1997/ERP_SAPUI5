<?php

require '../DatosBD.php';


$_para = $_POST['para'];
$_data = $_POST['data'];
$_Ip = $_para[0]['_Ip'];
$_Usuario_servidor = $_para[0]['_Usuario_servidor'];
$_Pass_servidor = $_para[0]['_Pass_servidor'];
$_Base_datos = $_para[0]['_Base_datos'];

$tamañoData = sizeof($_data);

for ($i=0; $i < $tamañoData ; $i++) { 

$_mblnr = $_data[$i]['mblnr'];
$_mjahr = $_data[$i]['mjahr'];
$_zeile = $_data[$i]['zeile'];

$con = open_conection($_Ip,$_Usuario_servidor,$_Pass_servidor,$_Base_datos);

if ($_mblnr != "" && $_mjahr != "" && $_zeile != "") {

	$sql = "delete from mseg where mblnr = '".$_mblnr."' and mjahr = '".$_mjahr."' and zeile = '".$_zeile."'";

}

$result = mysqli_query($con,$sql);


}


close_conection($con);

echo $result;

?>