<?php
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../auth/auth.php';
$stmt=$conn->prepare("
(select title,amount,income_date as transaction_date,'income' as type from income where user_id=?)
UNION ALL
(select title,amount,expense_date as transaction_date,'expense' as type from expenses where user_id=?)
order by transaction_date desc limit 5;
");
$stmt->bind_param("ii",$user_id,$user_id);
$stmt->execute();
$transaction=[];
$result=$stmt->get_result();
while($row=$result->fetch_assoc()){
    $transaction[]=$row;
}
echo json_encode($transaction);
?>