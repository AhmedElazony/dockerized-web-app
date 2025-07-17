#!/bin/bash

echo "🚀 Starting Laravel Backend Setup..."

# Setup Laravel environment
if [ ! -f .env ]; then
    cp .env.docker .env
    echo "✅ Environment file created"
fi

# Generate APP_KEY if not set
if grep -q "APP_KEY=base64:your-app-key-here" .env; then
    echo "🔑 Generating Laravel APP_KEY..."
    php artisan key:generate --force
    echo "✅ APP_KEY generated"
fi

# Set proper permissions
chown -R www-data:www-data /var/www/html
chmod -R 755 /var/www/html/storage
chmod -R 755 /var/www/html/bootstrap/cache

echo "🚀 Starting PHP-FPM and Nginx..."
php-fpm -D
exec nginx -g 'daemon off;'
echo "✅ Laravel setup complete!"
