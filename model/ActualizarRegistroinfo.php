<?php

require 'DatosBD.php';

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
$_waers=$_POST['waers'];
$_minbm=$_POST['minbm'];
$_norbm=$_POST['norbm'];
$_aplfz=$_POST['aplfz'];
$_uebto=$_POST['uebto'];
$_untto=$_POST['untto'];
$_netpr=$_POST['netpr'];
$_peinh=$_POST['peinh'];
$_bprme=$_POST['bprme'];
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

$sql = "update eina
		set matnr='".$_matnr."',
			matkl='".$_matkl."',
			lifnr='".$_lifnr."',
			txz01='".$_txz01."',
			meins='".$_meins."',
			umrez='".$_umrez."',
			umren='".$_umren."',
			idnlf='".$_idnlf."',
			verkf='".$_verkf."',
			telf1='".$_telf1."',
			mahn1='".$_mahn1."',
			mahn2='".$_mahn2."',
			mahn3='".$_mahn3."',
			urznr='".$_urznr."',
			urzdt='".$_urzdt."',
			urzla='".$_urzla."',
			urztp='".$_urztp."',
			urzzt='".$_urzzt."',
			lmein='".$_lmein."',
			regio='".$_regio."',
			vabme='".$_vabme."',
			ltsnr='".$_ltsnr."',
			ltssf='".$_ltssf."',
			wglif='".$_wglif."',
			rueck='".$_rueck."',
			lifab='".$_lifab."',
			lifbi='".$_lifbi."',
			kolif='".$_kolif."',
			anzpu='".$_anzpu."',
			mfrnr='".$_mfrnr."'
		where infnr='".$_infnr."'";

$result = mysqli_query($con,$sql);

$sql = "update eine
		set ekgrp='".$_ekgrp."',		
			waers='".$_waers."',
			minbm='".$_minbm."',
			norbm='".$_norbm."',
			aplfz='".$_aplfz."',
			uebto='".$_uebto."',
			untto='".$_untto."',
			netpr='".$_netpr."',
			peinh='".$_peinh."',
			bprme='".$_bprme."',
			prdat='".$_prdat."',
			bpumz='".$_bpumz."',
			bpumn='".$_bpumn."',
			effpr='".$_effpr."',
			ekkol='".$_ekkol."',
			mwskz='".$_mwskz."',
			evers='".$_evers."',
			exprf='".$_exprf."',
			bstae='".$_bstae."',
			meprf='".$_meprf."',
			inco1='".$_inco1."',
			inco2='".$_inco2."',
			mhdrz='".$_mhdrz."',
			bstma='".$_bstma."',
			rdprf='".$_rdprf."',
			megru='".$_megru."'
where infnr='".$_infnr."' and
	  ekorg = '".$_ekorg."' and
	  esokz = '".$_esokz."' and
      werks = '".$_werks."'";

$result = mysqli_query($con,$sql);

close_conection($con);

echo $result;

?>