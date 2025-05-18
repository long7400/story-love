# Love Story

Ứng dụng kỷ niệm tình yêu kỹ thuật số với giao diện tối giản, tương tác cao, cho phép bạn tạo và chia sẻ câu chuyện tình yêu một cách sáng tạo và độc đáo.

## Cấu Trúc Dự Án

Dự án được tổ chức thành hai phần riêng biệt:
- `FE/`: Mã nguồn frontend (React/Vite)
- `BE/`: Mã nguồn backend (Spring Boot)

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

## Tài liệu API

Chi tiết về các API có thể truy cập qua Swagger UI tại:
- http://localhost:8080/swagger-ui.html

## Tích hợp OpenAI

Để sử dụng tính năng tích hợp OpenAI:

1. Đảm bảo bạn đã thêm API key vào biến môi trường:
   ```
   OPENAI_API_KEY=your_api_key
   ```

2. Trong Back Office, sử dụng các tính năng tạo nội dung tự động cho timeline và gallery.

## Hỗ trợ và liên hệ

Nếu bạn gặp vấn đề khi cài đặt hoặc sử dụng ứng dụng, vui lòng xem thêm các tài liệu trong thư mục `/docs`.