<?php
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../auth/auth.php';
$stmt=$conn->prepare("
select categories.name as name,sum(expenses.amount) as total from expenses join categories on expenses.category_id=categories.id where expenses.user_id=? group by categories.name;
");
$stmt->bind_param("i",$user_id);
$stmt->execute();
$report=[];
$result=$stmt->get_result();
while($row=$result->fetch_assoc()){
    $report[]=$row;
}
echo json_encode($report);
?>