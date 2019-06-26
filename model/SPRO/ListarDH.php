<?php

require '../DatosBD.php';

$_Ip = $_POST['_Ip'];
$_Usuario_servidor = $_POST['_Usuario_servidor'];
$_Pass_servidor = $_POST['_Pass_servidor'];
$_Base_datos = $_POST['_Base_datos'];

$_id = $_POST['_idDH'];

$con = open_conection($_Ip,$_Usuario_servidor,$_Pass_servidor,$_Base_datos);

if ($_id == "") {

	$sql = "select * from debehaber";
	
} else {

	$sql = "select * from debehaber where idDH = '" . $_id . "'";

}


$result = mysqli_query($con,$sql);

$dh = array();

while($row = mysqli_fetch_array($result)) 
{ 	    
    $idDH=$row['idDH'];
	$shkzg=$row['shkzg'];

    $dh[] = array(
    						'idDH'=>$idDH,
							'shkzg'=>$shkzg

    					 );
}

close_conection($con);

$json_string = json_encode($dh);

echo $json_string;

?>