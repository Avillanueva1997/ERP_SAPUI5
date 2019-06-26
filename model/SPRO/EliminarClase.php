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

$_bwart = $_data[$i]['bwart'];
$_spras = $_data[$i]['spras'];


$con = open_conection($_Ip,$_Usuario_servidor,$_Pass_servidor,$_Base_datos);

if ($_bwart != "" && $_spras != "") {

	$sql = "delete from t156 where bwart = '".$_bwart."' and spras = '".$_spras."'";

}

$result = mysqli_query($con,$sql);


}


close_conection($con);

echo $result;

?>