# Love Story Web Application

Ứng dụng kỷ niệm tình yêu kỹ thuật số với giao diện tối giản, tương tác cao, cho phép bạn tạo và chia sẻ câu chuyện tình yêu một cách sáng tạo và độc đáo.

![Love Story Preview](./preview.png)

## Tính năng chính

- **Timeline Tình Yêu**: Hiển thị câu chuyện tình yêu theo dòng thời gian với giao diện tương tác.
- **Thư Viện Ảnh**: Lưu trữ và trưng bày kỷ niệm qua hình ảnh với chức năng kéo thả để tải lên.
- **Bản Đồ Tình Yêu**: Đánh dấu các địa điểm đặc biệt trên bản đồ tương tác.
- **Thiệp Kỹ Thuật Số**: Tạo và gửi thiệp kỹ thuật số cho nhau.
- **Đếm Ngược Sự Kiện**: Tạo bộ đếm ngược cho các sự kiện sắp tới.
- **Hỗ trợ Nội Dung HTML**: Tùy chỉnh nội dung mô tả với định dạng phong phú.

## Yêu cầu hệ thống

### Yêu cầu phần cứng
- CPU: 2 lõi trở lên
- RAM: 4GB trở lên
- Ổ cứng: 10GB dung lượng trống

### Yêu cầu phần mềm
- Docker và Docker Compose
- Trình duyệt web hiện đại (Chrome, Firefox, Safari, Edge)
- Git (để clone repository)

## Cài đặt và chạy ứng dụng

### Phương pháp 1: Sử dụng Docker (Khuyến nghị)

1. Clone repository:
   ```bash
   git clone <repository-url>
   cd love-story
   ```

2. Tạo file .env từ .env.example (nếu chưa có):
   ```bash
   cp .env.example .env
   ```

3. Khởi động ứng dụng với Docker Compose:
   ```bash
   docker-compose up -d
   ```

4. Truy cập ứng dụng:
   - Storefront (SF): http://localhost
   - Back Office (BO): http://localhost/admin

### Phương pháp 2: Chạy riêng từng phần

#### Backend (Spring Boot)

1. Đảm bảo cài đặt JDK 17 trở lên và Maven
2. Di chuyển vào thư mục backend:
   ```bash
   cd love-story-backend
   ```

3. Cấp quyền chạy cho script và khởi động:
   ```bash
   chmod +x mvnw run.sh
   ./run.sh
   ```

4. Backend sẽ chạy tại http://localhost:8080

#### Frontend (React)

1. Đảm bảo cài đặt Node.js v16 trở lên
2. Di chuyển vào thư mục gốc và cài đặt dependencies:
   ```bash
   npm install
   ```

3. Khởi động ứng dụng frontend:
   ```bash
   npm run dev
   ```

4. Frontend sẽ chạy tại http://localhost:5173

## Khởi tạo tài khoản

### Tài khoản Back Office (BO)

Để tạo tài khoản admin đầu tiên cho Back Office, sử dụng API sau:

```
POST /api/auth/register
Content-Type: application/json

{
  "username": "admin",
  "email": "admin@example.com",
  "password": "StrongPassword123!",
  "roles": ["admin"]
}
```

Hoặc sử dụng curl:

```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","email":"admin@example.com","password":"StrongPassword123!","roles":["admin"]}'
```

### Tài khoản Storefront (SF)

Tạo tài khoản cho người dùng Storefront:

```
POST /api/auth/register
Content-Type: application/json

{
  "username": "user",
  "email": "user@example.com",
  "password": "UserPassword123!",
  "roles": ["user"]
}
```

Hoặc sử dụng curl:

```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"user","email":"user@example.com","password":"UserPassword123!","roles":["user"]}'
```

### Tài khoản Partner

Tạo tài khoản cho đối tác (có quyền đặc biệt):

```
POST /api/auth/register
Content-Type: application/json

{
  "username": "partner",
  "email": "partner@example.com", 
  "password": "PartnerPassword123!",
  "roles": ["partner"]
}
```

## Đăng nhập

Đăng nhập vào hệ thống:

```
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "StrongPassword123!"
}
```

Phản hồi sẽ bao gồm JWT token để xác thực các yêu cầu API tiếp theo.

## Thiết lập ban đầu

Sau khi đăng nhập vào Back Office với tài khoản admin, bạn cần thiết lập nội dung ban đầu:

1. Tạo mối quan hệ (relationship)
2. Thêm thông tin profile cho cả hai người
3. Thêm các sự kiện vào timeline
4. Tải lên ảnh cho thư viện

## Cấu hình nâng cao

### Sử dụng OpenAI để tạo nội dung

Ứng dụng có tích hợp với OpenAI để tự động tạo nội dung:

1. Đảm bảo bạn đã cung cấp OPENAI_API_KEY trong biến môi trường:
   ```
   OPENAI_API_KEY=your_openai_api_key
   ```

2. Trong Back Office, sử dụng chức năng "AI Content Generator" để tạo mô tả sự kiện, nội dung thiệp, v.v.

### Tùy chỉnh database

Nếu muốn sử dụng database PostgreSQL có sẵn thay vì container Docker:

1. Chỉnh sửa file `application-local.properties` hoặc `application-dev.properties`:
   ```
   spring.datasource.url=jdbc:postgresql://your_db_host:5432/your_db_name
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```

## API Documentation

Tài liệu API đầy đủ có thể truy cập tại:
- Swagger UI: http://localhost:8080/swagger-ui.html
- OpenAPI Spec: http://localhost:8080/v3/api-docs

## Cấu trúc thư mục

```
love-story/
├── client/                  # Frontend React code
├── love-story-backend/      # Spring Boot backend
├── docker-compose.yml       # Docker configuration
├── .env                     # Environment variables
└── README.md                # This documentation
```

## Vấn đề thường gặp

### Backend không kết nối được với database

- Kiểm tra cài đặt PostgreSQL
- Xác nhận thông tin kết nối trong application.properties
- Đảm bảo database đã được tạo

### Upload ảnh lỗi

- Kiểm tra thư mục uploads đã tồn tại và có quyền ghi
- Giới hạn kích thước tối đa mặc định là 10MB

## License

Copyright © 2024 Love Story App. All rights reserved.