<?php

require 'DatosBD.php';

$_Ip = $_POST['_Ip'];
$_Usuario_servidor = $_POST['_Usuario_servidor'];
$_Pass_servidor = $_POST['_Pass_servidor'];
$_Base_datos = $_POST['_Base_datos'];

$_lifnr = $_POST['_lifnr'];
$_ekorg = $_POST['_ekorg'];

$con = open_conection($_Ip,$_Usuario_servidor,$_Pass_servidor,$_Base_datos);

//$sql = "select * from lfa1
//			inner join lfm1 on lfa1.lifnr = lfm1.lifnr
//			where lfa1.lifnr = '".$_lifnr."' and
//			      lfm1.ekorg = '".$_ekorg."'";

$proveedor = array();


if ($_lifnr == "" && $_ekorg == "") {

	$sql = "select * from lfa1";

	$result = mysqli_query($con,$sql);


	while($row = mysqli_fetch_array($result)){ 	    
	    $lifnr=$row['lifnr'];
		$brsch=$row['brsch'];
		$kunnr=$row['kunnr'];
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
		$title_medi=$row['title_medi'];
		$name1=$row['name1'];		
		$sort1=$row['sort1']; 		
		$str_suppl1=$row['str_suppl1']; 
		$street=$row['street'];		
		$city2=$row['city2'];		
		$post_code1=$row['post_code1'];
		$country=$row['country'];		
		$region=$row['region'];

		$proveedor[] = array(
	    						'lifnr'=>$lifnr,
								'brsch'=>$brsch,
								'kunnr'=>$kunnr,
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
								'title_medi'=>$title_medi,
								'name1'=>$name1,		
								'sort1'=>$sort1, 		
								'str_suppl1'=>$str_suppl1,
								'street'=>$street,		
								'city2'=>$city2,		
								'post_code1'=>$post_code1,
								'country'=>$country,
								'region'=>$region
							);

	}

} else {

	$sql = "select * from lfa1
			inner join lfm1 on lfa1.lifnr = lfm1.lifnr
			where lfa1.lifnr = '".$_lifnr."'";

	$result = mysqli_query($con,$sql);


	while($row = mysqli_fetch_array($result)){ 	    
	    $lifnr=$row['lifnr'];
		$brsch=$row['brsch'];
		$kunnr=$row['kunnr'];
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
		$title_medi=$row['title_medi'];
		$name1=$row['name1'];		
		$sort1=$row['sort1']; 		
		$str_suppl1=$row['str_suppl1']; 
		$street=$row['street'];		
		$city2=$row['city2'];		
		$post_code1=$row['post_code1'];
		$country=$row['country'];		
		$region=$row['region'];

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
	 
	    $proveedor[] = array(
	    						'lifnr'=>$lifnr,
								'brsch'=>$brsch,
								'kunnr'=>$kunnr,
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
								'title_medi'=>$title_medi,
								'name1'=>$name1,		
								'sort1'=>$sort1, 		
								'str_suppl1'=>$str_suppl1,
								'street'=>$street,		
								'city2'=>$city2,		
								'post_code1'=>$post_code1,
								'country'=>$country,
								'region'=>$region,

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
								'rdprf'=>$rdprf
	    					 );
	}

}


close_conection($con);

$json_string = json_encode($proveedor);

echo $json_string;

?>