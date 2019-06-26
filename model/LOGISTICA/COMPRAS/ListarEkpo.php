<?php

require '../../DatosBD.php';

$_Ip = $_POST['_Ip'];
$_Usuario_servidor = $_POST['_Usuario_servidor'];
$_Pass_servidor = $_POST['_Pass_servidor'];
$_Base_datos = $_POST['_Base_datos'];

$_ebeln = $_POST['_ebeln'];
$_ebelp = $_POST['_ebelp'];


$con = open_conection($_Ip,$_Usuario_servidor,$_Pass_servidor,$_Base_datos);

if ($_ebeln == "" && $_ebelp == "") {

	$sql = "select * from ekpo";
	
} else {

	$sql = "select * from ekpo where ebeln = '" . $_ebeln . "' and ebelp = '". $_ebelp ."'";

}


$result = mysqli_query($con,$sql);

$ekpo = array();

while($row = mysqli_fetch_array($result)) 
{ 	    
    $ebeln=$row['ebeln'];
	$ebelp=$row['ebelp'];
	$knttp=$row['knttp'];
	$matnr=$row['matnr'];
	$menge=$row['menge'];
	$meins=$row['meins'];
	$netpr=$row['netpr'];
	$peinh=$row['peinh'];
	$infnr=$row['infnr'];

    $ekpo[] = array(
    						'ebeln'=>$ebeln,
							'ebelp'=>$ebelp,
							'knttp'=>$knttp,
							'matnr'=>$matnr,
							'menge'=>$menge,
							'meins'=>$meins,
							'netpr'=>$netpr,
							'peinh'=>$peinh,
							'infnr'=>$infnr
						);
}

close_conection($con);

$json_string = json_encode($ekpo);

echo $json_string;

?>