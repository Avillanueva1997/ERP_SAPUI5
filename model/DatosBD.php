<?php

function open_conection($ip,$usuariobd,$clavebd,$bd){
    $con = mysqli_connect($ip,$usuariobd,'',$bd);
    mysqli_select_db($con,$bd);
    return $con;
}

function close_conection($con1){
    if(isset($con1) && $con1!=null ){
        mysqli_close($con1);    
    }
}

function encriptar($data){
    $algorithm = MCRYPT_BLOWFISH;
    $key = 'ERPSAP';
    $mode = MCRYPT_MODE_CBC;

    $iv = mcrypt_create_iv(mcrypt_get_iv_size($algorithm, $mode),
                           MCRYPT_DEV_URANDOM);

    $encrypted_data = mcrypt_encrypt($algorithm, $key, $data, $mode, $iv);
    $plain_text = base64_encode($encrypted_data);
    return $plain_text;
}

function desencriptar($data){
    $algorithm = MCRYPT_BLOWFISH;
    $key = 'ERPSAP';
    $mode = MCRYPT_MODE_CBC;

    $iv = mcrypt_create_iv(mcrypt_get_iv_size($algorithm, $mode),
                           MCRYPT_DEV_URANDOM);
    
    $encrypted_data = base64_decode($data);
    $decoded = mcrypt_decrypt($algorithm, $key, $encrypted_data, $mode, $iv);
    return $decoded;
}

?>