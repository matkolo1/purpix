<?php
include '../assets/php/config.php';
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

// Získání čísla z URL
$urlNumber = isset($_SERVER['REQUEST_URI']) ? intval(preg_replace('/[^0-9]/', '', $_SERVER['REQUEST_URI'])) : 0;

// Kontrola hodnoty ve sloupci level_XXX
if ($urlNumber > 0) {
	$stmt = $conn->prepare("SELECT level_$urlNumber FROM users WHERE id = ?");
	$stmt->bind_param("i", $userId);
	$stmt->execute();
	$stmt->bind_result($userLevel);
	$stmt->fetch();
	$stmt->close();

	// Ověření, zda je hodnota levelu 69
// Ověření, zda je hodnota levelu 69
	if ($userLevel == 69) {
		header("Location: ../main.php");
		exit();
	}
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" href="./style.css">
	<link rel="icon" href="../assets/images/icon.png" type="image/x-icon">
    <link rel="shortcut icon" href="../assets/images/icon.png" type="image/x-icon">
    <title>PurPix</title>
</head>

<body>
	<canvas id="gameCanvas"></canvas>
	<script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
	<script src="./assets/script.js"></script>


</body>

</html>