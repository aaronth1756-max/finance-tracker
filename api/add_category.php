<?php
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../auth/auth.php';
$name=trim(htmlspecialchars($_POST['name']));
if(empty($name)){
    exit();
}
$stmt=$conn->prepare("insert into categories(name,user_id) values(?,?);");
$stmt->bind_param("si",$name,$user_id);
$result=$stmt->execute();
if($result===TRUE){
    echo json_encode([
        "success"=>true,
        "message"=>"Category addded successfully"
    ]);
}
else{
    echo json_encode([
        "success"=>false,
        "message"=>"Category addition failed.Please try again"
    ]);
}
?>