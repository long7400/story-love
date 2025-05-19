# Supabase Database Setup for Love Story Application

This document provides instructions for setting up a Supabase database for the Love Story application.

## 1. Create a Supabase Project

1. Sign up or log in to [Supabase](https://supabase.com/)
2. Create a new project with the following settings:
   - Name: `lovestory-db` (or your preferred name)
   - Database Password: Create a strong password
   - Region: Select the region closest to your users (preferably Singapore for best performance with Render)
   - Pricing Plan: Free tier

## 2. Get Connection Information

After creating the project, go to the project dashboard:

1. Navigate to Project Settings > Database
2. Find the connection information section
3. Note the following details:
   - Host: `[your-project-id].supabase.co`
   - Database Name: `postgres`
   - Port: `5432`
   - User: `postgres`
   - Password: (the password you set when creating the project)

## 3. Create Connection String

Format your PostgreSQL connection string as follows:

```
jdbc:postgresql://[host]:[port]/[database]?user=[user]&password=[password]
```

Example:
```
jdbc:postgresql://db.abcdefghijkl.supabase.co:5432/postgres?user=postgres&password=your-password
```

## 4. Configure Render Environment Variables

In the Render dashboard for your backend service:

1. Go to Environment
2. Add the following environment variable:
   - Key: `DATABASE_URL`
   - Value: Your PostgreSQL connection string from step 3

## 5. Initial Database Setup

The application uses Flyway for database migrations, which will automatically create the necessary tables and schema when the application starts.

However, if you need to manually initialize the database, you can use the SQL script below:

```sql
-- Create extensions (if not already enabled in Supabase)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create schema version table for Flyway
CREATE TABLE IF NOT EXISTS flyway_schema_history (
    installed_rank INT NOT NULL PRIMARY KEY,
    version VARCHAR(50),
    description VARCHAR(200) NOT NULL,
    type VARCHAR(20) NOT NULL,
    script VARCHAR(1000) NOT NULL,
    checksum INT,
    installed_by VARCHAR(100) NOT NULL,
    installed_on TIMESTAMP NOT NULL DEFAULT now(),
    execution_time INT NOT NULL,
    success BOOLEAN NOT NULL
);

-- Create initial admin user (optional)
-- Note: This is just an example. The password should be properly hashed in production.
INSERT INTO users (id, username, email, password, role, created_at, updated_at)
VALUES (
    uuid_generate_v4(),
    'admin',
    'admin@lovestory.com',
    crypt('admin123', gen_salt('bf')),
    'ADMIN',
    now(),
    now()
) ON CONFLICT DO NOTHING;
```

## 6. Database Backup and Restore

### Backup

To backup your Supabase database:

1. Go to the Supabase dashboard > Database
2. Click on "Backups"
3. Click "Create backup"
4. Download the backup file when it's ready

### Restore

To restore from a backup:

1. Contact Supabase support for assistance with restoring a backup
2. For development purposes, you can use the SQL export to recreate the database structure

## 7. Security Recommendations

1. Enable Row Level Security (RLS) for all tables
2. Create specific database roles with limited permissions
3. Use Supabase's built-in authentication if possible
4. Regularly rotate database passwords
5. Enable SSL for database connections