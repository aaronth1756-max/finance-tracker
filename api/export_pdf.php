<?php
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../auth/auth.php';
require_once __DIR__ . '/../fpdf/fpdf.php';
$pdf=new FPDF();
$pdf->AddPage();
$pdf->SetFont("Arial","B",18);
$pdf->Cell(190,12,"Finance Tracker Report",0,1,"C");
$pdf->Ln(10);
$pdf->SetFont("Arial","B",12);
$pdf->Cell(70,10,"Title",1,0,"C");
$pdf->Cell(35,10,"Type",1,0,"C");
$pdf->Cell(40,10,"Amount",1,0,"C");
$pdf->Cell(45,10,"Date",1,1,"C");
$stmt=$conn->prepare("
(select title,amount,income_date as transaction_date,'income' as type from income where user_id=?)
UNION ALL
(select title,amount,expense_date as transaction_date,'expense' as type from expenses where user_id=?)
order by transaction_date desc;
");
$stmt->bind_param("ii",$user_id,$user_id);
$stmt->execute();
$result=$stmt->get_result();
while($row=$result->fetch_assoc()){
    $pdf->Cell(70,10,$row['title'],1,0,);
$pdf->Cell(35,10,$row['type'],1,0,"C");
$pdf->Cell(40,10,$row['amount'],1,0,"R");
$pdf->Cell(45,10,$row['transaction_date'],1,1,"C");
}
header("Content-Type: application/pdf");
header("Content-Disposition: attachment; filename=transactions.pdf");
$pdf->Output();
?>