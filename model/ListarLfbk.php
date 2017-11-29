<?php

require 'DatosBD.php';

$_Ip = $_POST['_Ip'];
$_Usuario_servidor = $_POST['_Usuario_servidor'];
$_Pass_servidor = $_POST['_Pass_servidor'];
$_Base_datos = $_POST['_Base_datos'];

$_lifnr = $_POST['_lifnr'];

$con = open_conection($_Ip,$_Usuario_servidor,$_Pass_servidor,$_Base_datos);

$sql = "select * from lfbk where lifnr = '" . $_lifnr . "'";

$result = mysqli_query($con,$sql);

$proveedor = array();

while($row = mysqli_fetch_array($result)) 
{ 	    
    $lifnr=$row['lifnr'];
	$banks=$row['banks'];
	$bankl=$row['bankl'];
	$bankn=$row['bankn'];
	$bkont=$row['bkont'];
	$bvtyp=$row['bvtyp'];
	$xezer=$row['xezer'];
	$bkref=$row['bkref'];
	$koinh=$row['koinh'];

    $proveedor[] = array(
    						'lifnr'=>$lifnr,
							'banks'=>$banks,
							'bankl'=>$bankl,
							'bankn'=>$bankn,
							'bkont'=>$bkont,
							'bvtyp'=>$bvtyp,
							'xezer'=>$xezer,
							'bkref'=>$bkref,
							'koinh'=>$koinh

    					 );
}

close_conection($con);

$json_string = json_encode($proveedor);

echo $json_string;

?>