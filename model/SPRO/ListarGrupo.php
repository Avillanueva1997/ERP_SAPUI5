<?php

require '../DatosBD.php';

$_Ip = $_POST['_Ip'];
$_Usuario_servidor = $_POST['_Usuario_servidor'];
$_Pass_servidor = $_POST['_Pass_servidor'];
$_Base_datos = $_POST['_Base_datos'];

$_matkl = $_POST['_matkl'];

$con = open_conection($_Ip,$_Usuario_servidor,$_Pass_servidor,$_Base_datos);

if ($_matkl == "") {
	
	$sql = "select * from t023";

} else {

	$sql = "select * from t023 where matkl = '" . $_matkl . "'";

}

$result = mysqli_query($con,$sql);

$grupo = array();

while($row = mysqli_fetch_array($result)) 
{ 	    
    $matkl=$row['matkl'];
    $butxt=$row['butxt'];


    $grupo[] = array(
							'matkl'=>$matkl,
							'butxt'=>$butxt

    					 );
}

close_conection($con);

$json_string = json_encode($grupo);

echo $json_string;

?>