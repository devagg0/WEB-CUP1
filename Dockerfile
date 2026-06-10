# ==========================================
# Stage 1: Build the React frontend
# ==========================================
FROM node:20-alpine AS frontend-builder
WORKDIR /app
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ .
# Enlazar con rutas relativas al mismo host en producción
ENV VITE_API_URL=/api
ENV VITE_STORAGE_BASE_URL=""
RUN npm run build

# ==========================================
# Stage 2: Build the Laravel backend with Apache
# ==========================================
FROM php:8.2-apache AS production

# Instalar dependencias de PostgreSQL y PHP
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql

# Habilitar el módulo rewrite de Apache
RUN a2enmod rewrite

# Configurar Apache DocumentRoot a la carpeta /public de Laravel
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Copiar el código del backend
COPY backend/ .

# Copiar los recursos compilados del frontend a la carpeta pública de Laravel
COPY --from=frontend-builder /app/dist /var/www/html/public

# Instalar dependencias de Composer sin desarrollo
ENV COMPOSER_ALLOW_SUPERUSER=1
RUN composer install --no-dev --optimize-autoloader

# Asignar permisos correctos
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

EXPOSE 80

# Enlazar storage y correr migraciones al arrancar
CMD sh -c "php artisan storage:link --force && php artisan migrate --force && apache2-foreground"
