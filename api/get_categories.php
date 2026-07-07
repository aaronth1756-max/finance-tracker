<?php
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../auth/auth.php';
$stmt=$conn->prepare("select * from categories where user_id=?;");
$stmt->bind_param("i",$user_id);
$stmt->execute();
$result=$stmt->get_result();
$categories=[];
while($row=$result->fetch_assoc()){
    $categories[]=$row;
}
echo json_encode(
    $categories
);
?>