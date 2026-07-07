<?php
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../auth/auth.php';
$title=trim(htmlspecialchars($_POST['title']));
$category_id=(int)$_POST['category_id'];
$amount=(float)$_POST['amount'];
$expense_date=trim(htmlspecialchars($_POST['expense_date']));
if(empty($title)||empty($category_id)||empty($amount)||empty($expense_date)){
    echo json_encode([
        "message"=>"Please fill all fields"
    ]);
    exit();
}
$stmt=$conn->prepare("
insert into expenses(user_id,category_id,title,amount,expense_date) values(?,?,?,?,?);
");
$stmt->bind_param("iisds",$user_id,$category_id,$title,$amount,$expense_date);
$result=$stmt->execute();
if(!$result){
    echo json_encode([
        "success"=>false,
        "message"=>"Error.Please try again later"
    ]);
    exit();
}
$stmt=$conn->prepare("select sum(amount) as 'spent' from expenses where category_id=? and user_id=?;");
$stmt->bind_param("ii",$category_id,$user_id);
$stmt->execute();
$result=$stmt->get_result();
$row=$result->fetch_assoc();
$spent=$row['spent'];
if($spent===NULL){
    $spent=0;
}
$stmt=$conn->prepare("select budget from budgets where category_id=? and user_id=?;");
$stmt->bind_param("ii",$category_id,$user_id);
$stmt->execute();
$result=$stmt->get_result();
$row=$result->fetch_assoc();
if($row){
    $budget=$row['budget'];
}
else{
    $budget=null;
}
$budgetexceeded=false;
if($budget!==NULL&&$spent>$budget){
    $budgetexceeded=true;
}
echo json_encode([
    "success"=>true,
    "message"=>"Expense added successfully",
    "budgetexceeded"=>$budgetexceeded,
    "spent"=>$spent,
    "budget"=>$budget
])
?>