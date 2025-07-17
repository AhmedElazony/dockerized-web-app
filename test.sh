#!/bin/bash

echo "🧪 Testing Dockerized Web App"
echo "=============================="
echo ""

echo "📊 Checking container status..."
docker-compose ps
echo ""

echo "🌐 Testing frontend (Angular)..."
if curl -s http://localhost:4200 > /dev/null; then
    echo "✅ Frontend is responding at http://localhost:4200"
else
    echo "❌ Frontend is not responding at http://localhost:4200"
    echo "📝 Frontend logs:"
    docker-compose logs --tail=20 frontend
fi
echo ""

echo "🔧 Testing backend (Laravel)..."
if curl -s http://localhost:8000 > /dev/null; then
    echo "✅ Backend is responding at http://localhost:8000"
else
    echo "❌ Backend is not responding at http://localhost:8000"
    echo "📝 Backend logs:"
    docker-compose logs --tail=20 backend
fi
echo ""

echo "📡 Testing API endpoint..."
api_response=$(curl -s http://localhost:8000/api/start)
if [ $? -eq 0 ] && [[ $api_response == *"success"* ]]; then
    echo "✅ API is working at http://localhost:8000/api/start"
    echo "📄 API Response:"
    echo "$api_response" | jq . 2>/dev/null || echo "$api_response"
else
    echo "❌ API is not working at http://localhost:8000/api/start"
    echo "📝 Backend logs:"
    docker-compose logs --tail=20 backend
fi
echo ""

echo "🗄️ Testing database..."
if docker-compose exec -T database mysql -u laravel_user -plaravel_password -e "SELECT 1;" > /dev/null 2>&1; then
    echo "✅ Database is accessible"
else
    echo "❌ Database is not accessible"
    echo "📝 Database logs:"
    docker-compose logs --tail=20 database
fi
echo ""

echo "🔍 Summary:"
echo "Frontend: http://localhost:4200"
echo "Backend:  http://localhost:8000"
echo "API:      http://localhost:8000/api/start"
echo ""
echo "If any service is not working, run:"
echo "  docker-compose logs [service_name]"
echo "  docker-compose restart [service_name]"
