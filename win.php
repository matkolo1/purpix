<?php
session_start();
include './assets/php/config.php';

function getUserId()
{
    return isset($_SESSION['user_id']) ? $_SESSION['user_id'] : null;
}
// Funkce pro aktualizaci hodnoty levelu pro dané uživatelské ID a číslo levelu
function updateLevel($userId, $levelNumber, $points)
{
    global $conn;

    $columnName = "level_" . $levelNumber;

    // Zvýšení hodnoty o +1
    $nextLevel = $levelNumber + 1;
    $nextColumnName = "level_" . $nextLevel;

    // Aktualizace hodnoty v tabulce 'users' pouze pokud aktuální hodnota je rovna 69
    $sql = "UPDATE users SET $columnName = ?, $nextColumnName = 96 WHERE id = ? AND $nextColumnName = 69";

    // Převedení $points na číslo a $nextColumnName na řetězec
    $points = (int) $points;

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ii", $points, $userId);

    if ($stmt->execute()) {
        echo "Record updated successfully";
    } else {
        echo "Error updating record: " . $stmt->error;
    }

    $stmt->close();
}




if (isset($_GET['id'], $_GET['points'])) {
    $levelNumber = $_GET['id'];
    $points = $_GET['points'];

    $userId = getUserId();

    if ($userId) {
        updateLevel($userId, $levelNumber, $points);

        echo '<script>window.close();</script>';
        exit();
    } else {
        echo "Uživatel není přihlášen.";
    }
} else {
    echo "Neplatný nebo chybějící 'id' nebo 'points' parametr v URL.";
}

$conn->close();
?>