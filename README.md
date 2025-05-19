# Love Story Website Deployment Guide

This guide provides instructions on how to deploy the Love Story Website and make it publicly accessible while keeping Docker images private.

## Prerequisites

- Docker and Docker Compose installed on your server
- A server with a public IP address or domain name
- Ports 80 (HTTP) and 8080 (API) open on your server's firewall

## Deployment Steps

1. Clone or download this repository to your server
2. Navigate to the project directory
3. Run the deployment script:
   - On Linux/Mac: `./deploy.sh`
   - On Windows: `deploy.bat`

The script will:
- Stop any running containers
- Build the Docker images locally (keeping them private)
- Start the containers in detached mode

## Accessing the Website

After deployment, you can access the website using your server's IP address or domain name:

- Frontend: `http://YOUR_SERVER_IP`
- Backend API: `http://YOUR_SERVER_IP:8080`
- Swagger UI: `http://YOUR_SERVER_IP:8080/swagger-ui.html`

## Configuration

The application is configured using environment variables in the `.env` file. You can modify these variables to customize the application:

- Database settings
- JWT secret and expiration
- API keys
- CORS settings

## Useful Commands

- Check if containers are running: `docker-compose ps`
- View logs: `docker-compose logs -f`
- Stop the services: `docker-compose down`

## Deployment Options

### Local Deployment

Follow the steps in the "Deployment Steps" section above to deploy the application locally using Docker.

### GitHub Codespaces Deployment

For development and testing in a cloud environment, you can deploy the application to GitHub Codespaces. See [github-codespaces-guide.md](github-codespaces-guide.md) for detailed instructions.

## Security Considerations

- The Docker images are built locally and not pushed to any public registry, keeping them private
- By default, the API allows requests from all origins (`*`). You can restrict this by modifying the `ALLOWED_ORIGINS` environment variable in the `docker-compose.yml` file
- Make sure to use strong passwords for the database and JWT secret in production

## Troubleshooting

If you encounter any issues:

1. Check the logs: `docker-compose logs -f`
2. Ensure all containers are running: `docker-compose ps`
3. Verify that ports 80 and 8080 are open on your server's firewall
4. Check that the environment variables are set correctly in the `.env` file
