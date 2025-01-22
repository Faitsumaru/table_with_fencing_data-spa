<?php
function fetchData($sql, $filterSemeystvo = null) {
    require('db.php');

    if ($filterSemeystvo && $filterSemeystvo !== 'all') {
        $sql .= " WHERE semeystvo = ?";
    }

    $stmt = sqlsrv_query($conn, $sql, $filterSemeystvo ? [$filterSemeystvo] : null);

    if (!$stmt) {
        error_log('SQL Error: ' . print_r(sqlsrv_errors(), true));
        return [];
    }

    $arr = array();

    while ($obj = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
        $arr[] = $obj;
    }

    sqlsrv_free_stmt($stmt);
    sqlsrv_close($conn);

    return $arr;
}

function getUniqueSemeystvo() {
    require('db.php');

    $sql = "SELECT DISTINCT semeystvo FROM ogrageniya_ispytaniya";
    $stmt = sqlsrv_query($conn, $sql);

    if (!$stmt) {
        error_log('SQL Error: ' . print_r(sqlsrv_errors(), true));
        return [];
    }

    $semeystva = [];
    while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
        $semeystva[] = $row['semeystvo'];
    }

    sqlsrv_free_stmt($stmt);
    sqlsrv_close($conn);

    return $semeystva;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Получаем значение фильтра
    $filterSemeystvo = $_POST['semeystvo'] ?? 'all';

    // Получаем данные из базы
    $data = fetchData('SELECT * FROM ogrageniya_ispytaniya', $filterSemeystvo);

    // Генерируем HTML-строки таблицы
    if (!empty($data)) {
        foreach ($data as $index => $row) {
            echo "<tr>";
            echo "<td>" . ($index + 1) . "</td>";
            echo "<td>" . htmlspecialchars($row['semeystvo'] ?? '') . "</td>";
            echo "<td>" . htmlspecialchars($row['tip_ispytaniya'] ?? '') . "</td>";
            echo "<td>" . htmlspecialchars($row['markirovka'] ?? '') . "</td>";
            echo "<td>" . htmlspecialchars($row['profil_stoyki'] ?? '') . "</td>";
            echo "<td>" . htmlspecialchars($row['konsol'] ?? '') . "</td>";
            echo "<td>" . htmlspecialchars($row['profil_balki'] ?? '') . "</td>";
            echo "<td>" . htmlspecialchars($row['kol_vo_balok'] ?? '') . "</td>";
            echo "<td>" . htmlspecialchars($row['tolshina_balki'] ?? '') . "</td>";
            echo "<td>" . htmlspecialchars($row['tolshina_stoyki'] ?? '') . "</td>";
            echo "</tr>";
        }
    } else {
        echo "<tr><td colspan='10'>Нет данных для отображения</td></tr>";
    }
}

?>