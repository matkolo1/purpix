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
        #contentContainer {
            display: flex;
            overflow-x: auto;
        }

        .tableContainer {
            margin-right: 10px;
            flex-shrink: 0;
            max-width: 300px;
            /* Maximální šířka jedné tabulky */
        }

        table {
            color: #ffffff;
            /* Šedé ohraničení tabulky */
            width: 100%;
            /* Šířka 100% */
            background-color: #000000;
            /* Černé pozadí tabulky */
            border-collapse: collapse;
            /* Odstranění mezery mezi buňkami */
            max-height: 320px;
            /* Maximální výška tabulky */
            overflow-y: auto;
            /* Přidání scrollování, pokud přesáhne maximální výšku */
        }

        th,
        td,
        tr {
            /* Šedé ohraničení buněk */
            padding: 8px;
            text-align: left;
        }

        .highlight {
            background-color: white;
            color: black;
        }
    </style>
</head>

<body>
    <div id="contentContainer">
        <div class="tableContainer">
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Název</th>
                        <th>Přihlášení</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    include './assets/php/config.php';
                    $currentUser = isset($_SESSION['username']) ? $_SESSION['username'] : '';
                    $sql = "SELECT id, username,
        COALESCE(SUM(CASE WHEN level_1 NOT IN (69, 96) THEN level_1 ELSE 0 END), 0) +
        COALESCE(SUM(CASE WHEN level_2 NOT IN (69, 96) THEN level_2 ELSE 0 END), 0) +
        COALESCE(SUM(CASE WHEN level_3 NOT IN (69, 96) THEN level_3 ELSE 0 END), 0) +
        COALESCE(SUM(CASE WHEN level_4 NOT IN (69, 96) THEN level_4 ELSE 0 END), 0) +
        COALESCE(SUM(CASE WHEN level_5 NOT IN (69, 96) THEN level_5 ELSE 0 END), 0) +
        COALESCE(SUM(CASE WHEN level_6 NOT IN (69, 96) THEN level_6 ELSE 0 END), 0) +
        COALESCE(SUM(CASE WHEN level_7 NOT IN (69, 96) THEN level_7 ELSE 0 END), 0) +
        COALESCE(SUM(CASE WHEN level_8 NOT IN (69, 96) THEN level_8 ELSE 0 END), 0) +
        COALESCE(SUM(CASE WHEN level_9 NOT IN (69, 96) THEN level_9 ELSE 0 END), 0)  AS total_score
    FROM users 
    GROUP BY id, username 
    ORDER BY total_score DESC";
                    $result = $conn->query($sql);
                    $medalCount = 0;

                    if ($result !== false) {
                        if ($result->num_rows > 0) {
                            while ($row = $result->fetch_assoc()) {
                                $userId = $row['id'];
                                $username = $row['username'];
                                $currentScore = $row['total_score'];
                                $highlight = ($username == $currentUser) ? 'highlight' : '';
                                $medalCount++;
                                $medal = getMedalIcon($medalCount);
                                echo "<tr class='$highlight'><td>$medalCount $medal</td><td> $username</td><td>$currentScore</td></tr>";
                            }
                        } else {
                            echo "<tr><td colspan='3'>Žádní uživatelé nenalezeni.</td></tr>";
                        }
                    } else {
                        echo "Chyba v dotazu: " . $conn->error;
                    }

                    echo '</table>';
                    $conn->close();
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
                </tbody>
            </table>
        </div>
        <div class="tableContainer">
            <table>
                <thead>
                    <tr>
                        <th>Název</th>
                        <th>Přihlášení</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    include './assets/php/config.php';
                    $query = "SELECT users.id, users.username, GROUP_CONCAT(logins.time SEPARATOR '<br>') AS login_times
                        FROM users
                        LEFT JOIN logins ON users.id = logins.user_id
                        GROUP BY users.id, users.username
                        ORDER BY MAX(logins.time) DESC";
                    $result = $conn->query($query);
                    if ($result->num_rows > 0) {
                        while ($row = $result->fetch_assoc()) {
                            echo "<tr>";
                            echo "<td>{$row['username']}</td>";
                            echo "<td>{$row['login_times']}</td>";
                            echo "</tr>";
                        }
                    } else {
                        echo "<tr><td colspan='2'>Žádní admini přihlášení.</td></tr>";
                    }
                    $conn->close();
                    ?>
                </tbody>
            </table>
        </div>
        <div class="tableContainer">
            <table>
                <thead>
                    <tr>
                        <th>Název</th>
                        <th>Odhlášení</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    include './assets/php/config.php';
                    $query = "SELECT users.id, users.username, GROUP_CONCAT(logouts.time SEPARATOR '<br>') AS logout_times
                        FROM users
                        LEFT JOIN logouts ON users.id = logouts.user_id
                        GROUP BY users.id, users.username
                        ORDER BY MAX(logouts.time) DESC";
                    $result = $conn->query($query);
                    if ($result->num_rows > 0) {
                        while ($row = $result->fetch_assoc()) {
                            echo "<tr>";
                            echo "<td>{$row['username']}</td>";
                            echo "<td>{$row['logout_times']}</td>";
                            echo "</tr>";
                        }
                    } else {
                        echo "<tr><td colspan='2'>Žádní admini odhlášení.</td></tr>";
                    }
                    $conn->close();
                    ?>
                </tbody>
            </table>
        </div>
    </div>
</body>

</html>