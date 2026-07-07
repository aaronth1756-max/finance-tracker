<!DOCTYPE html>
<html>
<head>
<title>Add Income</title>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="dashboard-page">  
        <?php
        $currentpage="aincome"; 
        include 'includes/navbar.php';?>
    <div class="formcontainereic">
    <h1>Add Income</h1>
    <input type="text" placeholder="Income title" id="title"><br><br>
    <input type="number" placeholder="Amount" id="amount"><br><br>
    <input type="date" id="date"><br><br>
    <button id="incomebtn">
        Add Income
    </button>
</div>
</div>
<?php include 'includes/footer.php'; ?>
<div id="toastcontainer"></div>
<script src="js/theme.js"></script>
<script src="js/common.js"></script>
<script src="js/add_income.js"></script>
</body>
</html>