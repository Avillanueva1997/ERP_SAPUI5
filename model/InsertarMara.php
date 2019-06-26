<?php

require 'DatosBD.php';
require 'Correlativo.php';

$_Ip = $_POST['_Ip'];
$_Usuario_servidor = $_POST['_Usuario_servidor'];
$_Pass_servidor = $_POST['_Pass_servidor'];
$_Base_datos = $_POST['_Base_datos'];
$_mtart = $_POST['_mtart'];

$_matnr=$_POST['matnr'];
$_matkl=$_POST['matkl'];
$_bismt=$_POST['bismt'];
$_meins=$_POST['meins'];
$_bstme=$_POST['bstme'];
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
$_mhdrz=$_POST['mhdrz'];
$_mhdhb=$_POST['mhdhb'];
$_mhdlp=$_POST['mhdlp'];
$_kosch=$_POST['kosch'];
$_iprkz=$_POST['iprkz'];
$_rdmhd=$_POST['rdmhd'];
$_maktg=$_POST['maktg'];


$con = open_conection($_Ip,$_Usuario_servidor,$_Pass_servidor,$_Base_datos);

$_matnr = nro_material($con);

$sql = "INSERT INTO mara VALUES (
								 	'".$_matnr."',
									'".$_mtart."',
									'".$_matkl."',
									'".$_bismt."',
									'".$_meins."',
									'".$_bstme."',
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
									'".$_mhdrz."',
									'".$_mhdhb."',
									'".$_mhdlp."',
									'".$_kosch."',
									'".$_iprkz."',
									'".$_rdmhd."',
									'".$_maktg."'
								)";

$result = mysqli_query($con,$sql);


close_conection($con);

echo $_matnr;

function nro_material($con){
    $sql = "select max(matnr) as matnr from mara";
    $result = mysqli_query($con,$sql);

    while($row = mysqli_fetch_array($result)) 
	{ 	    
    	$matnr=$row['matnr'];
	}

	if ($matnr == " ") {
		return '1000000000';
	}else{		
		return siguiente_correlativo($matnr);
	}
}


?>