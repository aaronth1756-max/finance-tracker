<?php
$message="";
if(isset($_GET['message'])){
    $message=trim($_GET['message']);
}
else{
    $message="";
}
?>
<!DOCTYPE html>
<html>
<head>
<title>Login</title>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="container">
        <h1>Login</h1>
        <?php
        if($message!==""){
            echo "<p id='success' class='success'>$message</p>";
        }
        ?>
        <p id="all-error" class="error"></p>
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
<button id="loginbtn">Login</button>
<a href="register.php">
    No Account?Register here
</a>
</div>
<div id="toastcontainer"></div>
<script src="js/theme.js"></script>
<script src="js/common.js"></script>
<script src="js/login.js"></script>
</body>
</html>