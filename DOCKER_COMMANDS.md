# Useful Docker Commands for Portfolio Application

## Service Management

### Start Services
```bash
# Start all services in background
docker-compose up -d

# Start with output visible
docker-compose up

# Start specific service
docker-compose up -d backend
```

### Stop Services
```bash
# Stop all services (data persists)
docker-compose stop

# Stop specific service
docker-compose stop frontend

# Stop and remove containers
docker-compose down

# Stop and remove everything including volumes
docker-compose down -v
```

### View Status
```bash
# List all services and their status
docker-compose ps

# Detailed view of all containers
docker ps -a

# View running containers only
docker ps
```

---

## Logs and Debugging

### View Logs
```bash
# View all logs
docker-compose logs

# Follow logs in real-time
docker-compose logs -f

# View specific service logs
docker-compose logs backend
docker-compose logs frontend
docker-compose logs mysql

# View last 100 lines
docker-compose logs --tail=100

# View logs with timestamps
docker-compose logs --timestamps

# View logs since specific time
docker-compose logs --since 2025-11-26
```

### Enter Container Shell
```bash
# SSH into backend container
docker-compose exec backend /bin/sh

# SSH into frontend container
docker-compose exec frontend /bin/sh

# Access MySQL CLI
docker-compose exec mysql mysql -u root -pYOUR_PASSWORD

# Execute specific command
docker-compose exec backend npm list
```

---

## Database Operations

### Backup Database
```bash
# Create backup
docker-compose exec -T mysql mysqldump -u root -pYOUR_PASSWORD portfolio > backup.sql

# Backup with timestamp
docker-compose exec -T mysql mysqldump -u root -pYOUR_PASSWORD portfolio > backup_$(date +%Y%m%d_%H%M%S).sql

# Backup specific table
docker-compose exec -T mysql mysqldump -u root -pYOUR_PASSWORD portfolio skills > skills_backup.sql
```

### Restore Database
```bash
# Restore from backup
docker exec -i portfolio_mysql mysql -u root -pYOUR_PASSWORD portfolio < backup.sql

# Import SQL file
docker-compose exec -T mysql mysql -u root -pYOUR_PASSWORD portfolio < backup.sql
```

### Query Database
```bash
# Interactive MySQL access
docker-compose exec mysql mysql -u root -pYOUR_PASSWORD -D portfolio

# Run SQL query
docker-compose exec -T mysql mysql -u root -pYOUR_PASSWORD -D portfolio -e "SELECT * FROM skills;"
```

---

## Build Operations

### Build Images
```bash
# Build all images
docker-compose build

# Build specific service
docker-compose build backend

# Build without cache (fresh build)
docker-compose build --no-cache

# Build with specific tag
docker-compose build --build-arg REACT_APP_API_BASE_URL=http://prod-api.com
```

### Rebuild and Restart
```bash
# Rebuild and restart all services
docker-compose up -d --build

# Rebuild and restart specific service
docker-compose up -d --build backend
```

---

## Volume and Network Management

### Volumes
```bash
# List all volumes
docker volume ls

# Inspect specific volume
docker volume inspect portfolio_mysql_data

# Remove unused volumes
docker volume prune

# Remove specific volume
docker volume rm portfolio_mysql_data

# Backup volume
docker run --rm -v portfolio_mysql_data:/data -v $(pwd):/backup alpine tar czf /backup/volume_backup.tar.gz -C /data .
```

### Networks
```bash
# List networks
docker network ls

# Inspect network
docker network inspect portfolio_portfolio_network

# Prune unused networks
docker network prune
```

---

## Resource Monitoring

### CPU and Memory Usage
```bash
# Real-time stats for all containers
docker stats

# Stats for specific container
docker stats portfolio_backend

# View container resource limits
docker inspect portfolio_backend | grep -A 10 '"Memory"'
```

### Disk Space
```bash
# Check Docker disk usage
docker system df

# Detailed disk usage breakdown
docker system df -v

# Check server disk space
df -h
```

### System Information
```bash
# Docker version
docker --version
docker-compose --version

# Docker system info
docker info

# Container details
docker inspect portfolio_backend
```

---

## Cleanup Operations

### Remove Unused Resources
```bash
# Remove dangling images
docker image prune

# Remove dangling images (force)
docker image prune -a

# Remove stopped containers
docker container prune

# Remove unused volumes
docker volume prune

# Remove unused networks
docker network prune

# Clean all unused resources
docker system prune

# Clean all unused resources (including volumes)
docker system prune -a --volumes
```

### Specific Cleanup
```bash
# Remove specific image
docker rmi image_name:tag

# Remove specific container
docker rm container_id

# Remove specific volume
docker volume rm volume_name

# Force remove
docker rmi -f image_name
docker rm -f container_id
```

---

## Update Operations

### Pull Updates
```bash
# Pull latest images
docker-compose pull

# Update services with new images
docker-compose up -d --pull always

# Update specific service
docker-compose pull backend && docker-compose up -d backend
```

### Upgrade Services
```bash
# Rebuild and update all services
docker-compose build --pull
docker-compose up -d

# Minimal downtime update
docker-compose pull
docker-compose down
docker-compose up -d
```

---

## Port and Network Troubleshooting

### Check Port Usage
```bash
# List services and their ports
docker-compose ps

# Check if port is in use (Linux)
sudo lsof -i :3000
sudo lsof -i :5000
sudo lsof -i :3306

# Check port on Windows
netstat -ano | findstr :3000

# Kill process using port
sudo kill -9 PID

# Windows - kill process
taskkill /PID PID /F
```

### Test Connectivity
```bash
# Test frontend connectivity
docker-compose exec backend curl http://frontend:3000

# Test backend connectivity
docker-compose exec frontend curl http://backend:5000

# Test database connectivity
docker-compose exec backend curl http://mysql:3306

# Test with timeout
docker-compose exec backend curl -m 5 http://backend:5000/api/skills
```

---

## Advanced Operations

### Run One-off Commands
```bash
# Run command once and remove
docker-compose run --rm backend npm list

# Run with environment
docker-compose run --rm -e DEBUG=true backend npm start
```

### Scale Services
```bash
# Scale backend to 3 instances
docker-compose up -d --scale backend=3

# Scale frontend
docker-compose up -d --scale frontend=2
```

### Export/Import
```bash
# Export container as image
docker commit portfolio_backend my-backend:latest

# Save image to file
docker save my-backend:latest | gzip > backend-image.tar.gz

# Load image from file
docker load < backend-image.tar.gz
```

### Push to Registry
```bash
# Tag image
docker tag portfolio_backend:latest myregistry/portfolio-backend:latest

# Push to registry
docker push myregistry/portfolio-backend:latest

# Pull from registry
docker pull myregistry/portfolio-backend:latest
```

---

## Performance Optimization

### Limit Resources
```bash
# Check current limits
docker stats --no-stream

# Update docker-compose with resource limits
# Add to services in docker-compose.yml:
deploy:
  resources:
    limits:
      cpus: '0.5'
      memory: 512M
    reservations:
      cpus: '0.25'
      memory: 256M
```

### Image Optimization
```bash
# Check image size
docker images

# Reduce image size
docker system prune -a

# Build with BuildKit for better caching
DOCKER_BUILDKIT=1 docker-compose build
```

---

## Emergency Operations

### Restart Everything
```bash
# Soft restart
docker-compose restart

# Hard restart (recreate containers)
docker-compose down
docker-compose up -d
```

### Force Reset
```bash
# Complete reset (WARNING: removes all data)
docker-compose down -v
docker rmi $(docker images -q)
docker-compose build --no-cache
docker-compose up -d
```

### Backup Before Reset
```bash
# Backup database before reset
docker-compose exec -T mysql mysqldump -u root -pYOUR_PASSWORD --all-databases > full_backup.sql

# Backup all volumes
docker run --rm -v portfolio_mysql_data:/data -v $(pwd):/backup alpine tar czf /backup/all_volumes.tar.gz -C /data .
```

---

## Quick Reference

| Command | Purpose |
|---------|---------|
| `docker-compose ps` | View service status |
| `docker-compose logs -f backend` | Follow backend logs |
| `docker-compose up -d` | Start all services |
| `docker-compose down` | Stop all services |
| `docker-compose exec backend /bin/sh` | SSH into backend |
| `docker-compose build --no-cache` | Rebuild from scratch |
| `docker volume ls` | List volumes |
| `docker network ls` | List networks |
| `docker stats` | Monitor resources |
| `docker system prune -a` | Clean up everything |

---

**Note:** Replace `YOUR_PASSWORD` with your actual MySQL password and `portfolio_backend` with your actual container names.
