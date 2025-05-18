# Love Story Backend - Spring Boot

Backend của ứng dụng Love Story được xây dựng bằng Spring Boot, cung cấp REST API cho ứng dụng frontend.

## Cấu trúc dự án

```
love-story-backend/
├── src/main/java/com/lovestory/api/
│   ├── config/             # Cấu hình ứng dụng (CORS, Security, OpenAPI)
│   ├── controller/         # API Controllers
│   ├── model/              # Entities
│   ├── payload/            # Request/Response DTOs
│   ├── repository/         # JPA Repositories
│   ├── security/           # JWT Authentication
│   ├── service/            # Business Logic
│   └── Application.java    # Main application
├── src/main/resources/
│   ├── db/migration/       # Flyway database migrations
│   └── application.properties  # Configuration
├── pom.xml                 # Maven dependencies
├── Dockerfile              # Docker build configuration
├── run.sh                  # Run script cho local development
└── README.md               # Documentation
```

## Cách chạy backend

### Sử dụng Docker

Cách đơn giản nhất để chạy backend:

```bash
cd love-story-backend
docker build -t love-story-backend .
docker run -p 8080:8080 love-story-backend
```

### Sử dụng Docker Compose (Khuyến nghị)

Từ thư mục gốc của dự án:

```bash
docker-compose up -d backend
```

Backend sẽ chạy tại http://localhost:8080

### Chạy trong môi trường phát triển

```bash
cd love-story-backend
chmod +x mvnw run.sh
./run.sh
```

## Cấu hình

Backend được cấu hình thông qua các file:

- `application.properties`: Cấu hình chung
- `application-local.properties`: Cấu hình cho môi trường local
- `application-dev.properties`: Cấu hình cho môi trường development

## API Documentation

Swagger UI được cấu hình sẵn và có thể truy cập tại:

```
http://localhost:8080/swagger-ui.html
```

OpenAPI specification có thể truy cập tại:

```
http://localhost:8080/v3/api-docs
```

## Kết nối với database

Backend sử dụng PostgreSQL và được cấu hình tự động kết nối với database container khi sử dụng Docker Compose.

Nếu muốn kết nối với PostgreSQL chạy bên ngoài Docker, cấu hình trong `application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/lovestory
spring.datasource.username=postgres
spring.datasource.password=yourpassword
```

## Khởi tạo dữ liệu ban đầu

Để tạo tài khoản admin ban đầu:

```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","email":"admin@example.com","password":"Admin@123","roles":["admin"]}'
```

## Tích hợp OpenAI

Để sử dụng tính năng AI, thêm API key vào biến môi trường hoặc cấu hình:

```properties
openai.api.key=your_openai_api_key
```

## Lưu ý quan trọng

- Backend và frontend có thể được chạy độc lập
- API sẽ được phục vụ tại đường dẫn `/api`
- JWT token được sử dụng để xác thực, có thời hạn mặc định là 24 giờ