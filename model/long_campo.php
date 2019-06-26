<?php

require 'DatosBD.php';

$_Ip = $_POST['_Ip'];
$_Usuario_servidor = $_POST['_Usuario_servidor'];
$_Pass_servidor = $_POST['_Pass_servidor'];
$_Base_datos = 'information_schema';
$_Base_datos_2 = $_POST['_Base_datos'];

$_tabla = $_POST['_tabla'];

$con = open_conection($_Ip,$_Usuario_servidor,$_Pass_servidor,$_Base_datos);

$sql = "select table_name as tabla, column_name as campo,IFNULL(character_maximum_length,numeric_precision) as longitud from columns where table_schema = '".$_Base_datos_2."' and table_name = '".$_tabla."'";

$result = mysqli_query($con,$sql);

$arreglo = array();

while($row = mysqli_fetch_array($result)) 
{ 	    
    $tabla=$row['tabla'];
	$campo=$row['campo'];
	$longitud=$row['longitud'];
	$maxLongitud;

	if ($longitud > 10 ) {
		$maxLongitud = 10;
	} elseif ($longitud < 4) {
		$maxLongitud = 4;
	}else {
		$maxLongitud = $longitud + 2;
	}
	
    $arreglo[] = array(
    						'tabla'=>$tabla,
							'campo'=>$campo,
							'longitud'=>$longitud,
							'maxLongitud'=>$maxLongitud
    					 );
}

close_conection($con);

$json_string = json_encode($arreglo);

echo $json_string;

?>