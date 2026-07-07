<?php
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../auth/auth.php';
$stmt=$conn->prepare("
select year(expense_date) as year,month(expense_date) as month,sum(amount) as total from expenses where user_id=? group by year(expense_date),month(expense_date) order by year(expense_date),month(expense_date); 
");
$stmt->bind_param("i",$user_id);
$stmt->execute();
$result=$stmt->get_result();
$month=[];
while($row=$result->fetch_assoc()){
    $month[]=$row;
}
echo json_encode($month);
?>