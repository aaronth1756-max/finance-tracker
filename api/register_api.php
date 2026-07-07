<?php
require_once __DIR__ . '/../config/db.php';
$username=trim(htmlspecialchars($_POST['username']));
$email=trim(htmlspecialchars($_POST['email']));
$password=trim(htmlspecialchars($_POST['password']));

if(empty($email)||empty($username)||empty($password)){
    echo json_encode([
        "success"=>false,
        "message"=>"Please fill all fields"
    ]);
    exit();
}
$stmt=$conn->prepare("select * from users where email=?");
$stmt->bind_param("s",$email);
$stmt->execute();
$result=$stmt->get_result();
if($result->num_rows>0){
    echo json_encode([
        "success"=>false,
        "message"=>"Email already exists"
    ]);
    exit();
}
$hashedpassword=password_hash($password,PASSWORD_DEFAULT);
$stmt=$conn->prepare("
insert into users(username,email,password) values(?,?,?);
");
$stmt->bind_param("sss",$username,$email,$hashedpassword);
$result=$stmt->execute();
if($result===TRUE){
    echo json_encode([
        "success"=>true,
    ]);

}
else{
    echo json_encode([
        "success"=>false,
        "message"=>"Error in creating account.Please try again"
    ]);
    exit();
}

?>