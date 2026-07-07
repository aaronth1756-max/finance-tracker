<nav class="navbar">
    <div class="nav-top">
    <div class="logo">
        Finance Tracker
</div>
<button class="menu-toggle" id="menutoggle">☰</button>
</div>
<div class="mobile-menu">
<ul class="nav-links">
    <li><a href="dashboard.php" class="<?= $currentpage=="dashboard" ? "active" : "" ?>">Dashboard</a></li>
    <li><a href="expenses.php" class="<?= $currentpage=="expense" ? "active" : "" ?>">Expenses</a></li>
    <li><a href="view_income.php" class="<?= $currentpage=="income" ? "active" : "" ?>">Incomes</a></li>
    <li><a href="transaction.php" class="<?= $currentpage=="trans" ? "active" : "" ?>">Transactions</a></li>
    <li><a href="add_expense.php" class="<?= $currentpage=="aexpense" ? "active" : "" ?>">+ Expense</a></li>
    <li><a href="add_income.php" class="<?= $currentpage=="aincome" ? "active" : "" ?>">+ Income</a></li>
    <li><a href="categories.php" class="<?= $currentpage=="cat" ? "active" : "" ?>">+ Category</a></li>
    <li><a href="set_budget.php" class="<?= $currentpage=="budget" ? "active" : "" ?>">Budget</a></li>
</ul>
<div class="nav-right">
    <button id="logout">Logout</button>
    <button id="themebtn">🌙Dark Mode</button>
</div>
</div>
</nav>
<script src="js/navbar.js"></script>