FROM php:8.2-fpm

WORKDIR /var/www

RUN apt-get update && apt-get install -y \
    zip unzip git curl libpng-dev libonig-dev libxml2-dev \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

COPY . .

RUN composer install

# Permissões
RUN chown -R www-data:www-data /var/www \
    && chmod -R ug+w /var/www/storage /var/www/bootstrap/cache

CMD ["php-fpm"]
