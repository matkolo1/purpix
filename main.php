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
    <link rel="stylesheet" href="./assets/css/styles.css">
    <link rel="icon" href="./assets/images/icon.png" type="image/x-icon">
    <link rel="shortcut icon" href="./assets/images/icon.png" type="image/x-icon">
    <title>PurPix</title>
    <style>
    </style>
</head>
<body>
    <div id="gameTitle">PurPix</div>
        <?php
        include './assets/php/config.php';
        $userId = $_SESSION['user_id'];
        $sqlUser = "SELECT * FROM users WHERE id = ?";
        $stmtUser = $conn->prepare($sqlUser);
        $stmtUser->bind_param("i", $userId);
        $stmtUser->execute();
        $resultUser = $stmtUser->get_result();
        $userData = $resultUser->fetch_assoc();
        $stmtUser->close();
        // Získání aktuálního skóre
        $currentScore = 0;
        foreach ($userData as $columnName => $columnValue) {
            if (strpos($columnName, 'level_') === 0 && $columnValue != 69 && $columnValue != 96) {
                $currentScore += $columnValue;
            }
        }
        echo '<div id="loginForm" style="float: left; margin-right: 10px;">';
        echo '<div class="lobby"><b>Přihlášen jako</b>: ' . $userData['username'] . '<br></div>';
        echo '<div class="lobby"><b> Aktuální skóre:</b> ' . $currentScore . '<br></div>';
        echo '<div class="lobby"> <b> Úrovně: </b>';
        foreach ($userData as $columnName => $columnValue) {
            if (strpos($columnName, 'level_') === 0) {
                $levelNumber = substr($columnName, 6);
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
        echo '</div>';
        echo <<<HTML
    <form method="post">
        <input type="submit" name="logout" value="Odhlásit se">
    </form>
HTML;
        echo '</div>';
        $conn->close();
        ?>
    <script>
        function openLink(level) {
            window.location.href = "./" + level;
        }
    </script>
</body>
</html>