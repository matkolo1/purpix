<?php
include './assets/php/config.php';
session_start();
if (!isset($_SESSION['user_id'])) {
    header("Location: ./index.php");
    exit();
}
if (isset($_POST['logout'])) {
    session_unset();
    session_destroy();
    header("Location: ./index.php");
    exit();
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./assets/css/lvl_style.css">
</head>

<body>
    <form method="post">
        <button type="submit" name="logout">Odhlásit
            se</button>
    </form>
    <canvas id="gameCanvas"></canvas>

    <script src="../assets\js\lvl1_script.js"></script>

</body>

</html>