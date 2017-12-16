<?php

require 'DatosBD.php';

$_Ip = $_POST['_Ip'];
$_Usuario_servidor = $_POST['_Usuario_servidor'];
$_Pass_servidor = $_POST['_Pass_servidor'];
$_Base_datos = 'information_schema';

$_tabla = $_POST['_tabla'];

$con = open_conection($_Ip,$_Usuario_servidor,$_Pass_servidor,$_Base_datos);

$sql = "select table_name as tabla, column_name as campo,IFNULL(character_maximum_length,numeric_precision) as longitud from columns where table_schema = 'erp' and table_name = '".$_tabla."'";

$result = mysqli_query($con,$sql);

$arreglo = array();

while($row = mysqli_fetch_array($result)) 
{ 	    
    $tabla=$row['tabla'];
	$campo=$row['campo'];
	$longitud=$row['longitud'];
	
    $arreglo[] = array(
    						'tabla'=>$tabla,
							'campo'=>$campo,
							'longitud'=>$longitud
    					 );
}

close_conection($con);

$json_string = json_encode($arreglo);

echo $json_string;

?>