<?php
header("Content-Type: application/json");
require __DIR__ . '/../vendor/autoload.php';
include 'config.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
$headers=getallheaders();
if(!isset($headers['Authorization'])){
    http_response_code(401);
    echo json_encode([
        "success"=>false,
        "message"=>"No token found"
    ]);
    exit();
}
$token=str_replace("Bearer ","",$headers['Authorization']);
try{
    $decoded=JWT::decode($token,new Key(JWT_SECRET_KEY,'HS256'));
    $user_id=$decoded->userid;
}
catch(Exception $e){
    http_response_code(401);
    echo json_encode([
        "success"=>false,
        "message"=>"Session expired or Invalid Token"
    ]);
    exit();
}
?>