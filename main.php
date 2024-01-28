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
</head>

<body>
    <div id="gameTitle">Název hry</div>
    <div id="loginForm">
        <?php
        echo "Přihlášen jako: <b> $username</b>";
        ?><br>
        Úrovně:<br>
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
                if ($columnValue == 69) {
                    $disabled = 'disabled style="margin: 2px; background-color: #fff; border: none; border-radius: 5px; color: #000; transition: background-color 0.3s; font-size:15px; cursor: not-allowed;"';
                    $buttonStyle = '';
                    $hoverScript = '';
                } else {
                    $disabled = '';
                    $buttonStyle = ($columnValue == 0 || $columnValue == 1) ? 'style="margin: 2px;background-color: #1fa232; border: none; border-radius: 5px; color: white; transition: background-color 0.3s; font-size:15px;"' : '';
                    $hoverScript = ($columnValue == 0 || $columnValue == 1) ? "onmouseover=\"this.style.backgroundColor='#238731'\" onmouseout=\"this.style.backgroundColor='#1fa232'\"" : '';
                }
            
                echo "<button type='button' $disabled $buttonStyle $hoverScript onclick='window.open(\"./$levelName\", \"_blank\")'><b>$levelName</b></button>";
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
            window.open("./" + level);
        }
    </script>
</body>

</html>