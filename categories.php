<!DOCTYPE html>
<html>
<head>
<title>Add Category</title>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="dashboard-page"> 
        <?php
        $currentpage="cat"; 
        include 'includes/navbar.php';?>
    <div class="formcontainereic">
        
    <h1>Add Category</h1>
    <input type="text" placeholder="Category name" id="name"><br><br>
    
    <button id="catbtn">
        Add Category
    </button>
</div>
</div>
<?php include 'includes/footer.php'; ?>
<div id="toastcontainer"></div>
<script src="js/theme.js"></script>
<script src="js/common.js"></script>
<script src="js/add_category.js"></script>
</body>
</html>