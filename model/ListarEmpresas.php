<?php

require 'DatosBD.php';

$con = open_conection('localhost','FFARRO','Freluive1608@','ERP_MAIN');

$sql = "select empresa,descripcion from empresa";

$result = mysqli_query($con,$sql);

$empresas = array();

while($row = mysqli_fetch_array($result)) 
{ 	
    $empresa=$row['empresa'];
    $descripcion=$row['descripcion'];    

    $empresas[] = array('empresa'=> $empresa, 'descripcion'=> $descripcion);
}

close_conection($con);

$json_string = json_encode($empresas);

echo $json_string;

?>