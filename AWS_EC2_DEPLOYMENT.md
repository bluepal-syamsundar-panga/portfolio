# AWS EC2 Deployment Guide for Portfolio Application

## Prerequisites
- AWS Account
- EC2 Instance (Ubuntu 20.04 or 22.04)
- MobaXterm or SSH client
- Domain name (optional)
- SSL Certificate (optional)

---

## Step 1: Launch EC2 Instance

### 1.1 Create EC2 Instance
1. Go to AWS Console → EC2 → Instances → Launch Instance
2. Choose AMI: **Ubuntu Server 22.04 LTS**
3. Instance Type: **t2.medium** (recommended for this app)
4. Storage: **30GB SSD**
5. Security Group: Create new with:
   - SSH (Port 22) from your IP
   - HTTP (Port 80) from 0.0.0.0/0
   - HTTPS (Port 443) from 0.0.0.0/0
   - Custom TCP 3000 from 0.0.0.0/0 (optional)
   - Custom TCP 5000 from 0.0.0.0/0 (optional)

### 1.2 Connect using MobaXterm
1. Download MobaXterm: https://mobaxterm.mobaxyy.com/
2. Open MobaXterm → Session → SSH
3. Remote host: Your EC2 public IP
4. Username: `ubuntu`
5. Use private key file (.pem) from AWS
6. Click OK to connect

---

## Step 2: Install Docker and Docker Compose

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add user to docker group
sudo usermod -aG docker ubuntu
newgrp docker

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Verify installation
docker --version
docker-compose --version
```

---

## Step 3: Clone Repository and Setup

```bash
# Navigate to home directory
cd ~

# Clone your repository
git clone https://github.com/YOUR_USERNAME/portfolio.git
cd portfolio

# Create .env file (copy from .env.example and update values)
cp .env.example .env

# Edit environment variables
nano .env
```

### Update .env file with:
```
DB_HOST=mysql
DB_USER=root
DB_PASSWORD=your_secure_password
DB_NAME=portfolio
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

REACT_APP_API_BASE_URL=http://your_domain_or_ip:5000
```

---

## Step 4: Build and Run with Docker Compose

```bash
# Navigate to project directory
cd ~/portfolio

# Build Docker images
docker-compose build

# Start services in background
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f backend    # Backend logs
docker-compose logs -f frontend   # Frontend logs
docker-compose logs -f mysql      # Database logs

# Stop services
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

---

## Step 5: Access Application

### Direct Access (Without Nginx)
- Frontend: `http://YOUR_EC2_PUBLIC_IP:3000`
- Backend API: `http://YOUR_EC2_PUBLIC_IP:5000/api/skills`

### With Nginx Reverse Proxy
- Frontend: `http://YOUR_EC2_PUBLIC_IP:80`
- Backend API: `http://YOUR_EC2_PUBLIC_IP:80/api/`

---

## Step 6: Setup SSL Certificate (HTTPS)

### Option A: Using Let's Encrypt (Recommended)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Create SSL directory
sudo mkdir -p /home/ubuntu/portfolio/ssl

# Generate certificate
sudo certbot certonly --standalone \
  -d your_domain.com \
  -d www.your_domain.com

# Copy certificates to project
sudo cp /etc/letsencrypt/live/your_domain.com/fullchain.pem ~/portfolio/ssl/cert.pem
sudo cp /etc/letsencrypt/live/your_domain.com/privkey.pem ~/portfolio/ssl/key.pem
sudo chown ubuntu:ubuntu ~/portfolio/ssl/*
```

### Option B: Self-signed Certificate (Testing Only)

```bash
# Create SSL directory
mkdir -p ~/portfolio/ssl

# Generate self-signed certificate
openssl req -x509 -newkey rsa:4096 -keyout ~/portfolio/ssl/key.pem \
  -out ~/portfolio/ssl/cert.pem -days 365 -nodes

# Fill in certificate details when prompted
```

---

## Step 7: Enable Nginx Reverse Proxy

```bash
# Uncomment nginx service in docker-compose.yml
# Then restart services
docker-compose restart nginx

# Verify nginx is running
docker-compose ps nginx

# Test nginx configuration
docker exec portfolio_nginx nginx -t
```

---

## Step 8: Setup Auto-restart and Monitoring

### Create Systemd Service

```bash
# Create service file
sudo nano /etc/systemd/system/portfolio-docker.service
```

### Paste this content:
```ini
[Unit]
Description=Portfolio Docker Compose Application
After=docker.service
Requires=docker.service

[Service]
Type=oneshot
User=ubuntu
WorkingDirectory=/home/ubuntu/portfolio
ExecStart=/usr/local/bin/docker-compose up -d
ExecStop=/usr/local/bin/docker-compose down
RemainAfterExit=yes

[Install]
WantedBy=multi-user.target
```

### Enable and start service:
```bash
sudo systemctl daemon-reload
sudo systemctl enable portfolio-docker.service
sudo systemctl start portfolio-docker.service
sudo systemctl status portfolio-docker.service
```

---

## Step 9: Database Backup and Restore

### Backup Database
```bash
# Backup MySQL database
docker exec portfolio_mysql mysqldump -u root -pYOUR_PASSWORD portfolio > backup.sql

# Backup with date
docker exec portfolio_mysql mysqldump -u root -pYOUR_PASSWORD portfolio > backup_$(date +%Y%m%d_%H%M%S).sql
```

### Restore Database
```bash
# Restore from backup
docker exec -i portfolio_mysql mysql -u root -pYOUR_PASSWORD portfolio < backup.sql
```

---

## Step 10: Application Logs and Debugging

```bash
# View all logs
docker-compose logs

# View specific service logs
docker-compose logs backend
docker-compose logs frontend
docker-compose logs mysql

# Follow logs in real-time
docker-compose logs -f backend

# View last 100 lines
docker-compose logs --tail=100

# Check container status
docker ps -a

# Exec into container for debugging
docker exec -it portfolio_backend /bin/sh
docker exec -it portfolio_mysql mysql -u root -pYOUR_PASSWORD
```

---

## Step 11: Performance Optimization

### Monitor Resource Usage
```bash
# Check Docker stats
docker stats

# Check disk space
df -h

# Check memory
free -h
```

### Cleanup Unused Resources
```bash
# Remove dangling images
docker image prune -a

# Remove stopped containers
docker container prune

# Remove unused volumes
docker volume prune

# Remove all unused resources
docker system prune -a
```

---

## Step 12: Scaling and Load Balancing

### Scale Services (in docker-compose.yml)

Add replicas for services:
```yaml
services:
  backend:
    deploy:
      replicas: 2  # Run 2 instances of backend
```

Then restart:
```bash
docker-compose up -d --scale backend=2
```

---

## Step 13: Troubleshooting

### Issue: Port Already in Use
```bash
# Find process using port
sudo lsof -i :3000
sudo lsof -i :5000

# Kill process
sudo kill -9 PID
```

### Issue: Database Connection Failed
```bash
# Check MySQL logs
docker-compose logs mysql

# Restart MySQL
docker-compose restart mysql

# Check MySQL connectivity
docker exec portfolio_backend curl http://mysql:3306
```

### Issue: Frontend Not Loading
```bash
# Check frontend logs
docker-compose logs frontend

# Verify frontend is running
curl http://localhost:3000

# Clear cache and rebuild
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Issue: Out of Memory
```bash
# Check memory usage
free -h
docker stats

# Increase swap space (Optional)
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

---

## Step 14: Update Application

```bash
# Pull latest changes
cd ~/portfolio
git pull origin main

# Rebuild images
docker-compose build

# Restart services
docker-compose up -d

# Verify everything is running
docker-compose ps
```

---

## Step 15: Production Checklist

- [ ] SSL/TLS certificate installed
- [ ] Database backup strategy implemented
- [ ] Monitoring and logging setup
- [ ] Load balancer configured (if needed)
- [ ] Auto-scaling policies configured
- [ ] Security groups properly configured
- [ ] Regular backups scheduled
- [ ] Nginx reverse proxy enabled
- [ ] Health checks enabled
- [ ] Domain name configured with Route53

---

## Useful Commands Reference

```bash
# View docker-compose status
docker-compose ps

# Restart all services
docker-compose restart

# Restart specific service
docker-compose restart backend

# Pull latest images
docker-compose pull

# Execute command in container
docker-compose exec service_name command

# Remove all stopped containers
docker container prune

# View application logs
docker-compose logs -f

# Export database
docker exec portfolio_mysql mysqldump -u root -p database_name > backup.sql

# Import database
docker exec -i portfolio_mysql mysql -u root -p database_name < backup.sql
```

---

## Support and Additional Resources

- Docker Documentation: https://docs.docker.com/
- Docker Compose: https://docs.docker.com/compose/
- AWS EC2: https://docs.aws.amazon.com/ec2/
- Nginx: https://nginx.org/
- Let's Encrypt: https://letsencrypt.org/

---

**Note:** Replace placeholders like `YOUR_EC2_PUBLIC_IP`, `your_domain.com`, `YOUR_PASSWORD` with actual values.
