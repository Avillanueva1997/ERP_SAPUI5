<?php

require 'DatosBD.php';
require 'Correlativo.php';

$_Ip = $_POST['_Ip'];
$_Usuario_servidor = $_POST['_Usuario_servidor'];
$_Pass_servidor = $_POST['_Pass_servidor'];
$_Base_datos = $_POST['_Base_datos'];

$_infnr=$_POST['infnr'];
$_matnr=$_POST['matnr'];
$_matkl=$_POST['matkl'];
$_lifnr=$_POST['lifnr'];
$_txz01=$_POST['txz01'];
$_meins=$_POST['meins'];
$_umrez=$_POST['umrez'];
$_umren=$_POST['umren'];
$_idnlf=$_POST['idnlf'];
$_verkf=$_POST['verkf'];
$_telf1=$_POST['telf1'];
$_mahn1=$_POST['mahn1'];
$_mahn2=$_POST['mahn2'];
$_mahn3=$_POST['mahn3'];
$_urznr=$_POST['urznr'];
$_urzdt=$_POST['urzdt'];
$_urzla=$_POST['urzla'];
$_urztp=$_POST['urztp'];
$_urzzt=$_POST['urzzt'];
$_lmein=$_POST['lmein'];
$_regio=$_POST['regio'];
$_vabme=$_POST['vabme'];
$_ltsnr=$_POST['ltsnr'];
$_ltssf=$_POST['ltssf'];
$_wglif=$_POST['wglif'];
$_rueck=$_POST['rueck'];
$_lifab=$_POST['lifab'];
$_lifbi=$_POST['lifbi'];
$_kolif=$_POST['kolif'];
$_anzpu=$_POST['anzpu'];
$_mfrnr=$_POST['mfrnr'];

$_ekorg=$_POST['ekorg'];
$_esokz=$_POST['esokz'];
$_werks=$_POST['werks'];
$_ekgrp=$_POST['ekgrp'];
$_minbm=$_POST['minbm'];
$_norbm=$_POST['norbm'];
$_aplfz=$_POST['aplfz'];
$_uebto=$_POST['uebto'];
$_untto=$_POST['untto'];
$_prdat=$_POST['prdat'];
$_bpumz=$_POST['bpumz'];
$_bpumn=$_POST['bpumn'];
$_effpr=$_POST['effpr'];
$_ekkol=$_POST['ekkol'];
$_mwskz=$_POST['mwskz'];
$_evers=$_POST['evers'];
$_exprf=$_POST['exprf'];
$_bstae=$_POST['bstae'];
$_meprf=$_POST['meprf'];
$_inco1=$_POST['inco1'];
$_inco2=$_POST['inco2'];
$_mhdrz=$_POST['mhdrz'];
$_bstma=$_POST['bstma'];
$_rdprf=$_POST['rdprf'];
$_megru=$_POST['megru'];


$con = open_conection($_Ip,$_Usuario_servidor,$_Pass_servidor,$_Base_datos);

$_infnr = nro_registroinfo($con);

$sql = "INSERT INTO eina VALUES (
								 	'".$_infnr."',
									'".$_matnr."',
									'".$_matkl."',
									'".$_lifnr."',
									'".$_txz01."',
									'".$_meins."',
									'".$_umrez."',
									'".$_umren."',
									'".$_idnlf."',
									'".$_verkf."',
									'".$_telf1."',
									'".$_mahn1."',
									'".$_mahn2."',
									'".$_mahn3."',
									'".$_urznr."',
									'".$_urzdt."',
									'".$_urzla."',
									'".$_urztp."',
									'".$_urzzt."',
									'".$_lmein."',
									'".$_regio."',
									'".$_vabme."',
									'".$_ltsnr."',
									'".$_ltssf."',
									'".$_wglif."',
									'".$_rueck."',
									'".$_lifab."',
									'".$_lifbi."',
									'".$_kolif."',
									'".$_anzpu."',
									'".$_mfrnr."'
								)";

$result = mysqli_query($con,$sql);

$sql = "INSERT INTO eine VALUES (
								 	'".$_infnr."',
									'".$_ekorg."',
									'".$_esokz."',
									'".$_werks."',
									'".$_ekgrp."',
									'".$_minbm."',
									'".$_norbm."',
									'".$_aplfz."',
									'".$_uebto."',
									'".$_untto."',
									'".$_prdat."',
									'".$_bpumz."',
									'".$_bpumn."',
									'".$_effpr."',
									'".$_ekkol."',
									'".$_mwskz."',
									'".$_evers."',
									'".$_exprf."',
									'".$_bstae."',
									'".$_meprf."',
									'".$_inco1."',
									'".$_inco2."',
									'".$_mhdrz."',
									'".$_bstma."',
									'".$_rdprf."',
									'".$_megru."'
								)";

$result = mysqli_query($con,$sql);

close_conection($con);

echo $_infnr;

function nro_registroinfo($con){
    $sql = "select max(infnr) as infnr from eina";
    $result = mysqli_query($con,$sql);

    while($row = mysqli_fetch_array($result)) 
	{ 	    
    	$infnr=$row['infnr'];
	}

	if ($infnr == " ") {
		return '1000000000';
	}else{		
		return siguiente_correlativo($infnr);
	}
}

?>