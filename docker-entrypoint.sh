#!/bin/sh

# Limpiar comillas dobles de las variables de entorno para evitar errores en Laravel
echo "Limpiando comillas en variables de entorno..."
rm -f .env
for var in $(env | cut -d= -f1); do
    case "$var" in
        APP_*|DB_*|VITE_*|FRONTEND_*|SESSION_*|BROADCAST_*|FILESYSTEM_*|QUEUE_*|CACHE_*|REDIS_*|MAIL_*|STRIPE_*)
            val=$(printenv "$var")
            clean_val=$(echo "$val" | sed -e 's/^"//' -e 's/"$//')
            echo "$var=\"$clean_val\"" >> .env
            export "$var=$clean_val"

            ;;
    esac
done

# Configurar Apache para escuchar en el puerto 80 y en el puerto dinámico de Railway ($PORT)
if [ -n "$PORT" ] && [ "$PORT" != "80" ]; then
    echo "Configurando Apache para escuchar en los puertos 80 y $PORT..."
    if ! grep -q "Listen $PORT" /etc/apache2/ports.conf; then
        echo "Listen $PORT" >> /etc/apache2/ports.conf
    fi
    sed -i "s/<VirtualHost \*:80>/<VirtualHost *:80 *:$PORT>/g" /etc/apache2/sites-available/*.conf
else
    echo "Usando puerto por defecto 80."
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



