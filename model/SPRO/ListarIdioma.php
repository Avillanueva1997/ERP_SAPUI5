<?php

require '../DatosBD.php';

$_Ip = $_POST['_Ip'];
$_Usuario_servidor = $_POST['_Usuario_servidor'];
$_Pass_servidor = $_POST['_Pass_servidor'];
$_Base_datos = $_POST['_Base_datos'];

$_spras = $_POST['_spras'];

$con = open_conection($_Ip,$_Usuario_servidor,$_Pass_servidor,$_Base_datos);

if ($_spras == "") {

	$sql = "select * from t002";

} else {

	$sql = "select * from t002 where spras = '" . $_spras . "'";
	
}

$result = mysqli_query($con,$sql);

$idioma = array();

while($row = mysqli_fetch_array($result)) 
{ 	    
    $spras=$row['spras'];
    $sptxt=$row['sptxt'];


    $idioma[] = array(
							'spras'=>$spras,
							'sptxt'=>$sptxt

    					 );
}

close_conection($con);

$json_string = json_encode($idioma);

echo $json_string;

?>