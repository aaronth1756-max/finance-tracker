<?php
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../auth/auth.php';
$stmt=$conn->prepare("
select * from income where user_id=? order by income_date desc;
");
$stmt->bind_param("i",$user_id);
$stmt->execute();
$result=$stmt->get_result();
$incomes=[];
while($row=$result->fetch_assoc()){
    $incomes[]=$row;
}
echo json_encode($incomes);
?>