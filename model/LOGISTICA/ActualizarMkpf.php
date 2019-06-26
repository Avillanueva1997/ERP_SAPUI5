<?php

require '../DatosBD.php';

$_para = $_POST['para'];
$_data = $_POST['data'];
$_Ip = $_para[0]['_Ip'];
$_Usuario_servidor = $_para[0]['_Usuario_servidor'];
$_Pass_servidor = $_para[0]['_Pass_servidor'];
$_Base_datos = $_para[0]['_Base_datos'];
$_Tabla = $_para[0]['_Tabla'];

$_mblnr=$_para[0]['_mblnr'];
$_mjahr=$_para[0]['_mjahr'];
$_bldat=$_data[0]['bldat'];
$_budat=$_data[0]['budat'];
$_mtsnr=$_data[0]['mtsnr'];
$_bktxt=$_data[0]['bktxt'];
$_xblnr=$_data[0]['xblnr'];

$con = open_conection($_Ip,$_Usuario_servidor,$_Pass_servidor,$_Base_datos);

$sql = "update mkpf
		set bldat = DATE(STR_TO_DATE('".$_bldat."', '%d/%m/%Y')),
			budat = DATE(STR_TO_DATE('".$_budat."', '%d/%m/%Y')),
			mtsnr='".$_mtsnr."',
			bktxt='".$_bktxt."',
			xblnr='".$_xblnr."'
		where mblnr ='".$_mblnr."' and 
			  mjahr ='".$_mjahr."'";

$result = mysqli_query($con,$sql);

close_conection($con);

echo $result;

?>