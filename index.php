<?php
    include "./action.php"
?>
<?php
    $selectedSemeystvo = isset($_GET['semeystvo']) ? $_GET['semeystvo'] : 'all';

    // Получение данных
    $data = fetchData('SELECT * FROM ogrageniya_ispytaniya', $selectedSemeystvo);
    
    // Получение уникальных семейств
    $semeystva = getUniqueSemeystvo();

    // Инициализация счетчиков
    $virtualTests = 0;
    $physicalTests = 0;

    // Подсчет испытаний
    if (!empty($data) && is_array($data)) {
        foreach ($data as $row) {
            if (isset($row['tip_ispytaniya'])) {
                if ($row['tip_ispytaniya'] === 'вирт.') {
                    $virtualTests++;
                } elseif ($row['tip_ispytaniya'] === 'натур.') {
                    $physicalTests++;
                }
            }
        }
    }

?>


<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Свойства ограждений и видов испытаний</title>

    <link rel="shortcut icon" href="images/favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="css/font.css">
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="css/media.css">

    <script src="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js"></script>
</head>
<body>
    <div class="wrapper">
        <header class="header">
            <div class="container">
                <div class="header-wrapper">
                    <div class="logo">
                        <img src="images/logo.png" alt="НИИ Механики и проблем качества">
                    </div>
                    <nav class="navigation">
                        <a href="main.html">Главная страница</a>
                    </nav>
                    <div class="contact-info">
                        <a href="mailto:office@niimech.ru">office@niimech.ru</a>
                        <span>|</span>
                        <a href="tel:+74991550723" class="tel">8 (499) 155-07-23</a><span>|</span>
                    </div>
                </div>
            </div>
        </header>

        <main class="main-content">
            <div class="container">
                <h1 class="main-title">СВОЙСТВА ОГРАЖДЕНИЙ И ВИДОВ ИСПЫТАНИЙ</h1>
                
                <div class="filters">
                    <label for="family-select">Семейство:</label>
                    <div class="select-wrapper">
                        <form method="GET" action="index.php">
                            <select id="family-select" name="semeystvo" class="btn" onchange="this.form.submit()">
                                <option value="all" <?= $selectedSemeystvo === 'all' ? 'selected' : '' ?>>Все</option>
                                <?php foreach ($semeystva as $semeystvo): ?>
                                    <option value="<?= htmlspecialchars($semeystvo) ?>" <?= $selectedSemeystvo === $semeystvo ? 'selected' : '' ?>>
                                        <?= htmlspecialchars($semeystvo) ?>
                                    </option>
                                <?php endforeach; ?>
                            </select>
                        </form>
                    </div>
                    <button class="btn load" id="load-data-btn">Загрузить данные</button>
                    <button class="btn save">Сохранение</button>
                </div>

                <table class="data-table">
                <thead>
                    <tr>
                        <th data-column="id" data-order="asc">№</th>
                        <th data-column="semeystvo" data-order="asc">Семейство</th>
                        <th data-column="tip_ispytaniya" data-order="asc">Тип испытания</th>
                        <th data-column="markirovka" data-order="asc">Маркировка</th>
                        <th data-column="profil_stoyki" data-order="asc">Профиль стойки</th>
                        <th data-column="konsol" data-order="asc">Консоль</th>
                        <th data-column="profil_balki" data-order="asc">Профиль балки</th>
                        <th data-column="kol_balok" data-order="asc">Кол-во балок по высоте</th>
                        <th data-column="tol_balki" data-order="asc">Толщина балки</th>
                        <th data-column="tol_stoyki" data-order="asc">Толщина стойки</th>
                    </tr>
                </thead>
                    <tbody>
                        <tr><td colspan='10' class="noData">Нет данных для отображения</td></tr>
                            <!--
                                <?php if (!empty($data) && is_array($data)): ?>
                                <?php foreach ($data as $row): ?>
                                    <tr>
                                        <td><?= htmlspecialchars($row['id']) ?></td>
                                        <td><?= htmlspecialchars(string: $row['semeystvo']) ?></td>
                                        <td><?= htmlspecialchars($row['tip_ispytaniya']) ?></td>
                                        <td><?= htmlspecialchars($row['markirovka']) ?></td>
                                        <td><?= htmlspecialchars($row['profil_stoyki']) ?></td>
                                        <td><?= htmlspecialchars($row['konsol']) ?></td>
                                        <td><?= htmlspecialchars($row['profil_balki']) ?></td>
                                        <td><?= htmlspecialchars($row['kol_vo_balok']) ?></td>
                                        <td><?= htmlspecialchars($row['tolshina_balki']) ?></td>
                                        <td><?= htmlspecialchars($row['tolshina_stoyki']) ?></td>
                                    </tr>
                                <?php endforeach; ?>
                            <?php else: ?>
                                <tr>
                                    <td colspan="7">Нет данных для отображения</td>
                                </tr>
                            <?php endif; ?> 
                            -->
                    </tbody>
                </table>
                
                <div class="statistics" id="statistics" style="display: none;">
                    <p>Количество ограждений: <span class="highlight"><?= count($data) ?></span></p>
                    <p>Натурных испытаний: <span class="highlight"><?= $physicalTests ?></span></p>
                    <p>Виртуальных испытаний: <span class="highlight"><?= $virtualTests ?></span></p>
                </div>
            </div>
        </main>

        <footer class="footer">
            <div class="container">
                <div class="footer-wrapper">
                    <p><span class="icon">
                        <img src="images/addressIcon.svg" alt="icon">
                    </span> 125319, г. Москва, Ленинградский проспект, 64</p>
                    <p><span class="icon">
                        <img src="images/mailIcon.svg" alt="icon">
                    </span> office@niimech.ru</p>
                    <p><span class="icon">
                        <img src="images/telIcon.svg" alt="icon">
                    </span> 8 (499) 155-07-23</p>    
                </div>

                <p class="copy">&copy; ООО МиПК 2023. Все права защищены.</p>
            </div>
        </footer>

    </div>

    <script src="js/table.js"></script>
</body>
</html>