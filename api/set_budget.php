<?php
header("Content-Type: application/json");
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../auth/auth.php';
$category_id=trim(htmlspecialchars($_POST['category_id']));
$budget=trim(htmlspecialchars($_POST['budget']));
if(empty($category_id) || empty($budget)){
    echo json_encode([
        "success"=>false,
        "message"=>"All fields are required"
    ]);
    exit();
}
$stmt=$conn->prepare("select id from budgets where category_id=? and user_id=?;");
$stmt->bind_param("ii",$category_id,$user_id);
$stmt->execute();
$result=$stmt->get_result();
if($result->num_rows>0){
    $stmt=$conn->prepare("update budgets set budget=? where user_id=? and category_id=?;");
    $stmt->bind_param("dii",$budget,$user_id,$category_id);
    if($stmt->execute()){
        echo json_encode([
            "success"=>true,
            "message"=>"Budget updated successfully"
        ]);
    }
    else{
        echo json_encode([
            "success"=>false,
            "message"=>"Error.Please try again later"
        ]);
    }
}
else{
    $stmt=$conn->prepare("insert into budgets(budget,category_id,user_id) values(?,?,?);");
    $stmt->bind_param("dii",$budget,$category_id,$user_id);
    if($stmt->execute()){
        echo json_encode([
            "success"=>true,
            "message"=>"Budget added successfully"
        ]);
    }
    else{
        echo json_encode([
            "success"=>false,
            "message"=>"Error.Please try again later"
        ]);
    }
}
?>