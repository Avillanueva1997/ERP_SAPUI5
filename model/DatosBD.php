<?php

$con = mysqli_connect('127.0.0.1','root','','prueba');
if (!$con){
    die('Could not connect: ' . mysqli_error($con));
}

mysqli_select_db($con,"prueba");
$sql = "select * from usuario where user = 'FFARRO'";
$result = mysqli_query($con,$sql);
    
while($row = mysqli_fetch_array($result)) {
    echo $row['User'];
}
mysqli_close($con);
?>