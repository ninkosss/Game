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

    <?php
        include 'nav.php'
    ?>


    <h1>Головна сторінка (файл /pages/home.php)</h1>
    <p>
        <?php
            echo "Привіт, " . ($_SESSION['login'] ?? 'КОРИСТУВАЧ НЕ АВТОРИЗОВАНИЙ');
        ?>
    </p>

    <p>
        В файлі scripts/scriptAsync.js є код, що асинхронно додає картинку.
    </p>
    <button id="btn">Додати картинку.</button>
    
    <p>
        Картинка буде в цьому блоці &#8595;
    </p>
    <div id="div" style="list-style:none; display:flex; gap:10px; flex-wrap:wrap;">
        
    </div>

    <script src="./scripts/scriptAsync.js" defer></script>

</body>
</html>