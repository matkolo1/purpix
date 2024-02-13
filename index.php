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

        // Uložení přihlášení do tabulky logins
        $insertLogin = $conn->prepare("INSERT INTO logins (user_id) VALUES (?)");
        $insertLogin->bind_param("i", $userId);
        $insertLogin->execute();
        $insertLogin->close();

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
    <title>Alba-rosa.cz | Purpix</title>
</head>

<body>
    <div id="gameTitle">Purpix</div>
    <div id="loginForm">
        <div class="lobby"><b>Přihlášení</b></div>
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

    <div id="creditsForm"
        style="background-color: #1C2833; color: white; padding: 10px; border-radius: 10px; text-align: left; opacity: 0; animation: slideIn 0.3s forwards 0.3s; margin-top: 5px;">
        <div class="lobby"><b>Na tvorbě hry spolupracovali:</b><br>Matěj Kořalka<br>Matěj Beránek<br>Jiří Boucník</div>
    </div>


    <script>
        document.addEventListener('contextmenu', preventDefault);
        document.addEventListener('keydown', preventKeyCombination);
        function preventDefault(e) {
            e.preventDefault();
        }

        function preventKeyCombination(e) {
            if (e.key === 'F12' || (e.ctrlKey && e.key === 'u')) {
                e.preventDefault();
            }
        }

    </script>
</body>

</html>