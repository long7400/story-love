# Love Story Application

A web application for couples to document and celebrate their relationships.

## Project Structure

- **BE**: Spring Boot backend application
- **FE**: React frontend application
- **nginx**: Nginx configuration for production
- **docker-compose.yml**: Docker Compose configuration for orchestrating services

## Prerequisites

- Docker and Docker Compose installed on your VPS
- Domain name pointing to your VPS
- SSL certificates for your domain

## Deployment Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/story-love.git
cd story-love
```

### 2. Configure Environment Variables

Copy the example environment file and edit it with your settings:

```bash
cp .env.example .env
```

Edit the `.env` file with your production values:
- Set a strong database password
- Generate a secure random string for JWT_SECRET
- Update CORS_ALLOWED_ORIGINS with your domain
- Set your domain name in DOMAIN_NAME

### 3. SSL Certificates

Place your SSL certificates in the `ssl` directory:

```bash
mkdir -p ssl
# Copy your SSL certificates to the ssl directory
# fullchain.pem and privkey.pem
```

If you're using Let's Encrypt, you can copy the certificates from `/etc/letsencrypt/live/togetherforever.site/`:

```bash
cp /etc/letsencrypt/live/togetherforever.site/fullchain.pem ssl/
cp /etc/letsencrypt/live/togetherforever.site/privkey.pem ssl/
```

### 4. Update Nginx Configuration

The Nginx configuration is already set up for the domain `togetherforever.site`. If you need to use a different domain, edit the `nginx/nginx.conf` file:

```bash
sed -i 's/togetherforever.site/your-actual-domain.com/g' nginx/nginx.conf
```

### 5. Build and Start the Services

```bash
docker-compose up -d
```

This will:
- Build the backend and frontend Docker images
- Start the PostgreSQL database
- Start the backend service
- Start the frontend service with Nginx

### 6. Verify the Deployment

Visit your domain in a web browser to verify that the application is running correctly.

You can check the logs of each service:

```bash
# View logs for all services
docker-compose logs

# View logs for a specific service
docker-compose logs backend
docker-compose logs frontend
docker-compose logs db
```

### 7. Database Backup

To backup the database:

```bash
docker-compose exec db pg_dump -U postgres lovestory > backup.sql
```

### 8. Updating the Application

To update the application:

```bash
# Pull the latest changes
git pull

# Rebuild and restart the services
docker-compose up -d --build
```

## Security Considerations

1. **Environment Variables**: Keep your `.env` file secure and never commit it to version control.
2. **Database Passwords**: Use strong, unique passwords for your database.
3. **JWT Secret**: Use a long, random string for your JWT secret.
4. **SSL Certificates**: Keep your SSL certificates up to date.
5. **Firewall**: Configure your VPS firewall to only allow necessary ports (80, 443).
6. **Regular Updates**: Keep your Docker images and host system updated with security patches.

## Troubleshooting

### Database Connection Issues

If the backend can't connect to the database:

1. Check that the database container is running: `docker-compose ps`
2. Check the database logs: `docker-compose logs db`
3. Verify the database credentials in the `.env` file

### SSL Certificate Issues

If you're having issues with SSL:

1. Verify that the certificate files exist in the `ssl` directory
2. Check the Nginx logs: `docker-compose logs frontend`
3. Verify that the certificate paths in `nginx/nginx.conf` are correct

### Application Not Starting

If the application doesn't start:

1. Check the logs of each service: `docker-compose logs`
2. Verify that all environment variables are set correctly
3. Try rebuilding the services: `docker-compose up -d --build`
