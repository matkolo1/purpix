<?php
session_start();

// Kontrola, zda je uživatel přihlášen
if (!isset($_SESSION['user_id'])) {
    header("Location: ./index.php");
    exit();
}

// Připojení k databázi
include './assets/php/config.php';

// Získání uživatelského jména na základě ID
$userId = $_SESSION['user_id'];
$stmt = $conn->prepare("SELECT username FROM users WHERE id = ?");
$stmt->bind_param("i", $userId);
$stmt->execute();
$stmt->bind_result($username);
$stmt->fetch();
$stmt->close();
$conn->close();

?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./assets/css/main_style.css">
</head>

<body>
    <div style="color: white;">
        <?php
        // Vypiš uživatelské jméno
        echo "Uživatelské jméno: $username";
        ?><br>
        Levely:<br>
        <?php
        // Připojení k databázi
        include './assets/php/config.php';

        // Získání uživatelského ID
        $userId = $_SESSION['user_id'];

        // Dotaz na získání hodnot levelů pro daného uživatele
        $sql = "SELECT * FROM users WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $userId);
        $stmt->execute();
        $result = $stmt->get_result();
        $userData = $result->fetch_assoc();
        $stmt->close();

        // Vytvoření tlačítek na základě hodnot levelů
        foreach ($userData as $columnName => $columnValue) {
            // Zkontroluj, zda název sloupce odpovídá vzoru "level_číslo"
            if (preg_match('/^level_(\d+)$/', $columnName, $matches)) {
                // Omezení pro level 69
                $disabled = ($columnValue == 69) ? 'disabled' : '';

                // Převedení prvního písmena na velké a nahrazení podtržítka mezerou
                $levelName = ucfirst(str_replace('_', ' ', $matches[1]));

                // Vytvoření tlačítka s akcí on click
                echo "<button type='button' $disabled onclick='window.open(\"./$levelName\", \"_blank\")'>$levelName</button>";
            }
        }

        // Uzavření připojení k databázi
        $conn->close();
        ?>

        <script>
            function openLink(level) {
                // Kód, který se provede při kliknutí na tlačítko
                window.open("./" + level, "_blank");
            }
        </script>




    </div>
    <form method="post">
        <button type="submit" name="logout">Odhlásit
            se</button>
    </form>
    <script src="./assets/js/main_script.js"></script>

</body>

</html>