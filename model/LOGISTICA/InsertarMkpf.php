<?php

require '../DatosBD.php';

$_para = $_POST['para'];
$_data = $_POST['data'];
$_Ip = $_para[0]['_Ip'];
$_Usuario_servidor = $_para[0]['_Usuario_servidor'];
$_Pass_servidor = $_para[0]['_Pass_servidor'];
$_Base_datos = $_para[0]['_Base_datos'];
$_Tabla = $_para[0]['_Tabla'];

$_mblnr=$_data[0]['mblnr'];
$_mjahr=$_data[0]['mjahr'];
$_bldat=$_data[0]['bldat'];
$_budat=$_data[0]['budat'];
$_mtsnr=$_data[0]['mtsnr'];
$_bktxt=$_data[0]['bktxt'];
$_xblnr=$_data[0]['xblnr'];

$con = open_conection($_Ip,$_Usuario_servidor,$_Pass_servidor,$_Base_datos);

$sql = "INSERT INTO mkpf VALUES('".$_mblnr."',
							    '".$_mjahr."',
							    '".$_bldat."',
			                    '".$_budat."',
			                    '".$_mtsnr."',
			                    '".$_bktxt."',
			                    '".$_xblnr."')";	

$result = mysqli_query($con,$sql);

close_conection($con);

echo $result;

?>