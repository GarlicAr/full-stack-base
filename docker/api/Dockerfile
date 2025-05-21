# docker/api/Dockerfile
FROM php:8.2-fpm-alpine AS base

RUN apk add --no-cache \
        bash icu-dev libpq-dev git unzip libzip-dev \
    && docker-php-ext-install intl pdo_pgsql opcache zip bcmath
FROM composer:2.7 AS composer

FROM base AS build
COPY --from=composer /usr/bin/composer /usr/bin/composer
WORKDIR /var/www/html

COPY api/composer.* ./
RUN composer install --no-dev --prefer-dist --no-interaction

COPY api ./

FROM base
WORKDIR /var/www/html
COPY --from=build /var/www/html ./

RUN chown -R www-data:www-data storage bootstrap/cache

EXPOSE 9000
CMD ["php-fpm", "-y", "/usr/local/etc/php-fpm.conf", "-R"]
