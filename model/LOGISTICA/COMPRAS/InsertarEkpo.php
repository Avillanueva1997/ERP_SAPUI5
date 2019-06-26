<?php

require '../../DatosBD.php';

$_para = $_POST['para'];
$_data = $_POST['data'];
$_Ip = $_para[0]['_Ip'];
$_Usuario_servidor = $_para[0]['_Usuario_servidor'];
$_Pass_servidor = $_para[0]['_Pass_servidor'];
$_Base_datos = $_para[0]['_Base_datos'];
$_Tabla = $_para[0]['_Tabla'];

$_ebeln=$_data[0]['ebeln'];
$_ebelp=$_data[0]['ebelp'];
$_knttp=$_data[0]['knttp'];
$_matnr=$_data[0]['matnr'];
$_menge=$_data[0]['menge'];
$_meins=$_data[0]['meins'];
$_netpr=$_data[0]['netpr'];
$_peinh=$_data[0]['peinh'];
$_infnr=$_data[0]['infnr'];


$con = open_conection($_Ip,$_Usuario_servidor,$_Pass_servidor,$_Base_datos);

$sql = "INSERT INTO ekpo VALUES('".$_ebeln."',
							    '".$_ebelp."',
							    '".$_knttp."',
							    '".$_matnr."',
			                    '".$_menge."',
			                    '".$_meins."',
			                    '".$_netpr."',
			                    '".$_peinh."',
			                    '".$_infnr."')";	

$result = mysqli_query($con,$sql);

close_conection($con);

echo $result;

?>