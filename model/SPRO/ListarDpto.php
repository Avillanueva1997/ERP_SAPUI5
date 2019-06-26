<?php

require '../DatosBD.php';

$_Ip = $_POST['_Ip'];
$_Usuario_servidor = $_POST['_Usuario_servidor'];
$_Pass_servidor = $_POST['_Pass_servidor'];
$_Base_datos = $_POST['_Base_datos'];

$_codDpto = $_POST['_codDpto'];
$_codPais = $_POST['_codPais'];

$con = open_conection($_Ip,$_Usuario_servidor,$_Pass_servidor,$_Base_datos);

if ($_codPais == "" && $_codDpto == "") {

	$sql = "select * from tdpto";
	
} else {

	$sql = "select * from tdpto where codDpto = '". $_codDpto ."' and codPais = '" . $_codPais . "'";
}


$result = mysqli_query($con,$sql);

$dpto = array();

while($row = mysqli_fetch_array($result)) { 	    

	$codDpto=$row['codDpto'];
    $codPais=$row['codPais'];
	$descripDpto=$row['descripDpto'];

    $dpto[] = array(
					    	'codDpto'=>$codDpto,
    						'codPais'=>$codPais,
							'descripDpto'=>$descripDpto

    					 );
}

close_conection($con);

$json_string = json_encode($dpto);

echo $json_string;

?>