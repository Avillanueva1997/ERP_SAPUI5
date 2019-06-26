<?php

require '../DatosBD.php';
require '../Correlativo.php';

$_Ip = $_POST['_Ip'];
$_Usuario_servidor = $_POST['_Usuario_servidor'];
$_Pass_servidor = $_POST['_Pass_servidor'];
$_Base_datos = $_POST['_Base_datos'];

$_mblnr = $_POST['_mblnr'];
$_mjahr = $_POST['_mjahr'];
$_matnr = "";
$_maktx = "";
$_menge = "";
$_meins = "";
$_lgort = "";
$_kostl = "";
$_sakto = "";
$_charg = "";
$_bwtar = "";
$_bwart = $_POST['_bwart'];
$_shkzg = "";
$_insmk = "";
$_kunnr = "";
$_lifnr = "";
$_werks = "";
$_umwrk = "";
$_umlgo = "";


$_bldat= "";
$_budat= "";
$_mtsnr= "";
$_bktxt= "";
$_xblnr= "";


$con = open_conection($_Ip,$_Usuario_servidor,$_Pass_servidor,$_Base_datos);

$_zeile= zeile_migo($con, $_mblnr, $_mjahr);

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
									'".$_werks."',
									'".$_umwrk."',
									'".$_umlgo."'

								)";

$result = mysqli_query($con,$sql);

$sql = "INSERT INTO mkpf VALUES (
								 	'".$_mblnr."',
									'".$_mjahr."',
									'".$_bldat."',
									'".$_budat."',
									'".$_mtsnr."',
									'".$_bktxt."',
									'".$_xblnr."'

								)";

$result = mysqli_query($con,$sql);

close_conection($con);

$codigo = array(
				'zeile'=>$_zeile
			);

echo json_encode($codigo);

function zeile_migo($con, $_mblnr, $_mjahr){

    $sql = "select max(zeile) as zeile from mseg where mblnr = '".$_mblnr."' and mjahr = '".$_mjahr."'";


    $result = mysqli_query($con,$sql);

    while($row = mysqli_fetch_array($result)) 
	{ 	    
    	$zeile=$row['zeile'];
	}

	if ($zeile == "") {
		return '0001';
	}else{		
		return siguiente_correlativo($zeile);
	}
}

?>