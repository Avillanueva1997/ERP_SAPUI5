<?php

require 'DatosBD.php';

$_Ip = $_POST['_Ip'];
$_Usuario_servidor = $_POST['_Usuario_servidor'];
$_Pass_servidor = $_POST['_Pass_servidor'];
$_Base_datos = $_POST['_Base_datos'];

$_lifnr=$_POST['lifnr'];
$_brsch=$_POST['brsch'];
$_kunnr=$_POST['kunnr'];
$_lnrza=$_POST['lnrza'];
$_stcd1=$_POST['stcd1'];
$_stcd2=$_POST['stcd2'];
$_vbund=$_POST['vbund'];
$_fiskn=$_POST['fiskn'];
$_lzone=$_POST['lzone'];
$_fityp=$_POST['fityp'];
$_stcdt=$_POST['stcdt'];
$_j_1kfrepre=$_POST['j_1kfrepre'];
$_ftbus=$_POST['ftbus'];
$_ftind=$_POST['ftind'];

$_ekorg=$_POST['ekorg'];
$_waers=$_POST['waers'];
$_verkf=$_POST['verkf'];
$_telf1=$_POST['telf1'];
$_minbw=$_POST['minbw'];
$_zterm=$_POST['zterm'];
$_inco1=$_POST['inco1'];
$_inco2=$_POST['inco2'];
$_kalsk=$_POST['kalsk'];
$_expvz=$_POST['expvz'];
$_zolla=$_POST['zolla'];
$_meprf=$_POST['meprf'];
$_ekgrp=$_POST['ekgrp'];
$_plifz=$_POST['plifz'];
$_skrit=$_POST['skrit'];
$_bstae=$_POST['bstae'];
$_rdprf=$_POST['rdprf'];
$_vensl=$_POST['vensl'];

$con = open_conection($_Ip,$_Usuario_servidor,$_Pass_servidor,$_Base_datos);

$sql = "INSERT INTO lfa1 VALUES (
								 	'".$_lifnr."',
									'".$_brsch."',
									'".$_kunnr."',
									'".$_lnrza."',
									'".$_stcd1."',
									'".$_stcd2."',
									'".$_vbund."',
									'".$_fiskn."',
									'".$_lzone."',
									'".$_fityp."',
									'".$_stcdt."',
									'".$_j_1kfrepre."',
									'".$_ftbus."',
									'".$_ftind."'
								)";

$result = mysqli_query($con,$sql);

$sql = "INSERT INTO lfm1 VALUES (
								 	'".$_lifnr."',
									'".$_ekorg."',
									'".$_waers."',
									'".$_verkf."',
									'".$_telf1."',
									'".$_minbw."',
									'".$_zterm."',
									'".$_inco1."',
									'".$_inco2."',
									'".$_kalsk."',
									'".$_expvz."',
									'".$_zolla."',
									'".$_meprf."',
									'".$_ekgrp."',
									'".$_plifz."',
									'".$_skrit."',
									'".$_bstae."',
									'".$_rdprf."',
									'".$_vensl."'
								)";

$result = mysqli_query($con,$sql);

close_conection($con);

echo $result;

?>