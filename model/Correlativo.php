<?php

function siguiente_correlativo($codigo){
	$int = (int)$codigo;
	$int = $int + 1;

    return (string)$int;
}


?>