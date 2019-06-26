<?php

require '../DatosBD.php';


$_para = $_POST['para'];
$_data = $_POST['data'][0];
$_camp = $_POST['camp'][0];
$_Ip = $_para[0]['_Ip'];
$_Usuario_servidor = $_para[0]['_Usuario_servidor'];
$_Pass_servidor = $_para[0]['_Pass_servidor'];
$_Base_datos = $_para[0]['_Base_datos'];
$_Tabla = $_para[0]['_Tabla'];

$tamañoData  = sizeof($_data);
$tamañoCamp  = sizeof($_camp);

$con = open_conection($_Ip,$_Usuario_servidor,$_Pass_servidor,$_Base_datos);

for ($i=0; $i < $tamañoData ; $i++) { 		

    	$sql = "INSERT INTO ".$_Tabla." VALUES (";

		for($m=0; $m < $tamañoCamp ; $m++){
			$campo = $_camp[$m];
			$prueba2 = $_data[$i][$campo];
			$max = $m + 1;
			if($tamañoCamp === $max){
				$sql = $sql."'".$prueba2."')";
			}else{
				$sql = $sql."'".$prueba2."',";
			}
			
		}
       
    $result = mysqli_query($con,$sql);
	
}


close_conection($con);

echo $result;

?>