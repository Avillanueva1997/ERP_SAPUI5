<?php

require 'DatosBD.php';

$_Ip = $_POST['_Ip'];
$_Usuario_servidor = $_POST['_Usuario_servidor'];
$_Pass_servidor = $_POST['_Pass_servidor'];
$_Base_datos = $_POST['_Base_datos'];

$_infnr = $_POST['_infnr'];
$_ekorg = $_POST['_ekorg'];
$_werks = $_POST['_werks'];

$con = open_conection($_Ip,$_Usuario_servidor,$_Pass_servidor,$_Base_datos);

$sql = "select * from eine where infnr = '" . $_infnr . "' and ekorg = '" . $_ekorg . "' and werks = '" . $_werks . "'";

$result = mysqli_query($con,$sql);

$registroinfo = array();

while($row = mysqli_fetch_array($result)) 
{ 	    
    $infnr=$row['infnr'];
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