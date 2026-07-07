<!DOCTYPE html>
<html>
<head>
<title>View Expense</title>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="dashboard-page">
        <?php
        $currentpage="expense"; 
        include 'includes/navbar.php';?>
        <h1>View Expenses</h1>
    <div id="expensecontain"></div>
    <button id="loadmorebtn">Load More</button>
    </div>
    <div id="modaloverlay" class="Modal-Overlay">
        <div class="modalbox">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete?</p>
        <div class="modalbuttons">
            <button id="cancelbtn">Cancel</button>
            <button id="deletebtn">Delete</button></div>
        </div>
    </div>
    <div id="editoverlay" class="Modal-Overlay">
        <div id="editbox" class="modalbox">
            <h2>Edit Expense</h2>
            <div id="editform"></div>
        <div class="modalbuttons">
            <button id="canceledit">Cancel</button>
            <button id="updateedit">Update</button></div>
        </div>
    </div>
    <?php include 'includes/footer.php'; ?>
    <div id="toastcontainer"></div>
<script src="js/theme.js"></script>
<script src="js/common.js"></script>
<script src="js/expense.js">
</script>
</body>
</html>