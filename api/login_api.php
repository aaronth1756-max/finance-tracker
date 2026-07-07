<?php
header("Content-Type: application/json");
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../auth/config.php';
require __DIR__ . '/../vendor/autoload.php';
use Firebase\JWT\JWT;
$email=trim(htmlspecialchars($_POST['email']));
$password=trim(htmlspecialchars($_POST['password']));
if(empty($email)||empty($password)){
    echo json_encode([
        "success"=>false,
        "message"=>"Please fill all fields"
    ]);
    exit();
}
$stmt=$conn->prepare("
select * from users where email=?
;");
$stmt->bind_param("s",$email);
$stmt->execute();
$result=$stmt->get_result();
if($result->num_rows==0){
    echo json_encode([
        "success"=>false,
        "message"=>"Email does not exist Register instead"
    ]);
    exit();
}
$user=$result->fetch_assoc();
if(!password_verify($password,$user['password'])){
    echo json_encode([
        "success"=>false,
        "message"=>"Password is incorrect"
    ]);
    exit();
}

$payload=[
    "userid"=>$user['id'],
    "useremail"=>$user['email'],
    "exp"=>time()+3600
];
$token=JWT::encode($payload,JWT_SECRET_KEY,'HS256');
echo json_encode([
    "success"=>true,
    "token"=>$token
]);
?>