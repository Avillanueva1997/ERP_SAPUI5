<?php

require '../DatosBD.php';

$_Ip = $_POST['_Ip'];
$_Usuario_servidor = $_POST['_Usuario_servidor'];
$_Pass_servidor = $_POST['_Pass_servidor'];
$_Base_datos = $_POST['_Base_datos'];

$_mblnr = $_POST['_mblnr'];


$con = open_conection($_Ip,$_Usuario_servidor,$_Pass_servidor,$_Base_datos);

if ($_mblnr == "") {

	$sql = "select * from mkpf";
	
} else {

	$sql = "select * from mkpf where mblnr = '" . $_mblnr . "'";

}


$result = mysqli_query($con,$sql);

$mkpf = array();

while($row = mysqli_fetch_array($result)) 
{ 	    
    $mblnr=$row['mblnr'];
	$mjahr=$row['mjahr'];
	$bldat=$row['bldat'];
	$budat=$row['budat'];
	$mtsnr=$row['mtsnr'];
	$bktxt=$row['bktxt'];
	$xblnr=$row['xblnr'];

    $mkpf[] = array(
    						'mblnr'=>$mblnr,
							'mjahr'=>$mjahr,
							'bldat'=>$bldat,
							'budat'=>$budat,
							'mtsnr'=>$mtsnr,
							'bktxt'=>$bktxt,
							'xblnr'=>$xblnr
    					 );
}

close_conection($con);

$json_string = json_encode($mkpf);

echo $json_string;

?>