<?php

require 'DatosBD.php';

$_Ip = $_POST['_Ip'];
$_Usuario_servidor = $_POST['_Usuario_servidor'];
$_Pass_servidor = $_POST['_Pass_servidor'];
$_Base_datos = $_POST['_Base_datos'];

$_lifnr=$_POST['lifnr'];
$_banks=$_POST['banks'];
$_bankl=$_POST['bankl'];
$_bankn=$_POST['bankn'];
$_bkont=$_POST['bkont'];
$_bvtyp=$_POST['bvtyp'];
$_xezer=$_POST['xezer'];
$_bkref=$_POST['bkref'];
$_koinh=$_POST['koinh'];

$con = open_conection($_Ip,$_Usuario_servidor,$_Pass_servidor,$_Base_datos);

$sql = "update lfbk
		set bkont='".$_bkont."',
			bvtyp='".$_bvtyp."',
			xezer='".$_xezer."',
			bkref='".$_bkref."',
			koinh='".$_koinh."'		
		where lifnr ='".$_lifnr."' and 
		      banks = '".$_banks."' and 
		      bankl = '".$_bankl."' and 
		      bankn = '".$_bankn."'";

$result = mysqli_query($con,$sql);

close_conection($con);

echo $result;

?>