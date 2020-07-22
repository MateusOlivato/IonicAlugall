<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, Authorization, Accept, X-Requested-With, x-xsrf-token");
header("Content-Type: application/json; charset=utf-8");

include "config.php";

$postjson = json_decode(file_get_contents('php://input'), true);
$today = date('Y-m-d H:i:s');

if($postjson['aksi']=="proses_register"){

    $verificaEmail = mysqli_fetch_array(mysqli_query($mysqli, "SELECT email_address 
                                                               FROM tbUsuarios 
                                                               WHERE email_address ='$postjson[email_address]'
                                                               "));

    if($verificaEmail['email_address']==$postjson['email_address']){
        $result = json_encode(array('success'=>false, 'msg'=>"Endereço de e-mail já cadastrado! Favor escolher outro."));
    }else{                                                         
    
        $password = $postjson['password'];

        $insert = mysqli_query($mysqli, "INSERT INTO tbUsuarios SET
            your_name       = '$postjson[your_name]',        
            date_birth      = '$postjson[date_birth]',
            email_address   = '$postjson[email_address]',
            password        = '$postjson[password]',
            gender          = '$postjson[gender]',
            created_at      = '$today'        
            ");
        

        if($insert){
            $result = json_encode(array('success'=>true, 'msg'=> 'Registrado com sucesso!'));
        }else{
            $result = json_encode(array('success'=>false, 'msg'=> 'Falha no registro!'));
        }
    }

    echo $result;

}elseif($postjson['aksi']=="proses_login"){

    $logindata = mysqli_fetch_array(mysqli_query($mysqli, "SELECT * FROM tbUsuarios WHERE email_address ='$postjson[email_address]'
    AND password = '$postjson[password]'
    "));

    $data = array(
        'id_user'         	=> $logindata['id_user'],    
        'your_name'      	=> $logindata['your_name'], 
        'gender'          	=> $logindata['gender'], 
        'date_birth'        => $logindata['date_birth'],
        'email_address'   	=> $logindata['email_address']              
        );
    

    if($logindata){
        $result = json_encode(array('success'=>true, 'msg'=> $data));
    }else{
        $result = json_encode(array('success'=>false, 'msg'=> 'Credenciais incorretas!'));
    }

    echo $result;
}

?>
