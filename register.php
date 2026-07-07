<!DOCTYPE html>
<html>
<head>
<title>Register</title>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<link rel="stylesheet" href="css/style.css">
</head>
<body>
    
    <div class="container">
        <h1>Create Account</h1>
        <p id="all-error" class="error"></p>
        <div class="form-group">
            <label>Username</label>
            <input type="text" id="username" placeholder="Enter username">
            <p id="username-error" class="error"></p>
</div>
        <div class="form-group">
            <label>Email</label>
            <input type="email" id="email" placeholder="Enter email">
            <p id="email-error" class="error"></p>
</div>
<div class="form-group">
            <label>Password</label>
            <input type="password" id="password" placeholder="Enter password">
            <p id="password-error" class="error"></p>
</div>
<button id="registerbtn">Register</button>
<a href="login.php">
    Already have an account?Login instead
</a>
</div>
<div id="toastcontainer"></div>
<script src="js/theme.js"></script>
<script src="js/common.js"></script>
<script src="js/register.js"></script>
</body>
</html>