<?php
define(
    "JWT_SECRET_KEY",
    getenv("JWT_SECRET_KEY")
    ?: "my_super_secure_finance_tracker_secret_key_2026_very_long_string"
);
?>