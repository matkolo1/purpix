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
    <link rel="stylesheet" href="./assets/css/style.css">
    <link rel="icon" href="./assets/images/icon.png" type="image/x-icon">
    <link rel="shortcut icon" href="./assets/images/icon.png" type="image/x-icon">
    <title>Alba-rosa.cz | PurPix</title>
    <style>
    </style>
</head>
<body>
    <div id="contentContainer">
        <div id="loginForm" style="float: left; margin-right: 10px;">
            <?php
            include './assets/php/config.php';
            // Získání aktuálního uživatele
            $currentUser = isset($_SESSION['username']) ? $_SESSION['username'] : '';
            // Příklad pro vytvoření tabulky s možností skrolování
            echo '<div style="height: 300px; overflow-y: auto;">'; // Nastavte výšku podle potřeby
            echo '<table>';
            echo '<tr><th></th><th>Název</th><th>Aktuální Skóre</th></tr>';
            // Získání uživatelských dat z databáze a řazení podle aktuálního skóre sestupně
            $sql = "SELECT id, username,
    COALESCE(SUM(CASE WHEN level_1 NOT IN (69, 96) THEN level_1 ELSE 0 END), 0) +
    COALESCE(SUM(CASE WHEN level_2 NOT IN (69, 96) THEN level_2 ELSE 0 END), 0) +
    COALESCE(SUM(CASE WHEN level_3 NOT IN (69, 96) THEN level_3 ELSE 0 END), 0) +
    COALESCE(SUM(CASE WHEN level_4 NOT IN (69, 96) THEN level_4 ELSE 0 END), 0) +
    COALESCE(SUM(CASE WHEN level_5 NOT IN (69, 96) THEN level_5 ELSE 0 END), 0) +
    COALESCE(SUM(CASE WHEN level_6 NOT IN (69, 96) THEN level_6 ELSE 0 END), 0) +
    COALESCE(SUM(CASE WHEN level_7 NOT IN (69, 96) THEN level_7 ELSE 0 END), 0) +
    COALESCE(SUM(CASE WHEN level_8 NOT IN (69, 96) THEN level_8 ELSE 0 END), 0) +
    COALESCE(SUM(CASE WHEN level_9 NOT IN (69, 96) THEN level_9 ELSE 0 END), 0) AS total_score
FROM users 
GROUP BY id, username 
ORDER BY total_score DESC";
            $result = $conn->query($sql);
            // Počítadlo pro medaile
            $medalCount = 0;
            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    $userId = $row['id'];
                    $username = $row['username'];
                    $currentScore = $row['total_score'];
                    // Zvýraznit přihlášeného uživatele
                    $highlight = ($username == $currentUser) ? 'style="background-color: white; color: black;"' : '';
                    // Zvýšit počet medailí
                    $medalCount++;
                    // Přidat medaili před jméno prvních tří uživatelů
                    $medal = getMedalIcon($medalCount);
                    // Vytisknout řádek tabulky
                    echo "<tr $highlight><td>$medalCount $medal</td><td> $username</td><td>$currentScore</td></tr>";
                }
            } else {
                echo "Žádní uživatelé nenalezeni.";
            }
            echo '</table>';
            echo '</div>';
            // Uzavřít připojení k databázi
            $conn->close();
            // Funkce pro získání ikony medaile
            function getMedalIcon($position)
            {
                switch ($position) {
                    case 1:
                        return '🥇';
                    case 2:
                        return '🥈';
                    case 3:
                        return '🥉';
                    default:
                        return '';
                }
            }
            ?>
        </div>
    </div>
    <script>
        function openLink(level) {
            window.location.href = "./" + level;
        }
    </script>
</body>
</html>