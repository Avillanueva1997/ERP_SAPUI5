<?php

require 'DatosBD.php';

$_Ip = $_POST['_Ip'];
$_Usuario_servidor = $_POST['_Usuario_servidor'];
$_Pass_servidor = $_POST['_Pass_servidor'];
$_Base_datos = $_POST['_Base_datos'];

$_lifnr = $_POST['_lifnr'];

$con = open_conection($_Ip,$_Usuario_servidor,$_Pass_servidor,$_Base_datos);

$sql = "select * from lfa1 where lifnr = '" . $_lifnr . "'";

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
							'ftind'=>$ftind
    					 );
}

close_conection($con);

$json_string = json_encode($proveedor);

echo $json_string;

?>