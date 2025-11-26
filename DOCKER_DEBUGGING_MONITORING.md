# 🐳 Docker Debugging & Monitoring Guide

## Real-Time Monitoring

### Monitor All Containers
```bash
# Real-time stats
docker stats

# Show only portfolio containers
docker stats --no-stream | grep portfolio

# Continuous monitoring with refresh
watch -n 1 'docker stats --no-stream'
```

### CPU and Memory Usage
```
CONTAINER              CPU %     MEM USAGE
portfolio_frontend     2.5%      125 MB
portfolio_backend      1.2%      95 MB
portfolio_mysql        3.1%      250 MB
portfolio_nginx        0.5%      10 MB
```

---

## Container Health Checks

### Check Container Status
```bash
# Show all containers with health status
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Health}}"

# Output:
# NAME                    STATUS                  HEALTH
# portfolio_mysql         Up 5 hours              healthy
# portfolio_backend       Up 5 hours              healthy
# portfolio_frontend      Up 5 hours              healthy
# portfolio_nginx         Up 5 hours              healthy
```

### Manual Health Checks
```bash
# Check frontend
docker exec portfolio_frontend curl -s http://localhost:3000 | head -20

# Check backend
docker exec portfolio_backend curl -s http://localhost:5000/api/skills

# Check MySQL
docker exec portfolio_mysql mysqladmin ping -u root -pYOUR_PASSWORD

# Check Nginx
docker exec portfolio_nginx curl -s http://localhost:80
```

---

## Detailed Logs Analysis

### Backend Logs

```bash
# All backend logs
docker-compose logs backend

# Follow in real-time
docker-compose logs -f backend

# Last 50 lines
docker-compose logs --tail=50 backend

# With timestamps
docker-compose logs --timestamps backend

# Since specific time
docker-compose logs --since 2025-11-26T10:00:00 backend
```

### Common Backend Log Messages

```
✅ Connected to MySQL database
✅ Server running on port 5000
❌ Error: connect ECONNREFUSED 127.0.0.1:3306
❌ Failed to send message
```

### Frontend Logs

```bash
# View frontend logs
docker-compose logs frontend

# Identify build issues
docker-compose logs frontend | grep -i error
docker-compose logs frontend | grep -i warning
```

### Database Logs

```bash
# MySQL logs
docker-compose logs mysql

# Check for connection issues
docker-compose logs mysql | grep -i error

# Check initialization
docker-compose logs mysql | grep -i init
```

---

## Container Inspection

### Inspect Container Details
```bash
# Full container info
docker inspect portfolio_backend

# Format output
docker inspect portfolio_backend --format='{{.State}}'

# Get IP address
docker inspect portfolio_backend --format='{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}'

# Get environment variables
docker inspect portfolio_backend --format='{{json .Config.Env}}'
```

### Container Resource Limits
```bash
# Check memory limit
docker inspect portfolio_backend --format='{{.HostConfig.Memory}}'

# Check CPU limit
docker inspect portfolio_backend --format='{{.HostConfig.NanoCpus}}'

# Check exposed ports
docker inspect portfolio_backend --format='{{range $p, $conf := .NetworkSettings.Ports}}{{$p}}{{end}}'
```

---

## Network Debugging

### Check Container Networks
```bash
# List all networks
docker network ls

# Inspect portfolio network
docker network inspect portfolio_portfolio_network

# Check DNS resolution
docker exec portfolio_backend nslookup mysql
docker exec portfolio_backend nslookup backend
```

### Test Inter-Container Connectivity
```bash
# Frontend to Backend
docker exec portfolio_frontend curl http://backend:5000/api/skills

# Backend to MySQL
docker exec portfolio_backend curl mysql:3306

# Check network
docker exec portfolio_backend ping -c 3 mysql
docker exec portfolio_backend ping -c 3 frontend
```

---

## Database Debugging

### Access MySQL Container
```bash
# Interactive MySQL shell
docker exec -it portfolio_mysql mysql -u root -pYOUR_PASSWORD

# Inside MySQL:
# Show databases
SHOW DATABASES;

# Select portfolio database
USE portfolio;

# Show tables
SHOW TABLES;

# Check skills table
SELECT * FROM skills;

# Check projects table
SELECT * FROM projects;

# Check contacts table
SELECT * FROM contacts;

# Exit
EXIT;
```

### Query Database from Host
```bash
# Count records
docker exec -T portfolio_mysql mysql -u root -pYOUR_PASSWORD -D portfolio -e "SELECT COUNT(*) as 'Total Skills' FROM skills;"

# Export data
docker exec -T portfolio_mysql mysqldump -u root -pYOUR_PASSWORD portfolio > backup.sql

# Check database size
docker exec -T portfolio_mysql mysql -u root -pYOUR_PASSWORD -D portfolio -e "SELECT table_name, ROUND(((data_length + index_length) / 1024 / 1024), 2) 'Size in MB' FROM information_schema.tables WHERE table_schema = 'portfolio';"
```

---

## File System Debugging

### Check Container Filesystem
```bash
# SSH into container
docker exec -it portfolio_backend /bin/sh

# Inside container:
# Check current directory
pwd

# List files
ls -la

# Check disk usage
df -h

# Check file permissions
ls -la /app

# Exit container
exit
```

### Copy Files to/from Container
```bash
# Copy file from container
docker cp portfolio_backend:/app/package.json ./package.json

# Copy file to container
docker cp ./config.json portfolio_backend:/app/

# Copy entire directory
docker cp portfolio_backend:/app/logs ./app_logs
```

---

## Performance Troubleshooting

### Identify Performance Issues
```bash
# High CPU usage
docker stats | awk '$3 > 50 {print "HIGH CPU: "$2"\t"$3}'

# High memory usage
docker stats | awk '$5 > "500Mi" {print "HIGH MEM: "$2"\t"$5}'

# Check disk space
docker system df

# Cleanup to free space
docker system prune -a
```

### Optimize Container Performance
```bash
# Check image size
docker image ls

# View layer sizes
docker history portfolio_backend

# Rebuild with cache
DOCKER_BUILDKIT=1 docker-compose build

# Remove unused images
docker image prune -a

# Remove unused volumes
docker volume prune
```

---

## Port Debugging

### Check Port Usage
```bash
# Linux/Mac
sudo lsof -i :3000
sudo lsof -i :5000
sudo lsof -i :3306

# Windows PowerShell
netstat -ano | findstr :3000
netstat -ano | findstr :5000
netstat -ano | findstr :3306

# Docker port mapping
docker port portfolio_frontend
docker port portfolio_backend
docker port portfolio_mysql
docker port portfolio_nginx
```

### Fix Port Conflicts
```bash
# Kill process using port (Linux/Mac)
sudo kill -9 PID

# Kill process using port (Windows)
taskkill /PID PID /F

# Or change port in docker-compose.yml
# ports:
#   - "3001:3000"  # Changed from 3000 to 3001
```

---

## Error Diagnosis

### Common Errors and Solutions

#### Database Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:3306

Solution:
docker-compose logs mysql
docker-compose restart mysql
docker-compose logs backend
```

#### Port Already in Use
```
Error: bind: address already in use

Solution:
docker ps  # Find conflicting container
docker stop <container_id>
# Or change port in docker-compose.yml
```

#### Service Health Check Failed
```
Error: Container exited with code 1

Solution:
docker-compose logs <service_name>
# Check logs for specific error
docker-compose build --no-cache <service_name>
docker-compose up -d <service_name>
```

#### Memory Limit Exceeded
```
Error: Out of memory

Solution:
docker stats  # Check current usage
# Increase memory in docker-compose.yml
# Or optimize application
```

---

## Log Aggregation

### Save Logs to File
```bash
# Save all logs
docker-compose logs > all_logs.txt

# Save backend logs
docker-compose logs backend > backend_logs.txt

# Append new logs
docker-compose logs >> all_logs.txt 2>&1

# Save with timestamp
docker-compose logs > logs_$(date +%Y%m%d_%H%M%S).txt
```

### Parse Logs
```bash
# Find errors
docker-compose logs backend | grep -i error

# Find warnings
docker-compose logs backend | grep -i warning

# Count occurrences
docker-compose logs backend | grep -c "Connected"

# Search time range
docker-compose logs backend --since 30m | grep API
```

---

## Performance Metrics

### CPU and Memory Tracking
```bash
# Get average CPU usage (Linux)
docker stats --no-stream | grep portfolio_backend | awk '{print $3}'

# Get peak memory (Linux)
docker stats --no-stream | tail -n +2 | awk '{print $5}' | sort -hr | head -1

# Monitor over time
for i in {1..10}; do docker stats --no-stream | head -1; sleep 1; done
```

### Disk Usage
```bash
# Total Docker usage
docker system df

# Breakdown by type
docker system df -v

# Image sizes
docker image ls --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}"

# Container disk usage
docker container ls --format "table {{.Names}}\t{{.Size}}"
```

---

## Debugging Commands Reference

| Task | Command |
|------|---------|
| View all logs | `docker-compose logs` |
| Follow backend logs | `docker-compose logs -f backend` |
| Check container status | `docker-compose ps` |
| View stats | `docker stats` |
| Inspect container | `docker inspect <container>` |
| Access shell | `docker exec -it <container> /bin/sh` |
| Run command | `docker exec <container> <command>` |
| View resource limits | `docker stats --no-stream` |
| Copy file | `docker cp <container>:/path /local/path` |
| Check network | `docker network inspect <network>` |

---

## Advanced Debugging

### Enable Debug Mode
```bash
# Frontend debug
docker-compose exec frontend sh -c "DEBUG=* npm start"

# Backend debug
docker-compose exec backend sh -c "DEBUG=app npm start"
```

### View Process List in Container
```bash
# See running processes
docker exec portfolio_backend ps aux

# See process details
docker exec portfolio_backend ps -ef | grep node
```

### Monitor Real-time Changes
```bash
# Watch logs with tail
docker-compose logs -f backend | grep -v "^$"

# Watch stats
watch -n 1 'docker stats --no-stream'

# Watch ps output
watch -n 1 'docker exec portfolio_backend ps aux'
```

---

## Backup and Recovery

### Backup Before Debugging
```bash
# Backup database
docker exec -T portfolio_mysql mysqldump -u root -pYOUR_PASSWORD portfolio > backup_$(date +%Y%m%d_%H%M%S).sql

# Backup volumes
docker run --rm -v portfolio_mysql_data:/data -v $(pwd):/backup alpine tar czf /backup/volume_backup.tar.gz -C /data .
```

### Restore from Backup
```bash
# Restore database
docker exec -i portfolio_mysql mysql -u root -pYOUR_PASSWORD portfolio < backup.sql

# Restore volume
docker run --rm -v portfolio_mysql_data:/data -v $(pwd):/backup alpine tar xzf /backup/volume_backup.tar.gz -C /data
```

---

**Tip:** Use `docker-compose logs -f` to monitor multiple services simultaneously while troubleshooting!
