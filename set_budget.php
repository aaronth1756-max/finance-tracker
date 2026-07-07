<!DOCTYPE html>
<html>
<head>
<title>Set Budget</title>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="dashboard-page"> 
        <?php
        $currentpage="budget"; 
        include 'includes/navbar.php';?>
    <div class="formcontainereic">
        
    <h1>Set Budget</h1>
    <form id="budgetform">
    <label>Category</label>
    <select id="category"></select>
    <label>Budget BHD</label>
    <input type="number" placeholder="Enter Budget" id="budget" step="0.01">
    <button type="submit" id="budgetbtn">
        Save Budget
    </button>
</form>
</div>
</div>
<?php include 'includes/footer.php'; ?>
<div id="toastcontainer"></div>
<script src="js/theme.js"></script>
<script src="js/common.js"></script>
<script src="js/set_budget.js"></script>
</body>
</html>