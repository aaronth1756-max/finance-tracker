<?php
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../auth/auth.php';
$id=trim(htmlspecialchars($_POST['id']));
$title=trim(htmlspecialchars($_POST['title']));
$amount=trim(htmlspecialchars($_POST['amount']));
$date=trim(htmlspecialchars($_POST['date']));
$stmt=$conn->prepare("update expenses set title=?,amount=?,expense_date=? where user_id=? and id=?;");
$stmt->bind_param("sdsii",$title,$amount,$date,$user_id,$id);
$result=$stmt->execute();
if($result===TRUE){
    echo json_encode([
        "success"=>true,
        "message"=>"Updated expense successfully"
    ]);
}
else{
    echo json_encode([
        "success"=>false,
        "message"=>"Updation failed.Please try again"
    ]);
}
?>