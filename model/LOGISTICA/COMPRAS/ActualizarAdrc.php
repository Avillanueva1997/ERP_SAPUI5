<?php

require '../../DatosBD.php';

$_para = $_POST['para'];
$_data = $_POST['data'];
$_Ip = $_para[0]['_Ip'];
$_Usuario_servidor = $_para[0]['_Usuario_servidor'];
$_Pass_servidor = $_para[0]['_Pass_servidor'];
$_Base_datos = $_para[0]['_Base_datos'];
$_Tabla = $_para[0]['_Tabla'];

$_addrnumber=$_data[0]['addrnumber'];
$_date_from=$_data[0]['date_from'];
$_nation=$_data[0]['nation'];
$_date_to=$_data[0]['date_to'];
$_title=$_data[0]['title'];
$_name1=$_data[0]['name1'];
$_name2=$_data[0]['name2'];
$_name3=$_data[0]['name3'];
$_name4=$_data[0]['name4'];
$_name_text=$_data[0]['name_text'];
$_name_co=$_data[0]['name_co'];

$con = open_conection($_Ip,$_Usuario_servidor,$_Pass_servidor,$_Base_datos);

$sql = "update adrc
		set date_from ='".$_date_from."',
		    nation ='".$_nation."',
			date_to ='".$_date_to."',
			title ='".$_title."',
			name1 ='".$_name1."',
			name2 ='".$_name2."',
			name3 ='".$_name3."',
			name4 ='".$_name4."',
			name_text ='".$_name_text."',
			name_co ='".$_name_co."'
		where  addrnumber ='".$_addrnumber."'";

$result = mysqli_query($con,$sql);

close_conection($con);

echo $result;

?>