<?php
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../auth/auth.php';
$title=trim(htmlspecialchars($_POST['title']));
$amount=trim(htmlspecialchars($_POST['amount']));
$date=trim(htmlspecialchars($_POST['date']));
$stmt=$conn->prepare("
insert into income(user_id,title,amount,income_date) values(?,?,?,?);
");
$stmt->bind_param("isds",$user_id,$title,$amount,$date);
$result=$stmt->execute();
if($result===TRUE){
    echo json_encode([
        "success"=>true,
        "message"=>"Income added successfully"
    ]);
}
else{
    echo json_encode([
        "success"=>false,
        "message"=>"Income not added.Please try again"
    ]);
}
?>