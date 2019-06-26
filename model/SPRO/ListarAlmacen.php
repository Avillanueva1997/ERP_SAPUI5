<?php

require '../DatosBD.php';

$_Ip = $_POST['_Ip'];
$_Usuario_servidor = $_POST['_Usuario_servidor'];
$_Pass_servidor = $_POST['_Pass_servidor'];
$_Base_datos = $_POST['_Base_datos'];

$_bukrs = $_POST['_bukrs'];
$_werks = $_POST['_werks'];
$_lgort = $_POST['_lgort'];

$con = open_conection($_Ip,$_Usuario_servidor,$_Pass_servidor,$_Base_datos);

if ($_bukrs == "" && $_werks == "" && $_lgort == "") {

	$sql = "select * from t001l";
	
} else {

	$sql = "select * from t001l where bukrs = '" . $_bukrs . "' and werks = '" . $_werks . "' and lgort = '" . $_lgort . "'";

}


$result = mysqli_query($con,$sql);

$almacen = array();

while($row = mysqli_fetch_array($result)) 
{ 	    
    $bukrs=$row['bukrs'];
	$werks=$row['werks'];
	$lgort=$row['lgort'];
	$lgobe=$row['lgobe'];
	$adrnr=$row['adrnr'];

    $almacen[] = array(
    						'bukrs'=>$bukrs,
							'werks'=>$werks,
							'lgort'=>$lgort,
							'lgobe'=>$lgobe,
							'adrnr'=>$adrnr

    					 );
}

close_conection($con);

$json_string = json_encode($almacen);

echo $json_string;

?>