<?php
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../auth/auth.php';
$id=trim(htmlspecialchars($_POST['id']));
$stmt=$conn->prepare("delete from income where id=? and user_id=?;");
$stmt->bind_param("ii",$id,$user_id);
$result=$stmt->execute();
if($result===TRUE){
    echo json_encode([
        "success"=>true,
        "message"=>"Deleted income successfully"
    ]);
}
else{
    echo json_encode([
        "success"=>false,
        "message"=>"Deletion failed.Please try again"
    ]);
}
?>