# Використовуємо офіційний PHP-образ
FROM php:8.2-apache

# Увімкнення mod_rewrite для роботи з .htaccess
RUN a2enmod rewrite

# Копіюємо файли в контейнер
COPY . /var/www/html/

# Встановлюємо права доступу
RUN chown -R www-data:www-data /var/www/html

# Відкриваємо порт 80
EXPOSE 80
