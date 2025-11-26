# Portfolio Application - Quick Start Guide

## 📱 Mobile Responsive Update ✅

Your portfolio application has been updated with **full mobile responsiveness**:

### Features:
- ✅ Responsive navbar with hamburger menu on mobile
- ✅ Adaptive font sizes (sm, md, lg breakpoints)
- ✅ Flexible grid layouts for all screen sizes
- ✅ Touch-friendly button sizes
- ✅ Optimized spacing and padding for mobile
- ✅ Images scale properly on all devices
- ✅ Forms are mobile-friendly
- ✅ Smooth animations on mobile devices

### Tested Breakpoints:
- Mobile: 320px - 640px
- Tablet: 641px - 1024px
- Desktop: 1025px and above

---

## 🐳 Docker Deployment Quick Start

### Prerequisites
- Docker installed
- Docker Compose installed
- Node.js 18+ (if running locally without Docker)

### Local Deployment with Docker

```bash
# 1. Navigate to project directory
cd d:\Portfolio\portfolio

# 2. Create .env file (if not exists)
copy .env.example .env

# 3. Build images
docker-compose build

# 4. Start all services
docker-compose up -d

# 5. Access application
# Frontend: http://localhost:3000
# Backend API: http://localhost:5000
# MySQL: localhost:3306
```

### Services Running:
- **Frontend**: http://localhost:3000 (React - Port 3000)
- **Backend**: http://localhost:5000 (Node.js Express - Port 5000)
- **Database**: MySQL (Port 3306)
- **Nginx**: http://localhost:80 (Reverse Proxy - Optional)

### Useful Docker Commands

```bash
# Check service status
docker-compose ps

# View logs
docker-compose logs -f backend

# Restart services
docker-compose restart

# Stop all services
docker-compose down

# Stop and remove data
docker-compose down -v

# Rebuild images
docker-compose build --no-cache
```

---

## 🚀 AWS EC2 Deployment

### Quick Deploy Steps:

#### Step 1: Setup EC2 Instance
```bash
# Launch Ubuntu 22.04 instance on AWS
# Use Security Group: SSH (22), HTTP (80), HTTPS (443), Custom TCP 3000, 5000
```

#### Step 2: Connect via MobaXterm
- Download: https://mobaxterm.mobaxyy.com/
- SSH to your EC2 instance public IP
- Username: ubuntu
- Use .pem private key

#### Step 3: Install Docker
```bash
# SSH into your EC2 instance
ssh -i your-key.pem ubuntu@your-ec2-public-ip

# Run these commands:
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker ubuntu
newgrp docker

curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

#### Step 4: Deploy Application
```bash
# Clone repository
git clone https://github.com/your-repo/portfolio.git
cd portfolio

# Create and update .env file
cp .env.example .env
nano .env  # Update database and email credentials

# Start application
docker-compose up -d

# Verify services
docker-compose ps
```

#### Step 5: Access Application
- Frontend: `http://your-ec2-public-ip:3000`
- Backend: `http://your-ec2-public-ip:5000`

### Enable HTTPS (SSL)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Generate certificate
sudo certbot certonly --standalone -d your-domain.com

# Copy to project
sudo cp /etc/letsencrypt/live/your-domain.com/fullchain.pem ~/portfolio/ssl/cert.pem
sudo cp /etc/letsencrypt/live/your-domain.com/privkey.pem ~/portfolio/ssl/key.pem

# Enable Nginx and restart
docker-compose restart nginx
```

---

## 📁 Project Structure

```
portfolio/
├── .env                          # Environment variables
├── .env.example                  # Example environment file
├── docker-compose.yml            # Docker Compose configuration
├── nginx.conf                    # Nginx reverse proxy config
├── AWS_EC2_DEPLOYMENT.md         # Complete AWS deployment guide
├── DOCKER_COMMANDS.md            # Docker useful commands
│
├── Portfolio_Backend/
│   ├── Dockerfile               # Backend Docker image
│   ├── package.json
│   ├── index.js                 # Main backend file
│   ├── init.sql                 # Database initialization
│   └── nodemailer config
│
├── portfolio_frontend/
│   ├── Dockerfile               # Frontend Docker image
│   ├── package.json
│   ├── src/
│   │   ├── App.js              # ✅ RESPONSIVE COMPONENT
│   │   ├── App.css             # Styling with Tailwind
│   │   ├── index.js
│   │   └── ...
│   ├── public/
│   │   ├── index.html          # Meta viewport tag
│   │   └── ...
│   └── tailwind.config.js      # Tailwind configuration
│
└── Dockerfile (root - for single container build)
```

---

## 🔧 Environment Variables (.env)

```env
# Database
DB_HOST=mysql
DB_USER=root
DB_PASSWORD=syam
DB_NAME=portfolio
DB_ROOT_PASSWORD=root_password

# Backend
PORT=5000
NODE_ENV=production

# Email (Gmail)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Frontend
REACT_APP_API_BASE_URL=http://localhost:5000
```

---

## 📊 Docker Images Used

| Service | Image | Port |
|---------|-------|------|
| Frontend | node:18-alpine + serve | 3000 |
| Backend | node:18-alpine | 5000 |
| Database | mysql:8.0 | 3306 |
| Proxy | nginx:alpine | 80/443 |

---

## 🛡️ Security Features

- ✅ Nginx reverse proxy with SSL support
- ✅ Environment variables for secrets
- ✅ MySQL non-root user option
- ✅ Security headers in Nginx
- ✅ Health checks for all services
- ✅ Docker volume encryption for MySQL

---

## 📝 Key Updates Made

### 1. **App.js** (Responsive)
- Added mobile menu with hamburger icon
- Responsive navbar text sizing
- Mobile-optimized layout
- Touch-friendly buttons
- Adaptive grid layouts

### 2. **docker-compose.yml**
- Multi-service orchestration
- Automatic health checks
- Volume management
- Network isolation
- Environment variable support

### 3. **Dockerfiles**
- Multi-stage builds for smaller images
- Security best practices
- Health check endpoints
- Production-ready configuration

### 4. **AWS Deployment Guide**
- Step-by-step EC2 setup
- MobaXterm connection guide
- SSL/TLS setup with Let's Encrypt
- Backup and monitoring
- Troubleshooting section

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Find and kill process
sudo lsof -i :3000
sudo kill -9 <PID>
```

### Database Connection Failed
```bash
# Check MySQL
docker-compose logs mysql

# Restart MySQL
docker-compose restart mysql
```

### Frontend Not Loading
```bash
# Check logs
docker-compose logs frontend

# Rebuild
docker-compose build --no-cache frontend
docker-compose up -d frontend
```

---

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [AWS EC2](https://docs.aws.amazon.com/ec2/)
- [Nginx Documentation](https://nginx.org/)
- [React Responsive Design](https://react.dev/)

---

## ✅ Deployment Checklist

### Local Testing
- [ ] Frontend loads on mobile (test with DevTools)
- [ ] Navigation menu responsive
- [ ] All sections responsive
- [ ] Forms submit correctly
- [ ] Images load properly

### Docker Deployment
- [ ] All images build successfully
- [ ] Services start without errors
- [ ] Database connects properly
- [ ] API endpoints respond
- [ ] Frontend displays correctly

### EC2 Deployment
- [ ] Security groups configured
- [ ] Docker installed
- [ ] Repository cloned
- [ ] Services running
- [ ] Application accessible
- [ ] SSL certificate configured

---

## 📞 Support

For detailed information on each component, refer to:
- `AWS_EC2_DEPLOYMENT.md` - Complete deployment guide
- `docker-compose.yml` - Service configuration
- `.env.example` - Environment variables template

---

**Last Updated:** November 26, 2025
**Status:** ✅ Mobile Responsive + Docker Ready + AWS Deployment Ready
