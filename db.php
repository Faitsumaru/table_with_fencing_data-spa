<?php

// Подключаем конфигурацию из файла
$config = include('config.php');

// Используем данные из конфигурационного файла
$connection = [
    "Database" => $config['database'],
    "Uid" => $config['uid'],
    "PWD" => $config['pass'],
    "CharacterSet" => "UTF-8",
];

$conn = sqlsrv_connect($config['serverName'],$connection);

if (!$conn)
    die(print_r(sqlsrv_errors(), true));

?>