#!/bin/bash

# Simple setup script for the Dockerized Web App

echo "🐳 Dockerized Web App - Simple Setup"
echo "====================================="
echo ""

# Function to check if Docker is running
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        echo "❌ Docker is not running. Please start Docker first."
        exit 1
    fi
    echo "✅ Docker is running"
}

# Function to check if Docker Compose is available
check_docker_compose() {
    if ! command -v docker-compose > /dev/null 2>&1; then
        echo "❌ Docker Compose is not installed. Please install Docker Compose first."
        exit 1
    fi
    echo "✅ Docker Compose is available"
}

# Main setup function
main() {
    echo "🚀 Starting setup..."
    echo ""
    
    # Check prerequisites
    check_docker
    check_docker_compose
    
    echo ""
    echo "🔧 Setting up Laravel environment..."
    
    # Setup Laravel environment file
    if [ ! -f backend/.env ]; then
        cp backend/.env.docker backend/.env
        echo "✅ Created backend/.env from template"
    else
        echo "ℹ️  backend/.env already exists"
    fi
    
    echo ""
    echo "� Stopping any existing containers..."
    docker-compose down --remove-orphans
    
    echo ""
    echo "�🚀 Building and starting containers..."
    echo "This may take a few minutes on first run..."
    
    # Build and start containers
    docker-compose up --build -d
    
    echo ""
    echo "⏳ Waiting for services to be ready..."
    sleep 10
    
    echo ""
    echo "📊 Container status:"
    docker-compose ps
    
    # Build and start containers
    docker-compose up --build -d
    
    echo ""
    echo "🎉 Setup complete!"
    echo ""
    echo "🌐 Your application is now available at:"
    echo "   Frontend: http://localhost:4200"
    echo "   Backend:  http://localhost:8000"
    echo "   API:      http://localhost:8000/api/start"
    echo ""
    echo "� Useful commands:"
    echo "   docker-compose logs -f          # View all logs"
    echo "   docker-compose logs -f backend  # View backend logs"
    echo "   docker-compose logs -f frontend # View frontend logs"
    echo "   docker-compose down             # Stop all services"
    echo "   docker-compose up -d            # Start services"
    echo ""
}

# Run main function
main
