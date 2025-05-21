# Love Story Application - Deployment Guide

This document provides a comprehensive guide for deploying the Love Story application to a VPS using Docker.

## Overview of Changes

The following changes have been made to prepare the application for deployment:

1. **Docker Configuration**
   - Created `docker-compose.yml` to orchestrate the services (backend, frontend, and database)
   - Configured the backend service to use environment variables for sensitive information
   - Configured the frontend service to use Nginx for serving the application
   - Set up volumes for persistent data storage

2. **Security Enhancements**
   - Removed hardcoded JWT secret key from application properties
   - Removed hardcoded database credentials from application properties
   - Created AdminInitializer to securely create admin user on first run
   - Configured CORS for production environment
   - Set up SSL/TLS with secure ciphers in Nginx
   - Added security headers to Nginx configuration

3. **Environment Configuration**
   - Created `.env.example` template for environment variables
   - Added environment variables for database, JWT, admin credentials, and CORS
   - Updated `.gitignore` to exclude sensitive files

4. **Documentation**
   - Created comprehensive README with deployment instructions
   - Added troubleshooting section for common issues

## Deployment Steps

Follow these steps to deploy the application to your VPS:

1. **Prepare the VPS**
   - Install Docker and Docker Compose
   - Set up a domain name pointing to your VPS
   - Obtain SSL certificates for your domain

2. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/story-love.git
   cd story-love
   ```

3. **Configure Environment Variables**
   ```bash
   cp .env.example .env
   ```
   Edit the `.env` file with your production values:
   - Set strong passwords for database and admin user
   - Generate a secure random string for JWT_SECRET
   - Update CORS_ALLOWED_ORIGINS with your domain
   - Set your domain name

4. **Set Up SSL Certificates**
   ```bash
   mkdir -p ssl
   # Copy your SSL certificates to the ssl directory
   ```

5. **Nginx Configuration**
   The Nginx configuration is already set up for the domain `togetherforever.site`. If you need to use a different domain, edit the `nginx/nginx.conf` file to replace `togetherforever.site` with your actual domain name.

6. **Build and Start the Services**
   ```bash
   docker-compose up -d
   ```

7. **Verify the Deployment**
   Visit your domain in a web browser to verify that the application is running correctly.

## Security Considerations

1. **Environment Variables**
   - Keep your `.env` file secure and never commit it to version control
   - Use strong, unique passwords for database and admin user
   - Use a long, random string for JWT secret

2. **Network Security**
   - Configure your VPS firewall to only allow necessary ports (80, 443)
   - Consider using a reverse proxy like Nginx or Traefik for additional security

3. **Regular Maintenance**
   - Keep your Docker images and host system updated with security patches
   - Regularly backup your database
   - Monitor logs for suspicious activity

## Backup and Restore

### Database Backup
```bash
docker-compose exec db pg_dump -U postgres lovestory > backup.sql
```

### Database Restore
```bash
cat backup.sql | docker-compose exec -T db psql -U postgres -d lovestory
```

## Troubleshooting

See the README.md file for detailed troubleshooting steps for common issues.

## Conclusion

The Love Story application is now configured for secure deployment to a VPS using Docker. The configuration follows best practices for security, performance, and maintainability.
