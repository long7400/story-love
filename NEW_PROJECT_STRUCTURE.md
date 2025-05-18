# Cấu Trúc Dự Án Love Story Mới

Dưới đây là hướng dẫn chi tiết cho việc tổ chức lại dự án theo cấu trúc mới với hai thư mục chính: `FE` và `BE`.

## Cấu Trúc Thư Mục

```
storylove/
├── FE/                         # Frontend (React + Vite)
│   ├── public/                 # Tài nguyên tĩnh
│   ├── src/                    # Mã nguồn React
│   │   ├── components/         # Thành phần UI
│   │   ├── hooks/              # Custom React hooks
│   │   ├── lib/                # Tiện ích và API client
│   │   ├── pages/              # Các trang
│   │   ├── App.tsx             # Component ứng dụng chính
│   │   ├── index.css           # Styles toàn cục
│   │   └── main.tsx            # Điểm vào ứng dụng
│   ├── .env                    # Biến môi trường (dev)
│   ├── .env.production         # Biến môi trường (prod)
│   ├── nginx.conf              # Cấu hình Nginx cho frontend
│   ├── package.json            # Dependencies
│   ├── tailwind.config.ts      # Cấu hình Tailwind
│   ├── tsconfig.json           # Cấu hình TypeScript
│   ├── vite.config.ts          # Cấu hình Vite
│   └── Dockerfile              # Docker build cho frontend
│
├── BE/                         # Backend (Spring Boot)
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/lovestory/api/
│   │   │   │   ├── config/     # Cấu hình ứng dụng
│   │   │   │   ├── controller/ # API Controllers
│   │   │   │   ├── model/      # Entities
│   │   │   │   ├── repository/ # JPA Repositories
│   │   │   │   ├── security/   # JWT Auth
│   │   │   │   ├── service/    # Business Logic
│   │   │   │   └── Application.java # Entry point
│   │   │   │
│   │   │   └── resources/
│   │   │       ├── db/migration/ # Flyway migrations
│   │   │       ├── application.properties # Cấu hình chính
│   │   │       ├── application-dev.properties # Dev
│   │   │       └── application-prod.properties # Prod
│   │   └── test/                # Unit tests
│   ├── pom.xml                  # Maven dependencies
│   ├── Dockerfile               # Docker build cho backend
│   └── run.sh                   # Script chạy local
│
├── docker-compose.yml         # Cấu hình Docker Compose
└── README.md                  # Tài liệu dự án
```

## Các Bước Triển Khai

### 1. Tạo Thư Mục Gốc

```bash
mkdir -p storylove
cd storylove
```

### 2. Cấu Trúc Frontend (FE)

```bash
mkdir -p FE/public FE/src/components FE/src/hooks FE/src/lib FE/src/pages
```

Di chuyển mã nguồn từ thư mục `client` hiện tại:

```bash
cp -r client/src/* FE/src/
cp -r client/public/* FE/public/
cp client/index.html FE/
```

Tạo/cập nhật các file cấu hình:

```bash
# package.json
cp package.json FE/

# Các file cấu hình khác
cp postcss.config.js tailwind.config.ts tsconfig.json vite.config.ts FE/
cp .env .env.production FE/
```

Cập nhật Dockerfile cho FE:

```bash
cat > FE/Dockerfile << 'EOF'
FROM node:18-alpine as build

WORKDIR /app

# Sao chép package.json và package-lock.json
COPY package*.json ./

# Cài đặt dependencies
RUN npm ci

# Sao chép toàn bộ source code frontend
COPY . .

# Xây dựng ứng dụng
RUN npm run build

# Bước production - sử dụng Nginx để phục vụ trang tĩnh
FROM nginx:alpine

# Sao chép cấu hình Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Sao chép build files từ bước build
COPY --from=build /app/dist /usr/share/nginx/html

# Mở port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
EOF
```

Tạo cấu hình Nginx:

```bash
cat > FE/nginx.conf << 'EOF'
server {
    listen 80;
    server_name localhost;

    location / {
        root /usr/share/nginx/html;
        index index.html index.htm;
        try_files $uri $uri/ /index.html;
    }

    # Chuyển tiếp yêu cầu API đến backend
    location /api/ {
        proxy_pass http://backend:8080/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
EOF
```

### 3. Cấu Trúc Backend (BE)

```bash
mkdir -p BE/src/main/java/com/lovestory/api BE/src/main/resources/db/migration BE/src/test
```

Di chuyển mã nguồn từ thư mục `love-story-backend` hiện tại:

```bash
cp -r love-story-backend/src/main/java/com/lovestory/api/* BE/src/main/java/com/lovestory/api/
cp -r love-story-backend/src/main/resources/* BE/src/main/resources/
cp -r love-story-backend/src/test/* BE/src/test/ # nếu có
```

Cập nhật các file cấu hình:

```bash
cp love-story-backend/pom.xml BE/
cp love-story-backend/mvnw love-story-backend/mvnw.cmd BE/ # nếu có
cp love-story-backend/run.sh BE/ # nếu có
chmod +x BE/run.sh # cấp quyền thực thi
```

Cập nhật Dockerfile cho BE:

```bash
cat > BE/Dockerfile << 'EOF'
FROM maven:3.8.4-openjdk-17-slim AS build

WORKDIR /app

# Sao chép pom.xml
COPY pom.xml .

# Tải dependencies (lớp cache)
RUN mvn dependency:go-offline -B

# Sao chép source code
COPY src ./src

# Build ứng dụng
RUN mvn package -DskipTests

# Bước runtime
FROM openjdk:17-slim

WORKDIR /app

# Sao chép JAR từ bước build
COPY --from=build /app/target/*.jar app.jar

# Thư mục uploads
RUN mkdir -p /app/uploads

# Mở port
EXPOSE 8080

# Chạy ứng dụng
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
EOF
```

### 4. Cấu Hình Docker Compose

```bash
cat > docker-compose.yml << 'EOF'
version: '3.8'

services:
  # Database
  db:
    image: postgres:15-alpine
    container_name: love-story-db
    restart: always
    environment:
      POSTGRES_USER: ${POSTGRES_USER:-postgres}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:-postgres}
      POSTGRES_DB: ${POSTGRES_DB:-lovestory}
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data
    networks:
      - love-story-network

  # Backend
  backend:
    build:
      context: ./BE
      dockerfile: Dockerfile
    container_name: love-story-backend
    restart: always
    depends_on:
      - db
    environment:
      - SPRING_PROFILES_ACTIVE=dev
      - SPRING_DATASOURCE_URL=jdbc:postgresql://db:5432/${POSTGRES_DB:-lovestory}
      - SPRING_DATASOURCE_USERNAME=${POSTGRES_USER:-postgres}
      - SPRING_DATASOURCE_PASSWORD=${POSTGRES_PASSWORD:-postgres}
      - APP_JWT_SECRET=${JWT_SECRET:-loveStorySecretKey2024ThisIsAVeryLongKeyThatIsAtLeast256BitsLongForSecurityRequirements}
      - APP_JWT_EXPIRATION_MS=86400000
      - OPENAI_API_KEY=${OPENAI_API_KEY:-}
    volumes:
      - uploads:/app/uploads
    ports:
      - "8080:8080"
    networks:
      - love-story-network

  # Frontend
  frontend:
    build:
      context: ./FE
      dockerfile: Dockerfile
    container_name: love-story-frontend
    restart: always
    depends_on:
      - backend
    environment:
      - VITE_API_BASE_URL=http://backend:8080/api
    ports:
      - "80:80"
    networks:
      - love-story-network

networks:
  love-story-network:
    driver: bridge

volumes:
  pgdata:
  uploads:
EOF
```

### 5. Tạo README Chính

```bash
cat > README.md << 'EOF'
# Love Story

Ứng dụng kỷ niệm tình yêu kỹ thuật số với giao diện tối giản, tương tác cao.

## Cấu Trúc Dự Án

Dự án được tổ chức thành hai phần riêng biệt:
- `FE/`: Mã nguồn frontend (React/Vite)
- `BE/`: Mã nguồn backend (Spring Boot)

## Cài Đặt và Chạy

### Sử Dụng Docker Compose (Khuyến nghị)

```bash
# Clone repository
git clone <repository-url>
cd storylove

# Tạo file .env nếu cần
touch .env

# Khởi động ứng dụng
docker-compose up -d
```

Truy cập ứng dụng:
- Storefront: http://localhost
- Back Office: http://localhost/admin
- Swagger UI: http://localhost:8080/swagger-ui.html

### Chạy Frontend Riêng

```bash
cd FE
npm install
npm run dev
```

Frontend sẽ chạy tại http://localhost:5173

### Chạy Backend Riêng

```bash
cd BE
./run.sh
```

Backend sẽ chạy tại http://localhost:8080
EOF
```

## Điểm Quan Trọng Cần Lưu Ý

1. Cập nhật đường dẫn API trong frontend để trỏ đến backend mới
2. Đảm bảo các biến môi trường được cấu hình đúng trong Docker Compose
3. Kiểm tra kết nối giữa frontend và backend
4. Đảm bảo tất cả thư viện và dependencies được cài đặt đúng

## Kiểm Tra Sau Khi Di Chuyển

1. Khởi động Docker Compose:
   ```bash
   docker-compose up -d
   ```

2. Kiểm tra log của các container:
   ```bash
   docker-compose logs -f
   ```

3. Truy cập ứng dụng để đảm bảo mọi thứ hoạt động đúng