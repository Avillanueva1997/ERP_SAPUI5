<?php

require 'DatosBD.php';

$_Ip = $_POST['_Ip'];
$_Usuario_servidor = $_POST['_Usuario_servidor'];
$_Pass_servidor = $_POST['_Pass_servidor'];
$_Base_datos = $_POST['_Base_datos'];

$_matnr=$_POST['matnr'];
$_mtart=$_POST['mtart'];
$_matkl=$_POST['matkl'];
$_bismt=$_POST['bismt'];
$_meins=$_POST['meins'];
$_bstme=$_POST['bstme'];
$_groes=$_POST['groes'];
$_brgew=$_POST['brgew'];
$_ntgew=$_POST['ntgew'];
$_gewei=$_POST['gewei'];
$_volum=$_POST['volum'];
$_voleh=$_POST['voleh'];
$_raube=$_POST['raube'];
$_tempb=$_POST['tempb'];
$_ean11=$_POST['ean11'];
$_numtp=$_POST['numtp'];
$_vabme=$_POST['vabme'];
$_magrv=$_POST['magrv'];
$_mstde=$_POST['mstde'];
$_mhdrz=$_POST['mhdrz'];
$_mhdhb=$_POST['mhdhb'];
$_mhdlp=$_POST['mhdlp'];
$_kosch=$_POST['kosch'];
$_iprkz=$_POST['iprkz'];
$_rdmhd=$_POST['rdmhd'];

$_werks=$_POST['werks'];
$_mmsta=$_POST['mmsta'];
$_mmstd=$_POST['mmstd'];
$_ekgrp=$_POST['ekgrp'];
$_ausme=$_POST['ausme'];
$_maxlz=$_POST['maxlz'];
$_lzeih=$_POST['lzeih'];

$_aland=$_POST['aland'];
$_taxm1=$_POST['taxm1'];
$_taxm2=$_POST['taxm2'];
$_taxm3=$_POST['taxm3'];
$_taxm4=$_POST['taxm4'];
$_taxm5=$_POST['taxm5'];
$_taxm6=$_POST['taxm6'];
$_taxm7=$_POST['taxm7'];
$_taxm8=$_POST['taxm8'];
$_taxm9=$_POST['taxm9'];
$_taxim=$_POST['taxim'];

$con = open_conection($_Ip,$_Usuario_servidor,$_Pass_servidor,$_Base_datos);

$sql = "INSERT INTO mara VALUES (
								 	'".$_matnr."',
									'".$_mtart."',
									'".$_matkl."',
									'".$_bismt."',
									'".$_meins."',
									'".$_bstme."',
									'".$_groes."',
									'".$_brgew."',
									'".$_ntgew."',
									'".$_gewei."',
									'".$_volum."',
									'".$_voleh."',
									'".$_raube."',
									'".$_tempb."',
									'".$_ean11."',
									'".$_numtp."',
									'".$_vabme."',
									'".$_magrv."',
									'".$_mstde."',
									'".$_mhdrz."',
									'".$_mhdhb."',
									'".$_mhdlp."',
									'".$_kosch."',
									'".$_iprkz."',
									'".$_rdmhd."'
								)";

$result = mysqli_query($con,$sql);

$sql = "INSERT INTO marc VALUES (
								 	'".$_matnr."',
									'".$_werks."',
									'".$_mmsta."',
									'".$_mmstd."',
									'".$_ekgrp."',
									'".$_ausme."',
									'".$_maxlz."',
									'".$_lzeih."'
								)";

$result = mysqli_query($con,$sql);

$sql = "INSERT INTO mlan VALUES (
								 	'".$_matnr."',
									'".$_aland."',
									'".$_taxm1."',
									'".$_taxm2."',
									'".$_taxm3."',
									'".$_taxm4."',
									'".$_taxm5."',
									'".$_taxm6."',
									'".$_taxm7."',
									'".$_taxm8."',
									'".$_taxm9."',
									'".$_taxim."'
								)";

$result = mysqli_query($con,$sql);

close_conection($con);

echo $result;

?>