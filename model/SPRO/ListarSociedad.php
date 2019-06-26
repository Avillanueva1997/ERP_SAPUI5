<?php

require '../DatosBD.php';

$_Ip = $_POST['_Ip'];
$_Usuario_servidor = $_POST['_Usuario_servidor'];
$_Pass_servidor = $_POST['_Pass_servidor'];
$_Base_datos = $_POST['_Base_datos'];

$_bukrs = $_POST['_bukrs'];

$con = open_conection($_Ip,$_Usuario_servidor,$_Pass_servidor,$_Base_datos);

if ($_bukrs == "") {
	
	$sql = "SELECT * FROM t001";

} else {

	$sql = "SELECT * FROM t001 WHERE bukrs = '" . $_bukrs . "'";

}

$result = mysqli_query($con,$sql);



$sociedad = array();

while($row = mysqli_fetch_array($result)) 
{ 	    
    $bukrs=$row['bukrs'];
	$butxt=$row['butxt'];

    $sociedad[] = array(
    						'bukrs'=>$bukrs,
							'butxt'=>$butxt

    					 );
}

close_conection($con);

$json_string = json_encode($sociedad);

echo $json_string;

?>