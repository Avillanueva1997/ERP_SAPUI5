<?php

require '../DatosBD.php';

$_Ip = $_POST['_Ip'];
$_Usuario_servidor = $_POST['_Usuario_servidor'];
$_Pass_servidor = $_POST['_Pass_servidor'];
$_Base_datos = $_POST['_Base_datos'];

$_bukrs = $_POST['_bukrs'];
$_werks = $_POST['_werks'];

$con = open_conection($_Ip,$_Usuario_servidor,$_Pass_servidor,$_Base_datos);

if ($_bukrs == "" && $_werks == "") {
	
	$sql = "SELECT * FROM t001w";

} else {

	$sql = "SELECT * FROM t001w WHERE bukrs = '" . $_bukrs . "' and werks = '" . $_werks . "'";

}

$result = mysqli_query($con,$sql);

$centro = array();

while($row = mysqli_fetch_array($result)) 
{ 	    
    $bukrs=$row['bukrs'];
	$werks=$row['werks'];
	$name1=$row['name1'];
	$adrnr=$row['adrnr'];

    $centro[] = array(
    						'bukrs'=>$bukrs,
							'werks'=>$werks,
							'name1'=>$name1,
							'adrnr'=>$adrnr

    					 );
}


close_conection($con);

$json_string = json_encode($centro);

echo $json_string;

?>