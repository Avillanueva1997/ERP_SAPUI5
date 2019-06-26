<?php

require '../DatosBD.php';

$_Ip = $_POST['_Ip'];
$_Usuario_servidor = $_POST['_Usuario_servidor'];
$_Pass_servidor = $_POST['_Pass_servidor'];
$_Base_datos = $_POST['_Base_datos'];

$_mtart = $_POST['_mtart'];

$con = open_conection($_Ip,$_Usuario_servidor,$_Pass_servidor,$_Base_datos);

if ($_mtart == "") {

	$sql = "select * from t134";

} else {

	$sql = "select * from t134 where mtart = '" . $_mtart . "'";

}

$result = mysqli_query($con,$sql);

$tipo = array();

while($row = mysqli_fetch_array($result)) 
{ 	    
    $mtart=$row['mtart'];
    $mtbez=$row['mtbez'];


    $tipo[] = array(
							'mtart'=>$mtart,
							'mtbez'=>$mtbez
    					 );
}

close_conection($con);

$json_string = json_encode($tipo);

echo $json_string;

?>