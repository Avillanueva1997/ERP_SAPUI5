<?php

require 'DatosBD.php';

$_Ip = $_POST['_Ip'];
$_Usuario_servidor = $_POST['_Usuario_servidor'];
$_Pass_servidor = $_POST['_Pass_servidor'];
$_Base_datos = $_POST['_Base_datos'];

$_infnr = $_POST['_infnr'];
$_ekorg = $_POST['_ekorg'];
$_esokz = $_POST['_esokz'];
$_werks = $_POST['_werks'];

$con = open_conection($_Ip,$_Usuario_servidor,$_Pass_servidor,$_Base_datos);

$sql = "select * from eina
			inner join eine on eina.infnr = eine.infnr
			where eina.infnr = '".$_infnr."' and
				  eine.ekorg = '".$_ekorg."' and
				  eine.esokz = '".$_esokz."' and
				  eine.werks = '".$_werks."'";

$result = mysqli_query($con,$sql);

$registroinfo = array();

while($row = mysqli_fetch_array($result)) 
{ 	    
    $infnr=$row['infnr'];
	$matnr=$row['matnr'];
	$matkl=$row['matkl'];
	$lifnr=$row['lifnr'];
	$txz01=$row['txz01'];
	$meins=$row['meins'];
	$umrez=$row['umrez'];
	$umren=$row['umren'];
	$idnlf=$row['idnlf'];
	$verkf=$row['verkf'];
	$telf1=$row['telf1'];
	$mahn1=$row['mahn1'];
	$mahn2=$row['mahn2'];
	$mahn3=$row['mahn3'];
	$urznr=$row['urznr'];
	$urzdt=$row['urzdt'];
	$urzla=$row['urzla'];
	$urztp=$row['urztp'];
	$urzzt=$row['urzzt'];
	$lmein=$row['lmein'];
	$regio=$row['regio'];
	$vabme=$row['vabme'];
	$ltsnr=$row['ltsnr'];
	$ltssf=$row['ltssf'];
	$wglif=$row['wglif'];
	$rueck=$row['rueck'];
	$lifab=$row['lifab'];
	$lifbi=$row['lifbi'];
	$kolif=$row['kolif'];
	$anzpu=$row['anzpu'];
	$mfrnr=$row['mfrnr'];

	$ekorg=$row['ekorg'];
	$esokz=$row['esokz'];
	$werks=$row['werks'];
	$ekgrp=$row['ekgrp'];
	$waers=$row['waers'];
	$minbm=$row['minbm'];
	$norbm=$row['norbm'];
	$aplfz=$row['aplfz'];
	$uebto=$row['uebto'];
	$untto=$row['untto'];
	$netpr=$row['netpr'];
	$peinh=$row['peinh'];
	$bprme=$row['bprme'];
	$prdat=$row['prdat'];
	$bpumz=$row['bpumz'];
	$bpumn=$row['bpumn'];
	$effpr=$row['effpr'];
	$ekkol=$row['ekkol'];
	$mwskz=$row['mwskz'];
	$evers=$row['evers'];
	$exprf=$row['exprf'];
	$bstae=$row['bstae'];
	$meprf=$row['meprf'];
	$inco1=$row['inco1'];
	$inco2=$row['inco2'];
	$mhdrz=$row['mhdrz'];
	$bstma=$row['bstma'];
	$rdprf=$row['rdprf'];
	$megru=$row['megru'];
 

    $registroinfo[] = array(
    						'infnr'=>$infnr,
							'matnr'=>$matnr,
							'matkl'=>$matkl,
							'lifnr'=>$lifnr,
							'txz01'=>$txz01,
							'meins'=>$meins,
							'umrez'=>$umrez,
							'umren'=>$umren,
							'idnlf'=>$idnlf,
							'verkf'=>$verkf,
							'telf1'=>$telf1,
							'mahn1'=>$mahn1,
							'mahn2'=>$mahn2,
							'mahn3'=>$mahn3,
							'urznr'=>$urznr,
							'urzdt'=>$urzdt,
							'urzla'=>$urzla,
							'urztp'=>$urztp,
							'urzzt'=>$urzzt,
							'lmein'=>$lmein,
							'regio'=>$regio,
							'vabme'=>$vabme,
							'ltsnr'=>$ltsnr,
							'ltssf'=>$ltssf,
							'wglif'=>$wglif,
							'rueck'=>$rueck,
							'lifab'=>$lifab,
							'lifbi'=>$lifbi,
							'kolif'=>$kolif,
							'anzpu'=>$anzpu,
							'mfrnr'=>$mfrnr,

							'ekorg'=>$ekorg,
							'esokz'=>$esokz,
							'werks'=>$werks,
							'ekgrp'=>$ekgrp,
							'waers'=>$waers,
							'minbm'=>$minbm,
							'norbm'=>$norbm,
							'aplfz'=>$aplfz,
							'uebto'=>$uebto,
							'untto'=>$untto,
							'netpr'=>$netpr,
							'peinh'=>$peinh,
							'bprme'=>$bprme,
							'prdat'=>$prdat,
							'bpumz'=>$bpumz,
							'bpumn'=>$bpumn,
							'effpr'=>$effpr,
							'ekkol'=>$ekkol,
							'mwskz'=>$mwskz,
							'evers'=>$evers,
							'exprf'=>$exprf,
							'bstae'=>$bstae,
							'meprf'=>$meprf,
							'inco1'=>$inco1,
							'inco2'=>$inco2,
							'mhdrz'=>$mhdrz,
							'bstma'=>$bstma,
							'rdprf'=>$rdprf,
							'megru'=>$megru
    					 );
}

close_conection($con);

$json_string = json_encode($registroinfo);

echo $json_string;

?>