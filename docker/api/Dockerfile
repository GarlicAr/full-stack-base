FROM php:8.2-fpm-alpine AS base

RUN apk add --no-cache curl \
 && curl -sS https://getcomposer.org/installer | php \
 && mv composer.phar /usr/local/bin/composer \
 && chmod +x /usr/local/bin/composer

RUN apk add --no-cache \
        bash icu-dev libpq-dev git unzip libzip-dev \
    && docker-php-ext-install intl pdo_pgsql opcache zip bcmath

FROM composer:2.7 AS vendor
WORKDIR /app
COPY composer.json composer.lock ./
RUN composer install --prefer-dist --no-interaction --no-scripts

FROM base AS build
WORKDIR /var/www/html
COPY --from=vendor /app/vendor ./vendor
COPY . .
RUN chown -R www-data:www-data storage bootstrap/cache

FROM base
WORKDIR /var/www/html
COPY --from=build /var/www/html ./
EXPOSE 9000
CMD ["php-fpm", "-y", "/usr/local/etc/php-fpm.conf", "-R"]
