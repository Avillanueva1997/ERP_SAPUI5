<?php

require 'DatosBD.php';

$_Ip = $_POST['_Ip'];
$_Usuario_servidor = $_POST['_Usuario_servidor'];
$_Pass_servidor = $_POST['_Pass_servidor'];
$_Base_datos = $_POST['_Base_datos'];

$_lifnr = $_POST['_lifnr'];
$_ekorg = $_POST['_ekorg'];

$con = open_conection($_Ip,$_Usuario_servidor,$_Pass_servidor,$_Base_datos);

$sql = "select * from lfa1
			inner join lfm1 on lfa1.lifnr = lfm1.lifnr
			where lfa1.lifnr = '".$_lifnr."' and
			      lfm1.ekorg = '".$_ekorg."'";

$result = mysqli_query($con,$sql);

$proveedor = array();

while($row = mysqli_fetch_array($result)) 
{ 	    
    $lifnr=$row['lifnr'];
	$brsch=$row['brsch'];
	$kunnr=$row['kunnr'];
	$lnrza=$row['lnrza'];
	$stcd1=$row['stcd1'];
	$stcd2=$row['stcd2'];
	$vbund=$row['vbund'];
	$fiskn=$row['fiskn'];
	$lzone=$row['lzone'];
	$fityp=$row['fityp'];
	$stcdt=$row['stcdt'];
	$j_1kfrepre=$row['j_1kfrepre'];
	$ftbus=$row['ftbus'];
	$ftind=$row['ftind'];

	$ekorg=$row['ekorg'];
	$waers=$row['waers'];
	$verkf=$row['verkf'];
	$telf1=$row['telf1'];
	$minbw=$row['minbw'];
	$zterm=$row['zterm'];
	$inco1=$row['inco1'];
	$inco2=$row['inco2'];
	$kalsk=$row['kalsk'];
	$expvz=$row['expvz'];
	$zolla=$row['zolla'];
	$meprf=$row['meprf'];
	$ekgrp=$row['ekgrp'];
	$plifz=$row['plifz'];
	$skrit=$row['skrit'];
	$bstae=$row['bstae'];
	$rdprf=$row['rdprf'];
	$vensl=$row['vensl']; 
 
    $proveedor[] = array(
    						'lifnr'=>$lifnr,
							'brsch'=>$brsch,
							'kunnr'=>$kunnr,
							'lnrza'=>$lnrza,
							'stcd1'=>$stcd1,
							'stcd2'=>$stcd2,
							'vbund'=>$vbund,
							'fiskn'=>$fiskn,
							'lzone'=>$lzone,
							'fityp'=>$fityp,
							'stcdt'=>$stcdt,
							'j_1kfrepre'=>$j_1kfrepre,
							'ftbus'=>$ftbus,
							'ftind'=>$ftind,

							'ekorg'=>$ekorg,
							'waers'=>$waers,
							'verkf'=>$verkf,
							'telf1'=>$telf1,
							'minbw'=>$minbw,
							'zterm'=>$zterm,
							'inco1'=>$inco1,
							'inco2'=>$inco2,
							'kalsk'=>$kalsk,
							'expvz'=>$expvz,
							'zolla'=>$zolla,
							'meprf'=>$meprf,
							'ekgrp'=>$ekgrp,
							'plifz'=>$plifz,
							'skrit'=>$skrit,
							'bstae'=>$bstae,
							'rdprf'=>$rdprf,
							'vensl'=>$vensl
    					 );
}

close_conection($con);

$json_string = json_encode($proveedor);

echo $json_string;

?>