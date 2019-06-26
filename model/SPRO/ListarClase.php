<?php

require '../DatosBD.php';

$_Ip = $_POST['_Ip'];
$_Usuario_servidor = $_POST['_Usuario_servidor'];
$_Pass_servidor = $_POST['_Pass_servidor'];
$_Base_datos = $_POST['_Base_datos'];

$_bwart = $_POST['_bwart'];

$con = open_conection($_Ip,$_Usuario_servidor,$_Pass_servidor,$_Base_datos);

if ($_bwart == "") {

	$sql = "select * from t156";
	
} else {

	$sql = "select * from t156 where bwart = '" . $_bwart . "'";

}


$result = mysqli_query($con,$sql);

$clase = array();

while($row = mysqli_fetch_array($result)) 
{ 	    
    $bwart=$row['bwart'];
	$shkzg=$row['shkzg'];
	$btext=$row['btext'];
	$movRef=$row['movRef'];

    $clase[] = array(
    						'bwart'=>$bwart,
							'shkzg'=>$shkzg,
							'btext'=>$btext,
							'movRef'=>$movRef


    					 );
}

close_conection($con);

$json_string = json_encode($clase);

echo $json_string;

?>