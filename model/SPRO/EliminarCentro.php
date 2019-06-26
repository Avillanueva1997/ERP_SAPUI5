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

	$_bukrs = $_data[$i]['bukrs'];
	$_werks = $_data[$i]['werks']; 

	$con = open_conection($_Ip,$_Usuario_servidor,$_Pass_servidor,$_Base_datos);

	if ($_bukrs != "" && $_werks != "") {

		$sql = "delete from t001w where bukrs = '".$_bukrs."' and werks = '".$_werks."'";		

	}


	$result = mysqli_query($con,$sql);


}


close_conection($con);

echo $result;

?>