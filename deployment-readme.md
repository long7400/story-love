# Deployment Configuration Branch

This branch contains configuration files and documentation for deploying the Love Story application on the following platforms:
- Frontend: Vercel
- Backend: Render
- Database: Supabase

## Files Added/Modified

### Frontend (Vercel) Configuration
- `FE/vercel.json` - Configuration file for Vercel deployment
- `FE/.env.production` - Updated environment variables for production deployment

### Backend (Render) Configuration
- `render.yaml` - Configuration file for Render deployment
- `BE/src/main/resources/application-prod.properties` - Production environment configuration

### Database (Supabase) Configuration
- `supabase-setup.md` - Instructions for setting up Supabase database

### Documentation
- `deployment-guide.md` - Comprehensive guide for deploying the application
- `deployment-readme.md` - This file

## Deployment Overview

The deployment configuration in this branch enables:

1. **Frontend on Vercel**
   - Automatic builds from the repository
   - API proxy configuration to the backend
   - Optimized caching for static assets

2. **Backend on Render**
   - Docker-based deployment
   - Environment variable configuration
   - Health check endpoint

3. **Database on Supabase**
   - PostgreSQL database
   - Automatic migrations with Flyway
   - Secure connection configuration

## How to Use

1. Merge this branch into your main branch
2. Follow the instructions in `deployment-guide.md` to deploy the application
3. Use `supabase-setup.md` for database configuration

## Important Notes

- Environment variables need to be set in the respective platforms
- CORS configuration needs to be updated with actual domain names
- Database connection string should be kept secure

## Testing

Before deploying to production:
1. Test the frontend-backend communication
2. Verify database migrations work correctly
3. Check all application features in the deployed environment

## Support

For any issues or questions regarding deployment, please refer to the documentation or contact the development team.