<?php
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../auth/auth.php';
$income_stmt=$conn->prepare("
select sum(amount) as total_income from income where user_id=?;
");
$income_stmt->bind_param("i",$user_id);
$income_stmt->execute();
$income_result=$income_stmt->get_result();
$income_row=$income_result->fetch_assoc();
$total_income=$income_row['total_income'];
if($total_income===NULL){
    $total_income=0;
}
$expense_stmt=$conn->prepare("
select sum(amount) as total_expense from expenses where user_id=?;
");
$expense_stmt->bind_param("i",$user_id);
$expense_stmt->execute();
$expense_result=$expense_stmt->get_result();
$expense_row=$expense_result->fetch_assoc();
$total_expense=$expense_row['total_expense'];
if($total_expense===NULL){
    $total_expense=0;
}
$balance=$total_income-$total_expense;
echo json_encode([
    "total_income"=>$total_income,
    "total_expense"=>$total_expense,
    "balance"=>$balance
]);
?>