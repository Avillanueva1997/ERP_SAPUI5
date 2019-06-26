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

$sql = "INSERT INTO ekko VALUES('".$_ebeln."',
							    '".$_bukrs."',
							    '".$_zterm."',
							    '".$_waers."',
			                    '".$_wkurs."',
			                    '".$_kufix."',
			                    '".$_zbd1t."',
			                    '".$_zbd2t."',
			                    '".$_zbd3t."',
			                    '".$_adrnr."',
			                    '".$_ekorg."',
			                    '".$_ekgrp."',
			                    '".$_statu."',
			                    '".$_erdat."',
			                    '".$_ernam."')";	

$result = mysqli_query($con,$sql);

close_conection($con);

echo $result;

?>