<?php

require '../../DatosBD.php';

$_para = $_POST['para'];
$_data = $_POST['data'];
$_Ip = $_para[0]['_Ip'];
$_Usuario_servidor = $_para[0]['_Usuario_servidor'];
$_Pass_servidor = $_para[0]['_Pass_servidor'];
$_Base_datos = $_para[0]['_Base_datos'];
$_Tabla = $_para[0]['_Tabla'];

$_ebeln=$_data[0]['ebeln'];
$_bukrs=$_data[0]['bukrs'];
$_zterm=$_data[0]['zterm'];
$_waers=$_data[0]['waers'];
$_wkurs=$_data[0]['wkurs'];
$_kufix=$_data[0]['kufix'];
$_zbd1t=$_data[0]['zbd1t'];
$_zbd2t=$_data[0]['zbd2t'];
$_zbd3t=$_data[0]['zbd3t'];
$_adrnr=$_data[0]['adrnr'];
$_ekorg=$_data[0]['ekorg'];
$_ekgrp=$_data[0]['ekgrp'];
$_statu=$_data[0]['statu'];
$_erdat=$_data[0]['erdat'];
$_ernam=$_data[0]['ernam'];

$con = open_conection($_Ip,$_Usuario_servidor,$_Pass_servidor,$_Base_datos);

$sql = "update ekpo
		set bukrs ='".$_bukrs."',
			zterm ='".$_zterm."',
			waers ='".$_waers."',
			wkurs ='".$_wkurs."',
			kufix ='".$_kufix."',
			zbd1t ='".$_zbd1t."',
			zbd2t ='".$_zbd2t."',
			zbd3t ='".$_zbd3t."',
			adrnr ='".$_adrnr."',
			ekorg ='".$_ekorg."',
			ekgrp ='".$_ekgrp."',
			statu ='".$_statu."',
			erdat ='".$_erdat."',
			ernam ='".$_ernam."'
		where  ebeln ='".$_ebeln."'";

$result = mysqli_query($con,$sql);

close_conection($con);

echo $result;

?>