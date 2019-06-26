<?php

require '../DatosBD.php';

$_Ip = $_POST['_Ip'];
$_Usuario_servidor = $_POST['_Usuario_servidor'];
$_Pass_servidor = $_POST['_Pass_servidor'];
$_Base_datos = $_POST['_Base_datos'];

$_codPais = $_POST['_codPais'];

$con = open_conection($_Ip,$_Usuario_servidor,$_Pass_servidor,$_Base_datos);

if ($_codPais == "") {

	$sql = "select * from tpais";
	
} else {

	$sql = "select * from tpais where codPais = '" . $_codPais . "'";

}


$result = mysqli_query($con,$sql);

$pais = array();

while($row = mysqli_fetch_array($result)) 
{ 	    
    $codPais=$row['codPais'];
	$descripPais=$row['descripPais'];

    $pais[] = array(
    						'codPais'=>$codPais,
							'descripPais'=>$descripPais

    					 );
}

close_conection($con);

$json_string = json_encode($pais);

echo $json_string;

?>