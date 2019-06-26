<?php

require '../DatosBD.php';

$_para = $_POST['para'];
$_data = $_POST['data'][0];
$_Ip = $_para[0]['_Ip'];
$_Usuario_servidor = $_para[0]['_Usuario_servidor'];
$_Pass_servidor = $_para[0]['_Pass_servidor'];
$_Base_datos = $_para[0]['_Base_datos'];

$_mblnr=$_para[0]['_mblnr'];
$_mjahr=$_para[0]['_mjahr'];
$_zeile=$_para[0]['_zeile'];
$_matnr=$_data[0]['matnr'];
$_maktx=$_data[0]['maktx'];
$_menge=$_data[0]['menge'];
$_meins=$_data[0]['meins'];
$_lgort=$_data[0]['lgort'];
$_kostl=$_data[0]['kostl'];
$_sakto=$_data[0]['sakto'];
$_charg=$_data[0]['charg'];
$_bwtar=$_data[0]['bwtar'];
$_bwart=$_data[0]['bwart'];
$_shkzg=$_data[0]['shkzg'];
$_insmk=$_data[0]['insmk'];
$_kunnr=$_data[0]['kunnr'];
$_lifnr=$_data[0]['lifnr'];
$_werks=$_data[0]['werks'];
$_umwrk=$_data[0]['umwrk'];
$_umlgo=$_data[0]['umlgo'];

$con = open_conection($_Ip,$_Usuario_servidor,$_Pass_servidor,$_Base_datos);

$sql = "update mseg
		set matnr='".$_matnr."',
			maktx='".$_maktx."',
			menge='".$_menge."',
			meins='".$_meins."',
			lgort='".$_lgort."',
			kostl='".$_kostl."',
			sakto='".$_sakto."',
			charg='".$_charg."',
			bwtar='".$_bwtar."',
			bwart='".$_bwart."',
			shkzg='".$_shkzg."',
			insmk='".$_insmk."',
			kunnr='".$_kunnr."',
			lifnr='".$_lifnr."',
			werks='".$_werks."',
			umwrk='".$_umwrk."',
			umlgo='".$_umlgo."'	
		where mblnr ='".$_mblnr."' and
			  mjahr ='".$_mjahr."' and
			  zeile ='".$_zeile."'";

$result = mysqli_query($con,$sql);

close_conection($con);

echo $result;

?>