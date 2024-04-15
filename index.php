<?php
include './assets/php/config.php';
session_start();

if (isset($_SESSION['idusers'])) {
    // Uložení přihlášení do tabulky logouts
    $idusers = $_SESSION['idusers'];
    $insertLogout = $conn->prepare("INSERT INTO logins_alba_rosa_purpix (idusers) VALUES (?)");
    $insertLogout->bind_param("i", $idusers);
    $insertLogout->execute();
    $insertLogout->close();
    header("Location: ./main.php");
    exit();
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $enteredEmail = $_POST["email"];
    $enteredPassword = $_POST["password"]; // Získání zadaného hesla z formuláře

    // Získání uživatele z databáze podle zadaného emailu
    $stmt = $conn->prepare("SELECT idusers, username, password FROM users_alba_rosa WHERE email = ?");
    $stmt->bind_param("s", $enteredEmail);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($userId, $username, $dbPassword); // Změněný název proměnné pro uložení hesla z databáze
        $stmt->fetch();

        // Ověření hesla pomocí password_verify
        if (password_verify($enteredPassword, $dbPassword)) {
            // Heslo je správné, provede se přihlášení
            $_SESSION['idusers'] = $userId;
            $_SESSION['username'] = $username;
            // Uložení přihlášení do tabulky logouts
            $idusers = $_SESSION['idusers'];
            $insertLogout = $conn->prepare("INSERT INTO logins_alba_rosa_purpix (idusers) VALUES (?)");
            $insertLogout->bind_param("i", $idusers);
            $insertLogout->execute();
            $insertLogout->close();
            header("Location: ./main.php");
            exit();
        } else {
            // Heslo není správné
            $loginError = "Nesprávné přihlašovací údaje!";
        }
    } else {
        // Uživatel s daným emailem neexistuje
        $loginError = "Uživatel nenalezen! Zaregistrujte se <a href='http://localhost/alba-rosa.cz/' target='_blank' style='color: #ff0000;'>ZDE</a> a poté se sem vraťte zpět. Kartu nezavírejte!";
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
            <input type="email" name="email" required placeholder="Email">
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