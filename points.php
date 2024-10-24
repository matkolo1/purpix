<?php
session_start();
include './assets/php/config.php';
function getidusers()
{
    return isset($_SESSION['idusers']) ? $_SESSION['idusers'] : null;
}
function updateLevel($idusers, $levelNumber, $points)
{
    global $conn;
    $columnName = "purpix_level_" . $levelNumber;
    $nextLevel = $levelNumber + 1;
    $nextColumnName = "purpix_level_" . $nextLevel;
    if ($columnName === "purpix_level_9") {
        $sql = "UPDATE users_alba_rosa SET $columnName = ? WHERE idusers = ?";
    } else {
        $sql = "UPDATE users_alba_rosa SET $columnName = ?, $nextColumnName = CASE WHEN $nextColumnName = 69 THEN 96 ELSE $nextColumnName END WHERE idusers = ?";
    }
    $points = (int) $points;
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ii", $points, $idusers);
    if ($stmt->execute()) {
        echo "\033[32mRecord updated successfully.\033[0m\n";
        if ($columnName === "purpix_level_9") {
            echo "\033[32mSpecial action for 'purpix_level_9'.\033[0m\n";
        }
    } else {
        echo "\033[31mError updating record: \033[0m\n" . $stmt->error;
    }
    $stmt->close();
}
if (isset($_GET['id'], $_GET['points'])) {
    $levelNumber = $_GET['id'];
    $points = $_GET['points'];
    $idusers = getidusers();
    if ($idusers) {
        updateLevel($idusers, $levelNumber, $points);
        exit();
    } else {
        echo "\033[31mThe user is not logged in.\033[0m\n";
    }
} else {
    echo "\033[31mInvalid or missing 'id' or 'points' parameter in URL.\033[0m\n";
}
$conn->close();
?>