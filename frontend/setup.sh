#!/bin/sh

echo "🚀 Starting Angular Frontend Setup..."

# Wait for backend to be ready
echo "⏳ Waiting for backend to be ready..."
while ! nc -z backend 80; do
    sleep 1
done
echo "✅ Backend is ready!"

echo "✅ Angular frontend setup complete!"

# Start Nginx
echo "🚀 Starting Nginx..."
exec nginx -g 'daemon off;'
