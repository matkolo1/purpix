<?php
session_start(); // Pokud ještě není spuštěná session
include './assets/php/config.php'; // Zahrnuje soubor s připojením k databázi

// Funkce pro získání uživatelského ID z aktuální session
function getUserId() {
    return isset($_SESSION['user_id']) ? $_SESSION['user_id'] : null;
}

// Funkce pro aktualizaci hodnoty levelu pro dané uživatelské ID a číslo levelu
function updateLevel($userId, $levelNumber) {
    global $conn;

    $columnName = "level_" . $levelNumber;

    // Zvýšení hodnoty o +1
    $nextLevel = $levelNumber + 1;
    $nextColumnName = "level_" . $nextLevel;

    // Aktualizace hodnoty v tabulce 'users'
    $sql = "UPDATE users SET $columnName = 0, $nextColumnName = 96 WHERE id = ?";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $userId);

    if ($stmt->execute()) {
        echo "Record updated successfully";
    } else {
        echo "Error updating record: " . $stmt->error;
    }

    $stmt->close();
}

// Získání hodnoty 'id' z URL
if (isset($_GET['id'])) {
    $levelNumber = $_GET['id'];

    // Získání uživatelského ID z aktuální session
    $userId = getUserId();

    // Kontrola, zda je uživatel přihlášen
    if ($userId) {
        // Aktualizace hodnoty levelu pro dané uživatelské ID
        updateLevel($userId, $levelNumber);

        // Zavření okna nebo záložky
        echo '<script>window.close();</script>';
        exit();
    } else {
        echo "Uživatel není přihlášen.";
    }
} else {
    echo "Neplatný nebo chybějící 'id' parametr v URL.";
}

// Uzavření připojení k databázi
$conn->close();
?>
