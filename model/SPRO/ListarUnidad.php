<?php

require '../DatosBD.php';

$_Ip = $_POST['_Ip'];
$_Usuario_servidor = $_POST['_Usuario_servidor'];
$_Pass_servidor = $_POST['_Pass_servidor'];
$_Base_datos = $_POST['_Base_datos'];

$_msehi = $_POST['_msehi'];


$con = open_conection($_Ip,$_Usuario_servidor,$_Pass_servidor,$_Base_datos);

if ($_msehi == "") {

	$sql = "select * from t006";

} else {

	$sql = "select * from t006 where msehi = '" . $_msehi . "'";

}

$result = mysqli_query($con,$sql);

$unidad = array();

while($row = mysqli_fetch_array($result)) 
{ 	    
    $msehi=$row['msehi'];
    $mseht=$row['mseht'];

    $unidad[] = array(
							'msehi'=>$msehi,
							'mseht'=>$mseht

    					 );
}

close_conection($con);

$json_string = json_encode($unidad);

echo $json_string;

?>