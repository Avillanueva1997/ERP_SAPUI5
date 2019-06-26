<?php

require '../DatosBD.php';

$_Ip = $_POST['_Ip'];
$_Usuario_servidor = $_POST['_Usuario_servidor'];
$_Pass_servidor = $_POST['_Pass_servidor'];
$_Base_datos = $_POST['_Base_datos'];

$_codProvincia = $_POST['_codProvincia'];
$_codDpto = $_POST['_codDpto'];
$_codPais = $_POST['_codPais'];

$con = open_conection($_Ip,$_Usuario_servidor,$_Pass_servidor,$_Base_datos);

if ($_codPais == "" && $_codDpto == "" && $_codProvincia == "") {

	$sql = "select * from tprovincia";
	
} else {

	$sql = "select * from tprovincia where codPais = '" . $_codPais . "' and codDpto = '". $_codDpto ."' and codProvincia = '". $_codProvincia ."'";
}


$result = mysqli_query($con,$sql);

$provincia = array();

while($row = mysqli_fetch_array($result)) { 	    

	$codDpto=$row['codDpto'];
    $codPais=$row['codPais'];
    $codProvincia=$row['codProvincia'];
	$descripProvincia=$row['descripProvincia'];

    $provincia[] = array(
    						'codProvincia'=>$codProvincia,
    						'codDpto'=>$codDpto,
    						'codPais'=>$codPais,			
							'descripProvincia'=>$descripProvincia

    					 );
}

close_conection($con);

$json_string = json_encode($provincia);

echo $json_string;

?>