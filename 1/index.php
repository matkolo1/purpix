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
	<link rel="stylesheet" href="./assets/style.css">
	<link rel="icon" href="../assets/images/icon.png" type="image/x-icon">
    <link rel="shortcut icon" href="../assets/images/icon.png" type="image/x-icon">
    <title>Alba-rosa.cz | Purpix | 1</title>
</head>

<body>
	<canvas id="gameCanvas"></canvas>
	<div class="text" id="itex"></div>
	<div class="cntrl" id="cntrl">
		<input id="input" type="text" />
		<div id="console">
			<div class="info" id="info0"></div>
			<div class="info" id="info1"></div>
			<div class="info" id="info2"></div>
			<div class="info" id="info3"></div>
			<div class="info" id="info4"></div>
			<div class="info" id="info5"></div>
			<div class="info" id="info6"></div>
			<div class="info" id="info7"></div>
			<div class="info" id="info8"></div>
			<div class="info" id="info9"></div>
			<div class="info" id="info10"></div>
			<div class="info" id="info11"></div>
			<div class="info" id="info12"></div>
		</div>
	</div>
	<script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
	<script src="./assets/script.js"></script>


</body>

</html>