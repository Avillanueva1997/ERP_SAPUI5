<?php

require '../DatosBD.php';

$_Ip = $_POST['_Ip'];
$_Usuario_servidor = $_POST['_Usuario_servidor'];
$_Pass_servidor = $_POST['_Pass_servidor'];
$_Base_datos = $_POST['_Base_datos'];


$_werks = $_POST['_werks'];


$con = open_conection($_Ip,$_Usuario_servidor,$_Pass_servidor,$_Base_datos);


$sql = "select * from t001l where werks = '" . $_werks . "'";




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