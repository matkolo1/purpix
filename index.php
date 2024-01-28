<?php
include './assets/php/config.php';
session_start();
if (isset($_SESSION['user_id'])) {
    header("Location: ./main.php");
    exit();
}
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $enteredUsername = $_POST["username"];
    $enteredPassword = $_POST["password"];
    $stmt = $conn->prepare("SELECT id, username FROM users WHERE username = ? AND password = ?");
    $stmt->bind_param("ss", $enteredUsername, $enteredPassword);
    $stmt->execute();
    $stmt->store_result();
    if ($stmt->num_rows > 0) {
        $stmt->bind_result($userId, $username);
        $stmt->fetch();
        $_SESSION['user_id'] = $userId;
        $_SESSION['username'] = $username;
        header("Location: ./main.php");
        exit();
    } else {
        $loginError = "Nesprávné přihlašovací údaje!";
    }
    $stmt->close();
}
$conn->close();
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./assets/css/style.css">
    <link rel="icon" href="./assets/images/icon.png" type="image/x-icon">
    <link rel="shortcut icon" href="./assets/images/icon.png" type="image/x-icon">
    <title>PurPix</title>
</head>

<body>
    <div id="gameTitle">PurPix</div>
    <div id="loginForm">
        <h2>Přihlášení</h2>
        <?php
        if (isset($loginError)) {
            echo '<div style="color: #ff0000;"><b>' . $loginError . '</b></div>';
        }
        ?>
        <form method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>">
            <input type="text" name="username" required placeholder="Uživatelské jméno">
            <br>
            <input type="password" name="password" required placeholder="Heslo">
            <br>
            <input type="submit" value="Přihlásit se">
        </form>
    </div>
</body>

</html>