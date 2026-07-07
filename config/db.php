<?php
$servername = getenv("MYSQLHOST") ?: "localhost";
$username   = getenv("MYSQLUSER") ?: "root";
$password   = getenv("MYSQLPASSWORD") ?: "";
$database   = getenv("MYSQLDATABASE") ?: "finance_tracker";
$port       = getenv("MYSQLPORT") ?: 3306;
$conn=new mysqli($servername,$username,$password,$database,$port);
if($conn->connect_error){
    die("Connection failed".
    $conn->connect_error);

}
?>