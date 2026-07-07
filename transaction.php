<!DOCTYPE html>
<html>
<head>
<title>Transactions</title>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="dashboard-page">
        <?php
        $currentpage="trans"; 
        include 'includes/navbar.php';?>
        <h1 id="trans">All Transactions</h2>
<div class="transactions-section">
    <div class="transaction-toolbar">
    <div class="inputcenter">
    <input id="searchinput" placeholder="SearchTransactions...." type="text">
</div>
    <div class="sortwrapper">
    <select id="sortSelect">
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="highestamount">Highest Amount</option>
        <option value="lowestamount">Lowest Amount</option>
    </select>
</div>
<div class="exports">
    <button id="exportcsv">📃Export CSV</button>
    <button id="exportpdf">📃Export PDF</button>
</div>
    </div>
    <div id="transcontain"></div>
    ̌<button id="loadmorebtn">Load More</button>
</div>
</div> 
<?php include 'includes/footer.php'; ?>
<div id="toastcontainer"></div>
<script src="js/theme.js"></script>
<script src="js/common.js"></script>
<script src="js/transaction.js">
</script>
</body>
</html>