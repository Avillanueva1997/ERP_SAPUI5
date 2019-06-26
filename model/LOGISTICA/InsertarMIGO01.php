<?php

require '../DatosBD.php';
require '../Correlativo.php';

$_Ip = $_POST['_Ip'];
$_Usuario_servidor = $_POST['_Usuario_servidor'];
$_Pass_servidor = $_POST['_Pass_servidor'];
$_Base_datos = $_POST['_Base_datos'];

$_mblnr=$_POST['mblnr'];
$_mjahr= date("Y");
$_zeile= "";
$_matnr= "";
$_maktx= "";
$_menge= "";
$_meins= "";
$_lgort= "";
$_kostl= "";
$_sakto= "";
$_charg= "";
$_bwtar= "";
$_bwart= "";
$_shkzg= "";
$_insmk= "";
$_kunnr= "";
$_lifnr= "";
$_werks= "";

$_bldat=$_POST['bldat'];
$_budat=$_POST['budat'];
$_mtsnr=$_POST['mtsnr'];
$_bktxt=$_POST['bktxt'];


//$bldat=date_format($_bldat, 'Y-m-d');
//$budat=date_format($_budat, 'Y-m-d');

$con = open_conection($_Ip,$_Usuario_servidor,$_Pass_servidor,$_Base_datos);

$_mblnr= mblnr_migo($con);

$_zeile= zeile_migo($con, $_mblnr);

$sql = "INSERT INTO mseg VALUES (
								 	'".$_mblnr."',
									'".$_mjahr."',
									'".$_zeile."',
									'".$_matnr."',
									'".$_maktx."',
									'".$_menge."',
									'".$_meins."',
									'".$_lgort."',
									'".$_kostl."',
									'".$_sakto."',
									'".$_charg."',
									'".$_bwtar."',
									'".$_bwart."',
									'".$_shkzg."',
									'".$_insmk."',
									'".$_kunnr."',
									'".$_lifnr."',
									'".$_werks."'
								)";

$result = mysqli_query($con,$sql);

$sql = "INSERT INTO mkpf VALUES (
								 	'".$_mblnr."',
									'".$_mjahr."',
									'".$_bldat."',
									'".$_budat."',
									'".$_mtsnr."',
									'".$_bktxt."'
								)";

$result = mysqli_query($con,$sql);

close_conection($con);

$codigos = array(
				'mblnr'=>$_mblnr,
				'zeile'=>$_zeile
			);

echo json_encode($codigos);

function mblnr_migo($con){
    $sql = "select max(mblnr) as mblnr from mkpf";
    $result = mysqli_query($con,$sql);

    while($row = mysqli_fetch_array($result)) 
	{ 	    
    	$mblnr=$row['mblnr'];
	}

	if ($mblnr == "") {
		return '1000000000';
	}else{		
		return siguiente_correlativo($mblnr);
	}
}


function zeile_migo($con, $_mblnr){
    $sql = "select max(zeile) as zeile from mseg where mblnr = '".$_mblnr."'";
    $result = mysqli_query($con,$sql);

    while($row = mysqli_fetch_array($result)) 
	{ 	    
    	$zeile=$row['zeile'];
	}

	if ($zeile == "") {
		return '0000';
	}else{		
		return siguiente_correlativo($zeile);
	}
}

?>