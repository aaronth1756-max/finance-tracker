<!DOCTYPE html>
<html>
<head>
<title>Dashboard</title>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="dashboard-page">
        <?php
        $currentpage="dashboard"; 
        include 'includes/navbar.php';?>
    <div class="hero-section">
        <h1>👋Welcome back</h1>
        <p>Track your income, expenses, budgets and reports
        all in one place.</p>
</div>
<div class="quick-actions">
    <h2>⚡Quick Actions</h2>
    <div class="quick-grid">
        <a href="add_expense.php" class="quick-tags"><span>➕Add Expense</span></a>
        <a href="add_income.php" class="quick-tags"><span>💰Add Income</span></a>
        <a href="categories.php" class="quick-tags"><span>📁Add Category</span></a>
        <a href="set_budget.php" class="quick-tags"><span>🎯Set Budget</span></a>
        <a href="transaction.php" class="quick-tags"><span>📊Reports</span></a>
</div>
</div>
    <div id="dashcontain"></div>
    <div class="charts-section">
        <div id="month-chart-box" class="chart-box">
            <h2>Monthly Expense</h2>
            <canvas id="canvas"></canvas>
        </div>
        <div id="cat-chart-box" class="chart-box">
            <h2>Category Breakdown</h2>
            <canvas id="piecanvas"></canvas>
        </div>
    </div>
<div class="transactions-section">
    <div class="transactionheader">
    <h2 id="recent">Recent Transactions</h2>
    <button id="transbutton">View All</button>
    </div>
    <div id="transcontain"></div>
</div>
</div> 
<?php include 'includes/footer.php'; ?>
<div id="toastcontainer"></div>

<script src="js/theme.js"></script>
<script src="js/common.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="js/dashboard.js">
</script>
</body>
</html>