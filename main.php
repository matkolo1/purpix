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
    <link rel="stylesheet" href="./assets/css/main_style.css">
</head>

<body>
    <div style="color: white;">
        <?php
        echo "Uživatelské jméno: $username";
        ?><br>
        Levely:<br>
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
                $disabled = ($columnValue == 69) ? 'disabled' : '';
                $levelName = ucfirst(str_replace('_', ' ', $matches[1]));
                echo "<button type='button' $disabled onclick='window.open(\"./$levelName\", \"_blank\")'>$levelName</button>";
            }
        }
        $conn->close();
        ?>
        <script>
            function openLink(level) {
                window.open("./" + level, "_blank");
            }
        </script>
    </div>
    <form method="post">
        <button type="submit" name="logout">Odhlásit
            se</button>
    </form>
</body>

</html>