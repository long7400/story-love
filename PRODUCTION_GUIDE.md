# Hướng dẫn build và triển khai Love Story cho Production

Tài liệu này cung cấp hướng dẫn chi tiết để build và triển khai ứng dụng Love Story lên môi trường production.

## 1. Chuẩn bị trước khi build

### Kiểm tra môi trường
Đảm bảo các công cụ đã được cài đặt:
- Node.js (phiên bản 18+)
- Java JDK 17+
- Maven
- Docker và Docker Compose (nếu sử dụng Docker)

### Cấu hình biến môi trường
1. Tạo file `.env.production` trong thư mục gốc với các thông số:
```
VITE_API_BASE_URL=https://your-production-api-domain.com
NODE_ENV=production
```

2. Tạo file `BE/.env.production` với thông tin kết nối cơ sở dữ liệu production:
```
SPRING_DATASOURCE_URL=jdbc:postgresql://your-db-host:5432/lovestory_prod
SPRING_DATASOURCE_USERNAME=your_db_user
SPRING_DATASOURCE_PASSWORD=your_db_password
SPRING_PROFILES_ACTIVE=prod
JWT_SECRET=your_secure_jwt_secret_key
JWT_EXPIRATION_MS=86400000
```

## 2. Build Frontend (FE)

### Build thủ công
```bash
# Di chuyển đến thư mục frontend
cd FE

# Cài đặt dependencies
npm install

# Build cho production
npm run build

# Kết quả build sẽ được tạo trong thư mục FE/dist
```

### Build với Docker
```bash
# Build Docker image cho frontend
docker build -t lovestory-frontend:latest -f Dockerfile.fe .
```

## 3. Build Backend (BE)

### Build thủ công với Maven
```bash
# Di chuyển đến thư mục backend
cd BE

# Build package
./mvnw clean package -Pprod -DskipTests

# File JAR sẽ được tạo trong thư mục BE/target
```

### Build với Docker
```bash
# Build Docker image cho backend
docker build -t lovestory-backend:latest -f Dockerfile.be .
```

## 4. Cấu hình Database cho Production

### Tạo cơ sở dữ liệu production
```sql
CREATE DATABASE lovestory_prod;
CREATE USER lovestory_user WITH ENCRYPTED PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE lovestory_prod TO lovestory_user;
```

### Chuẩn bị cơ sở dữ liệu
Backend sẽ tự động thực hiện migration khi khởi động nhờ Flyway. Không cần thao tác thêm.

## 5. Triển khai với Docker Compose

Tạo file `docker-compose.prod.yml` trong thư mục gốc:

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:14-alpine
    container_name: lovestory-postgres
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
      - POSTGRES_USER=${POSTGRES_USER}
      - POSTGRES_DB=${POSTGRES_DB}
    restart: always
    networks:
      - lovestory-network

  backend:
    image: lovestory-backend:latest
    container_name: lovestory-backend
    depends_on:
      - postgres
    environment:
      - SPRING_DATASOURCE_URL=jdbc:postgresql://postgres:5432/${POSTGRES_DB}
      - SPRING_DATASOURCE_USERNAME=${POSTGRES_USER}
      - SPRING_DATASOURCE_PASSWORD=${POSTGRES_PASSWORD}
      - SPRING_PROFILES_ACTIVE=prod
      - JWT_SECRET=${JWT_SECRET}
      - JWT_EXPIRATION_MS=${JWT_EXPIRATION_MS}
    restart: always
    networks:
      - lovestory-network

  frontend:
    image: lovestory-frontend:latest
    container_name: lovestory-frontend
    depends_on:
      - backend
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/conf:/etc/nginx/conf.d
      - ./nginx/ssl:/etc/nginx/ssl
    restart: always
    networks:
      - lovestory-network

volumes:
  postgres_data:

networks:
  lovestory-network:
    driver: bridge
```

### Khởi động các container
```bash
# Khởi động với Docker Compose
docker-compose -f docker-compose.prod.yml up -d
```

## 6. Triển khai lên các dịch vụ cloud

### AWS
1. Tạo RDS PostgreSQL instance
2. Tạo EC2 instance hoặc ECS cluster
3. Cấu hình Security Groups để cho phép traffic
4. Triển khai backend lên EC2 hoặc ECS
5. Cấu hình S3 + CloudFront cho frontend tĩnh

### Digital Ocean
1. Tạo Managed Database PostgreSQL
2. Tạo Droplets hoặc App Platform
3. Cấu hình Firewall
4. Triển khai backend lên Droplets hoặc App Platform
5. Cấu hình Spaces + CDN cho frontend tĩnh

## 7. Cấu hình Nginx cho Production

Tạo file Nginx configuration (`nginx/conf/default.conf`):

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    
    # Redirect HTTP to HTTPS
    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl;
    server_name your-domain.com www.your-domain.com;
    
    ssl_certificate /etc/nginx/ssl/cert.pem;
    ssl_certificate_key /etc/nginx/ssl/key.pem;
    
    # Frontend static files
    location / {
        root /usr/share/nginx/html;
        try_files $uri $uri/ /index.html;
        
        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 30d;
            add_header Cache-Control "public, no-transform";
        }
    }
    
    # Backend API proxy
    location /api {
        proxy_pass http://backend:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # WebSocket support
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

## 8. Kiểm tra sau khi triển khai

- Truy cập frontend tại địa chỉ: `https://your-domain.com`
- Kiểm tra API endpoint tại: `https://your-domain.com/api/love-story-data`
- Kiểm tra khả năng đăng nhập quản trị tại: `https://your-domain.com/admin`

## 9. Bảo trì và nâng cấp

### Cập nhật Frontend
```bash
cd FE
git pull
npm install
npm run build
# Cập nhật nội dung trong container hoặc triển khai lại
```

### Cập nhật Backend
```bash
cd BE
git pull
./mvnw clean package -Pprod -DskipTests
# Khởi động lại dịch vụ
```

## 10. Sao lưu và khôi phục

### Sao lưu cơ sở dữ liệu
```bash
# Sao lưu PostgreSQL
pg_dump -h your-db-host -U your_db_user -d lovestory_prod -F c -f backup_$(date +%Y%m%d).dump
```

### Khôi phục cơ sở dữ liệu
```bash
# Khôi phục PostgreSQL
pg_restore -h your-db-host -U your_db_user -d lovestory_prod -c backup_file.dump
```

---

## Các lỗi thường gặp và cách khắc phục

### Frontend không kết nối được với Backend
- Kiểm tra cài đặt CORS trong backend
- Xác nhận Nginx đã cấu hình đúng proxy_pass
- Kiểm tra biến môi trường VITE_API_BASE_URL

### Backend không kết nối được với Database
- Kiểm tra thông tin kết nối trong biến môi trường 
- Xác nhận database đã được tạo và user có quyền truy cập
- Đảm bảo port 5432 được mở

### Sự cố xác thực JWT
- Kiểm tra JWT_SECRET giống nhau giữa môi trường development và production
- Xác nhận thời hạn token hợp lý (JWT_EXPIRATION_MS)