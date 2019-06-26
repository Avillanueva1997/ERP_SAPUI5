<?php

require '../../DatosBD.php';

$_Ip = $_POST['_Ip'];
$_Usuario_servidor = $_POST['_Usuario_servidor'];
$_Pass_servidor = $_POST['_Pass_servidor'];
$_Base_datos = $_POST['_Base_datos'];

$_addrnumber = $_POST['_addrnumber'];


$con = open_conection($_Ip,$_Usuario_servidor,$_Pass_servidor,$_Base_datos);

if ($_addrnumber == "" ) {

	$sql = "select * from adrc";
	
} else {

	$sql = "select * from adrc where addrnumber = '" . $_addrnumber . "'";

}


$result = mysqli_query($con,$sql);

$adrc = array();

while($row = mysqli_fetch_array($result)) 
{ 	    
    $addrnumber=$row['addrnumber'];
	$date_from=$row['date_from'];
	$nation=$row['nation'];
	$date_to=$row['date_to'];
	$title=$row['title'];
	$name1=$row['name1'];
	$name2=$row['name2'];
	$name3=$row['name3'];
	$name4=$row['name4'];
	$name_text=$row['name_text'];
	$name_co=$row['name_co'];

    $adrc[] = array(
    						'addrnumber'=>$addrnumber,
							'date_from'=>$date_from,
							'nation'=>$nation,
							'date_to'=>$date_to,
							'title'=>$title,
							'name1'=>$name1,
							'name2'=>$name2,
							'name3'=>$name3,
							'name4'=>$name4,
							'name_text'=>$name_text,
							'name_co'=>$name_co
    					 );
}

close_conection($con);

$json_string = json_encode($adrc);

echo $json_string;

?>