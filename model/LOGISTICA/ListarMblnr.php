<?php

require '../DatosBD.php';
require '../Correlativo.php';

$_Ip = $_POST['_Ip'];
$_Usuario_servidor = $_POST['_Usuario_servidor'];
$_Pass_servidor = $_POST['_Pass_servidor'];
$_Base_datos = $_POST['_Base_datos'];


$con = open_conection($_Ip,$_Usuario_servidor,$_Pass_servidor,$_Base_datos);

$_mblnr= mblnr_migo($con);

close_conection($con);

$codigo = array(
				'mblnr'=>$_mblnr
			);

echo json_encode($codigo);

function mblnr_migo($con){
    $sql = "select max(mblnr) as mblnr from mkpf";
    $result = mysqli_query($con,$sql);

    while($row = mysqli_fetch_array($result)) 
	{ 	    
    	$mblnr=$row['mblnr'];
	}

	if ($mblnr == "") {
		return '1000000000';
	}else{		
		return siguiente_correlativo($mblnr);
	}
}

?>