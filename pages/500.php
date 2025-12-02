<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= htmlspecialchars($title ?? 'Сторінка', ENT_QUOTES, 'UTF-8') ?></title>
    <link rel="stylesheet" href="./styles/style.css">

    <!-- Favicon базовий -->
    <link rel="icon" href="./images/icons/favicon.ico" sizes="any">

    <!-- PNG-іконки для браузерів -->
    <link rel="icon" type="image/png" sizes="16x16" href="./images/icons/favicon-16x16.png">
    <link rel="icon" type="image/png" sizes="32x32" href="./images/icons/favicon-32x32.png">

    <!-- Apple Touch Icon (для iOS / iPadOS) -->
    <link rel="apple-touch-icon" sizes="180x180" href="./images/icons/apple-touch-icon.png">

    <!-- Android / PWA -->
    <link rel="manifest" href="./images/icons/site.webmanifest">

    <!-- Тема і колір плитки для Windows -->
    <meta name="theme-color" content="#ffffff">
    <meta name="msapplication-TileColor" content="#ffffff">
</head>
<body>
    <h1>500 Internal Server Error</h1><p>Файл сторінки не знайдено.</p>
    <a href="/">Повернутись на головну</a>
</body>
</html>