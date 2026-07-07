<?php
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../auth/auth.php';
$stmt=$conn->prepare("
select expenses.id,expenses.title,expenses.amount,expenses.expense_date,categories.name as category from expenses join categories on expenses.category_id=categories.id where expenses.user_id=? order by expenses.expense_date desc;
");
$stmt->bind_param("i",$user_id);
$stmt->execute();
$result=$stmt->get_result();
$expenses=[];
while($row=$result->fetch_assoc()){
    $expenses[]=$row;
}
echo json_encode($expenses);
?>