<?php

require '../DatosBD.php';

$_Ip = $_POST['_Ip'];
$_Usuario_servidor = $_POST['_Usuario_servidor'];
$_Pass_servidor = $_POST['_Pass_servidor'];
$_Base_datos = $_POST['_Base_datos'];

$_codDistrito = $_POST['_codDistrito'];
$_codProvincia = $_POST['_codProvincia'];
$_codDpto = $_POST['_codDpto'];
$_codPais = $_POST['_codPais'];


$con = open_conection($_Ip,$_Usuario_servidor,$_Pass_servidor,$_Base_datos);

if ($_codDistrito == "" && $_codProvincia == "" && $_codDpto == "" && $_codPais == "") {

	$sql = "select * from tdistrito";
	
} else {

	$sql = "select * from tdistrito where codDistrito = '". $_codDistrito."' and codProvincia = '". $_codProvincia ."' and codDpto = '". $_codDpto ."' and codPais = '" . $_codPais . "'";

}


$result = mysqli_query($con,$sql);

$distrito = array();

while($row = mysqli_fetch_array($result)) { 	    

    $codDistrito=$row['codDistrito'];
    $codProvincia=$row['codProvincia'];
    $codDpto=$row['codDpto'];
    $codPais=$row['codPais'];
	$descripDistrito=$row['descripDistrito'];

    $distrito[] = array(
    						'codDistrito'=>$codDistrito,
    						'codProvincia'=>$codProvincia,
    						'codDpto'=>$codDpto,
    						'codPais'=>$codPais,
							'descripDistrito'=>$descripDistrito

    					 );
}

close_conection($con);

$json_string = json_encode($distrito);

echo $json_string;

?>