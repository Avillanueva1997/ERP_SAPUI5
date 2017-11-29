<?php

require 'DatosBD.php';

$_Ip = $_POST['_Ip'];
$_Usuario_servidor = $_POST['_Usuario_servidor'];
$_Pass_servidor = $_POST['_Pass_servidor'];
$_Base_datos = $_POST['_Base_datos'];

$_infnr = $_POST['_infnr'];
$_lifnr = $_POST['_lifnr'];
$_matnr = $_POST['_matnr'];

$con = open_conection($_Ip,$_Usuario_servidor,$_Pass_servidor,$_Base_datos);

$sql = "select * from eina where infnr = '" . $_infnr . "' and matnr = '" . $_matnr . "' and lifnr = '" . $_lifnr . "'";

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
							'mfrnr'=>$mfrnr
    					 );
}

close_conection($con);

$json_string = json_encode($registroinfo);

echo $json_string;

?>