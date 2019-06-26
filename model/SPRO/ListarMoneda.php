<?php

require '../DatosBD.php';

$_Ip = $_POST['_Ip'];
$_Usuario_servidor = $_POST['_Usuario_servidor'];
$_Pass_servidor = $_POST['_Pass_servidor'];
$_Base_datos = $_POST['_Base_datos'];

$_waers = $_POST['_waers'];

$con = open_conection($_Ip,$_Usuario_servidor,$_Pass_servidor,$_Base_datos);

if ($_waers == "") {
	
	$sql = "select * from tcurc";

} else {

	$sql = "select * from tcurc where waers = '" . $_waers . "'";
}


$result = mysqli_query($con,$sql);

$moneda = array();

while($row = mysqli_fetch_array($result)) 
{ 	    
    $waers=$row['waers'];
    $ktext=$row['ktext'];

    $moneda[] = array(
							'waers'=>$waers,
							'ktext'=>$ktext

    					 );
}

close_conection($con);

$json_string = json_encode($moneda);

echo $json_string;

?>