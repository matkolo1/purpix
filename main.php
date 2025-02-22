<?php
include './assets/php/config.php';
session_start();
if (!isset($_SESSION['idusers'])) {
    header("Location: ./index.php");
    exit();
}
if (isset($_POST['logout'])) {
    // Získání ID uživatele, který se odhlašuje
    $idusers = $_SESSION['idusers'];

    // Uložení odhlášení do tabulky logouts
    $insertLogout = $conn->prepare("INSERT INTO logouts_alba_rosa_purpix (idusers) VALUES (?)");
    $insertLogout->bind_param("i", $idusers);
    $insertLogout->execute();
    $insertLogout->close();

    // Zrušení relace a přesměrování na úvodní stránku
    session_unset();
    session_destroy();
    header("Location: ./index.php");
    exit();
}
$idusers = $_SESSION['idusers'];
$stmt = $conn->prepare("SELECT username FROM users_alba_rosa WHERE idusers = ?");
$stmt->bind_param("i", $idusers);
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
    <link rel="stylesheet" href="./assets/css/style.css">
    <link rel="icon" href="./assets/images/icon.png" type="image/x-icon">
    <link rel="shortcut icon" href="./assets/images/icon.png" type="image/x-icon">
    <title>Alba-rosa.cz | Purpix</title>
    <style>
    </style>
</head>

<body>
    <?php
    include './assets/php/config.php';

    // Získání dat o uživateli
    $idusers = $_SESSION['idusers'];
    $sqlUser = "SELECT * FROM users_alba_rosa WHERE idusers = ?";
    $stmtUser = $conn->prepare($sqlUser);
    $stmtUser->bind_param("i", $idusers);
    $stmtUser->execute();
    $resultUser = $stmtUser->get_result();
    $userData = $resultUser->fetch_assoc();
    $stmtUser->close();

    // Získání aktuálního skóre
    $currentScore = 0;
    foreach ($userData as $columnName => $columnValue) {
        if (strpos($columnName, 'purpix_level_') === 0 && $columnValue != 69 && $columnValue != 96) {
            $currentScore += $columnValue;
        }
    }
    ?>
    <div id="loginForm"
        style="position: fixed; bottom: 10px; left: 10px; width: 300px; height: auto; margin-bottom: 5px;">
        <div class="lobby" style="width: 100%;"><b>Vítejte v Purpixu! &#x2B50;</b><br> Tady máte šanci ovládat malého
            červeného kamaráda, který má za úkol co nejrychleji dorazit do cíle. <br>Při Vaší cestě můžete navíc sbírat
            spoustu drobných pokladů - peníze! <br>Samozřejmě, aby to nebylo tak jednoduché, čekají Vás i různé
            překážky,
            takže pozor, ať Váš čtvereček nepřijde o cestu k vítězství! &#x1F3C6;&#x1F579;&#x1F680;<br></div>
    </div>
    <div id="gameTitle">Purpix</div>
    <div id="loginForm">
        <div class="lobby"><b>Přihlášen jako</b>:
            <?php echo $userData['username']; ?><br>
        </div>
        <div class="lobby"><b> Aktuální skóre:</b>
            <?php echo $currentScore; ?><br>
        </div>
        <div class="lobby"> <b> Úrovně: </b>
            <?php
            foreach ($userData as $columnName => $columnValue) {
                if (strpos($columnName, 'purpix_level_') === 0) {
                    $levelNumber = substr($columnName, 13);
                    $levelName = ucfirst(str_replace('_', ' ', $levelNumber));
                    if ($columnValue == 69) {
                        echo "<button class='level-button disabled' disabled>$levelName</button>";
                    } elseif ($columnValue == 0) {
                        $foundZero = true;
                        echo "<button class='level-button lost' onclick='openLink(\"$levelName\")'>$levelName</button>";
                    } elseif ($columnValue >= 1 && $columnValue < 96) {
                        echo "<button class='level-button win' onclick='openLink(\"$levelName\")'>$levelName</button>";
                    } elseif ($columnValue == 96) {
                        echo "<button class='level-button active' onclick='openLink(\"$levelName\")'>$levelName</button>";
                    }
                }
            }
            ?>
        </div>
        <form method="post">
            <input type="submit" name="logout" value="Odhlásit se">
        </form>
    </div>

    <div id="creditsForm"
        style="background-color: #1C2833; color: white; padding: 10px; border-radius: 10px; text-align: left; opacity: 0; animation: slideIn 0.3s forwards 0.3s; margin-top: 5px;">
        <div class="lobby"><b>Na tvorbě hry spolupracovali:</b><br>Matěj Kořalka<br>Matěj Beránek<br>Jiří Boucník</div>
    </div>

    <?php $conn->close(); ?>
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
    <script>
        function openLink(level) {
            window.location.href = "./" + level;
        }
    </script>
</body>

</html>