#!/bin/sh

# Cambiar el puerto de Apache al puerto dinámico asignado por Railway ($PORT)
if [ -n "$PORT" ]; then
    echo "Configurando Apache para escuchar en el puerto $PORT..."
    sed -i "s/Listen 80/Listen $PORT/g" /etc/apache2/ports.conf
    sed -i "s/<VirtualHost \*:80>/<VirtualHost *:$PORT>/g" /etc/apache2/sites-available/*.conf
else
    echo "PORT no está definido. Usando puerto por defecto 80."
fi

# Ejecutar tareas de Laravel
echo "Enlazando storage..."
php artisan storage:link --force

echo "Ejecutando migraciones..."
php artisan migrate --force

# Asegurar que solo el módulo MPM prefork esté activo (evita error More than one MPM loaded)
if command -v a2dismod >/dev/null 2>&1; then
    a2dismod mpm_event mpm_worker || true
    a2enmod mpm_prefork || true
fi

# Iniciar Apache
echo "Iniciando Apache..."
exec apache2-foreground

