# Love Story Application Deployment Guide

This guide provides step-by-step instructions for deploying the Love Story application using:
- Frontend: Vercel
- Backend: Render
- Database: Supabase

## Prerequisites

Before starting the deployment process, ensure you have:

1. Accounts on:
   - [Vercel](https://vercel.com/)
   - [Render](https://render.com/)
   - [Supabase](https://supabase.com/)
2. Git repository with the Love Story application code
3. Git installed on your local machine

## 1. Database Setup on Supabase

Follow the detailed instructions in [supabase-setup.md](./supabase-setup.md) to:
1. Create a Supabase project
2. Get the database connection information
3. Create the connection string for the backend

## 2. Backend Deployment on Render

### 2.1 Connect Your Repository

1. Log in to [Render](https://render.com/)
2. Click "New" and select "Blueprint"
3. Connect your Git repository
4. Select the repository containing the Love Story application

### 2.2 Configure the Service

Render will automatically detect the `render.yaml` file and configure the service accordingly. If not:

1. Click "New" and select "Web Service"
2. Connect your repository
3. Configure the service:
   - Name: `lovestory-backend`
   - Environment: `Docker`
   - Region: `Singapore` (or closest to your users)
   - Branch: `main` (or your deployment branch)
   - Dockerfile Path: `BE/Dockerfile`
   - Plan: Free

### 2.3 Set Environment Variables

In the Render dashboard for your backend service:

1. Go to "Environment"
2. Add the following environment variables:
   - `SPRING_PROFILES_ACTIVE`: `prod`
   - `DATABASE_URL`: Your Supabase connection string (from step 1)
   - `JWT_SECRET`: Generate a secure random string or let Render generate it
   - `PORT`: `8080`

### 2.4 Deploy the Backend

1. Click "Create Web Service"
2. Wait for the deployment to complete
3. Note the service URL (e.g., `https://lovestory-backend.onrender.com`)

## 3. Frontend Deployment on Vercel

### 3.1 Connect Your Repository

1. Log in to [Vercel](https://vercel.com/)
2. Click "Add New" > "Project"
3. Import your Git repository
4. Select the repository containing the Love Story application

### 3.2 Configure the Project

1. In the configuration screen:
   - Framework Preset: `Vite`
   - Root Directory: `FE`
   - Build Command: `npm run build`
   - Output Directory: `dist`

### 3.3 Set Environment Variables

1. Expand "Environment Variables"
2. Add the following:
   - `VITE_API_BASE_URL`: `https://lovestory-backend.onrender.com/api` (use your actual backend URL)
   - `VITE_ENV`: `production`

### 3.4 Deploy the Frontend

1. Click "Deploy"
2. Wait for the deployment to complete
3. Note the deployment URL (e.g., `https://lovestory-frontend.vercel.app`)

## 4. Update CORS Configuration

After deploying both services, you need to update the CORS configuration in the backend to allow requests from your Vercel domain:

1. In the backend code, update `application-prod.properties`:
   ```properties
   app.cors.allowedOrigins=https://lovestory-frontend.vercel.app
   ```
   (Replace with your actual Vercel domain)

2. Commit and push the changes
3. Render will automatically redeploy the backend

## 5. Verify the Deployment

1. Open your Vercel frontend URL in a browser
2. Test the application functionality:
   - User registration and login
   - Data retrieval from the backend
   - Any other core features

## 6. Monitoring and Maintenance

### 6.1 Vercel

1. Go to your project in the Vercel dashboard
2. Check the "Deployments" tab for deployment history
3. Use the "Analytics" tab to monitor usage

### 6.2 Render

1. Go to your service in the Render dashboard
2. Check the "Logs" tab for application logs
3. Monitor resource usage in the "Metrics" tab

### 6.3 Supabase

1. Go to your project in the Supabase dashboard
2. Use the "Database" > "Monitoring" section to track database performance
3. Regularly backup your database

## 7. Troubleshooting

### 7.1 Frontend Issues

- **CORS Errors**: Ensure the backend CORS configuration includes your Vercel domain
- **API Connection Errors**: Verify the `VITE_API_BASE_URL` environment variable is correct

### 7.2 Backend Issues

- **Database Connection Errors**: Check the `DATABASE_URL` environment variable
- **Application Errors**: Review the logs in the Render dashboard

### 7.3 Database Issues

- **Migration Failures**: Check the Flyway migration logs in the backend
- **Performance Issues**: Review the database queries and consider optimizations

## 8. Scaling Considerations

### 8.1 Vercel

- Consider upgrading to a paid plan for:
  - Custom domains
  - Increased build minutes
  - Team collaboration

### 8.2 Render

- Upgrade to a paid plan for:
  - More resources (CPU/RAM)
  - Persistent disk storage
  - Custom domains

### 8.3 Supabase

- Monitor database usage and upgrade if necessary for:
  - More storage
  - Higher connection limits
  - Advanced features

## 9. Continuous Deployment

Both Vercel and Render support automatic deployments when you push changes to your repository:

1. Make changes to your code
2. Commit and push to your repository
3. Vercel and Render will automatically detect changes and redeploy

## 10. Custom Domains (Optional)

### 10.1 Vercel

1. Go to your project settings
2. Click "Domains"
3. Add your custom domain
4. Follow the DNS configuration instructions

### 10.2 Render

1. Go to your service settings
2. Click "Custom Domain"
3. Add your domain
4. Configure DNS records as instructed