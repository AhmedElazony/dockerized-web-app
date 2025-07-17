# Dockerized Web App

A full-stack web application with Laravel backend and Angular frontend, fully dockerized for easy development and deployment.

## 🏗️ Architecture

- **Backend**: Laravel 11 with PHP 8.3 + Nginx + PHP-FPM
- **Frontend**: Angular 20 with Nginx
- **Database**: MySQL 8.0
- **Cache**: Redis 7

## 🚀 Quick Start

### One-Command Setup

1. **Clone and navigate to the project:**

   ```bash
   git clone <repository-url>
   cd dockerized-web-app
   ```

2. **Run the setup script:**

   ```bash
   ./setup.sh
   ```

3. **Access the application:**
   - Frontend: http://localhost:4200
   - Backend API: http://localhost:8000/api/start
   - Database: localhost:3306

That's it! The setup script will automatically:

- Check Docker prerequisites
- Create environment files
- Build and start all containers
- Set up the database
- Configure Laravel

## 🐳 Manual Docker Commands

If you prefer to run Docker commands manually:

```bash
# Build and start all services
docker-compose up --build -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

## 📁 Project Structure

```
dockerized-web-app/
├── backend/                    # Laravel application
│   ├── app/
│   ├── config/
│   ├── database/
│   ├── docker/
│   │   ├── nginx/
│   │   │   └── nginx.conf     # Nginx configuration
│   │   └── supervisor/
│   │       └── supervisord.conf # Supervisor configuration
│   ├── Dockerfile             # Backend Docker image
│   ├── setup.sh              # Backend setup script (entrypoint)
│   └── .env.docker           # Laravel environment template
├── frontend/                   # Angular application
│   ├── src/
│   ├── docker/
│   │   └── nginx/
│   │       └── nginx.conf     # Frontend Nginx configuration
│   ├── Dockerfile             # Frontend Docker image
│   └── setup.sh              # Frontend setup script (entrypoint)
├── docker-compose.yml          # Service orchestration
├── .env                       # Docker environment variables
├── setup.sh                  # Main setup script
└── docker-utils.sh           # Utility commands
```

## 🔧 Configuration

### Environment Variables

The main environment variables are in `.env` file:

```env
# Application URLs
BACKEND_URL=http://localhost:8000
FRONTEND_URL=http://localhost:4200

# Ports
BACKEND_PORT=8000
FRONTEND_PORT=4200
DATABASE_PORT=3306
REDIS_PORT=6379

# Database
MYSQL_DATABASE=laravel_app
MYSQL_ROOT_PASSWORD=root_password
MYSQL_USER=laravel_user
MYSQL_PASSWORD=laravel_password
```

### Laravel Configuration

Backend configuration is in `backend/.env.docker`. Key settings:

- Database connection points to Docker MySQL service
- Redis connection points to Docker Redis service
- CORS enabled for frontend communication

## 🔌 API Endpoints

### Backend API

- **GET** `/api/start` - Returns application startup data

Example response:

```json
{
  "success": true,
  "message": "Application Started Successfully!",
  "data": [
    {
      "id": 1,
      "name": "Hello, World"
    },
    {
      "id": 2,
      "name": "Test Name"
    }
  ]
}
```

## 🛠️ Development

### Utility Commands

Use the `docker-utils.sh` script for common tasks:

```bash
# Start the application
./docker-utils.sh start

# Stop the application
./docker-utils.sh stop

# View logs
./docker-utils.sh logs
./docker-utils.sh logs backend
./docker-utils.sh logs frontend

# Access container shells
./docker-utils.sh shell backend
./docker-utils.sh shell frontend
./docker-utils.sh shell database

# Run Laravel commands
./docker-utils.sh migrate
./docker-utils.sh fresh

# Check status
./docker-utils.sh status

# Rebuild containers
./docker-utils.sh rebuild
```

### Database Migrations

```bash
# Run migrations
./docker-utils.sh migrate

# Fresh migration with seeding
./docker-utils.sh fresh
```

### Installing Dependencies

```bash
# PHP dependencies
./docker-utils.sh composer

# Or manually
docker-compose exec backend composer install
```

## 🚨 Troubleshooting

### Port Conflicts

If ports are already in use, modify the port mappings in `docker-compose.yml`:

```yaml
ports:
  - "8001:80" # Change 8000 to 8001
```

### Permission Issues

```bash
# Fix Laravel storage permissions
docker-compose exec backend chown -R www-data:www-data storage bootstrap/cache
```

### Database Connection Issues

1. Ensure MySQL container is running: `docker-compose ps`
2. Check database logs: `docker-compose logs database`
3. Verify environment variables in `backend/.env`

### Container Build Issues

```bash
# Clean rebuild
./docker-utils.sh clean
./docker-utils.sh start
```

## 📊 Monitoring

### View Container Status

```bash
./docker-utils.sh status
```

### View Logs

```bash
# All services
./docker-utils.sh logs

# Specific service
./docker-utils.sh logs backend
./docker-utils.sh logs frontend
./docker-utils.sh logs database
```

## 🔒 Security Notes

- Change default passwords for production use
- Use environment-specific configuration files
- Enable HTTPS for production deployments
- Regularly update base Docker images

## 🏁 How It Works

1. **Setup Script**: The main `setup.sh` builds and starts all containers
2. **Container Entrypoints**: Each container runs its own setup script:
   - Backend: Sets up Laravel, waits for database, runs migrations
   - Frontend: Waits for backend, starts Nginx
3. **Service Communication**: Containers communicate via Docker network
4. **CORS**: Backend is configured to accept requests from frontend
5. **Auto-Configuration**: Everything is configured automatically on startup

## 📈 For New Users

If you're cloning this repository:

1. Ensure Docker and Docker Compose are installed
2. Run `./setup.sh`
3. Wait for the build to complete (may take a few minutes on first run)
4. Access http://localhost:4200 in your browser
5. The Angular app will fetch data from the Laravel backend automatically

No additional configuration needed!
