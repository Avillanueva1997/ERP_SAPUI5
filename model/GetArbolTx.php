<?php

require 'DatosBD.php';

$_Ip = $_POST['_Ip'];
$_Usuario_servidor = $_POST['_Usuario_servidor'];
$_Pass_servidor = $_POST['_Pass_servidor'];
$_Base_datos = $_POST['_Base_datos'];

$con = open_conection($_Ip,$_Usuario_servidor,$_Pass_servidor,$_Base_datos);

$sql = "select * from arbol_tx";

$result = mysqli_query($con,$sql);

$empresas = array();

while($row = mysqli_fetch_array($result)) 
{ 
    $text = $row['text'];
    $ref = $row['ref'];    
    $padre = $row['padre'];
    $vista = $row['vista'];    

    $arbol_tx[] = array('text'=> $text, 'ref'=> $ref,'padre'=>$padre,'vista'=>$vista);
}

close_conection($con);

$clave = array_search(' ', array_column($arbol_tx, 'padre'));

$padre = $arbol_tx[$clave];

//$json = "[{\"text\":\"" . $padre['objeto'] . "\",\"nodes\":[" . sin_hijo($arbol_tx) . "]}]";
 
$fr = buildTree($arbol_tx,"NODO0");

$json_string = json_encode($fr);

//echo count($arbol_tx);
echo $json_string;

function buildTree(array $elements, $parentId) {
    $branch = array();

    foreach ($elements as $element) {
        if ($element['padre'] == $parentId) {
            $children = buildTree($elements, $element['text']);
            if ($children) {
                $element['nodes'] = $children;
            }
            $branch[] = $element;
        }
    }

    return $branch;
}

?>