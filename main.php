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
    <div id="loginForm">
        <?php
        echo "<b>Přihlášen jako</b>: $username";
        ?><br>
        <b> Úrovně: </b>
        <?php
        include './assets/php/config.php';
        $userId = $_SESSION['user_id'];
        $sql = "SELECT * FROM users WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $userId);
        $stmt->execute();
        $result = $stmt->get_result();
        $userData = $result->fetch_assoc();
        $stmt->close();

        foreach ($userData as $columnName => $columnValue) {
            if (preg_match('/^level_(\d+)$/', $columnName, $matches)) {
                $levelNumber = $matches[1];
                $levelName = ucfirst(str_replace('_', ' ', $levelNumber));

                // Podmínky pro různé stavy tlačítek
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

        $conn->close();
        ?>
        <form method="post">
            <input type="submit" name="logout" value="Odhlásit se">
        </form>
    </div>
    <script>
        function openLink(level) {
            window.location.href = "./" + level;
        }
    </script>
</body>

</html>