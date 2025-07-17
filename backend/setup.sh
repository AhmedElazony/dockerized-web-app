#!/bin/bash

echo "🚀 Starting Laravel Backend Setup..."

# Wait for database to be ready
echo "⏳ Waiting for database to be ready..."
while ! nc -z database 3306; do
    sleep 1
done
echo "✅ Database is ready!"

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

# Run migrations
echo "🔄 Running database migrations..."
php artisan migrate --force

# Clear caches
echo "🧹 Clearing caches..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Set proper permissions
chown -R www-data:www-data /var/www/html
chmod -R 755 /var/www/html/storage
chmod -R 755 /var/www/html/bootstrap/cache

echo "✅ Laravel setup complete!"
