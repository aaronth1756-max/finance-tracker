<!DOCTYPE html>
<html>
<head>
<title>Add Expense</title>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="dashboard-page">      
        <?php
        $currentpage="aexpense"; 
        include 'includes/navbar.php';?>
    <div class="formcontainereic">
    <h1>Add Expense</h1>
    <input type="text" placeholder="Expense title" id="title"><br><br>
    <input type="number" placeholder="Amount" id="amount"><br><br>
    <select id="category_id">
    </select>
    <br><br>
    <input type="date" id="date"><br><br>
    <button id="expensebtn">
        Add Expense
    </button>
    
</div>
</div>
<?php include 'includes/footer.php'; ?>
<div id="toastcontainer"></div>
<script src="js/theme.js"></script>
<script src="js/common.js"></script>
<script src="js/add_expense.js"></script>
</body>
</html>