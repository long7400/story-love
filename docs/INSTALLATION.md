# Hướng Dẫn Cài Đặt Ứng Dụng Love Story

Tài liệu này cung cấp hướng dẫn chi tiết về cách cài đặt và chạy ứng dụng Love Story trên môi trường phát triển và sản xuất.

## Yêu cầu hệ thống

### Hệ thống cơ bản
- CPU: 2 lõi trở lên
- RAM: Tối thiểu 4GB
- Ổ cứng: Tối thiểu 10GB dung lượng trống

### Phần mềm
- Docker 20.10 trở lên
- Docker Compose 2.0 trở lên
- Git 2.30 trở lên

## Cài đặt với Docker (Khuyến nghị)

Docker là cách dễ nhất để khởi chạy ứng dụng Love Story với đầy đủ các thành phần cần thiết.

### Bước 1: Clone Repository

```bash
git clone <repository-url>
cd love-story
```

### Bước 2: Cấu hình môi trường

Tạo file `.env` và thiết lập các biến môi trường:

```bash
cp .env.example .env
```

Chỉnh sửa file `.env` để phù hợp với yêu cầu của bạn:

```
# Database
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_secure_password
POSTGRES_DB=lovestory

# JWT
JWT_SECRET=your_secure_jwt_secret_key
JWT_EXPIRATION_MS=86400000

# OpenAI (tùy chọn, cho các tính năng AI)
OPENAI_API_KEY=your_openai_api_key
```

### Bước 3: Khởi động ứng dụng

```bash
docker-compose up -d
```

Quá trình này sẽ:
1. Tạo và khởi động container PostgreSQL
2. Xây dựng và khởi động Spring Boot backend
3. Xây dựng và khởi động React frontend với Nginx

### Bước 4: Kiểm tra hoạt động

Sau khi hoàn tất, bạn có thể truy cập:
- Storefront (SF): http://localhost
- Back Office (BO): http://localhost/admin

## Cài đặt từng thành phần riêng biệt

Nếu bạn muốn cài đặt và phát triển từng thành phần riêng biệt, hãy làm theo các hướng dẫn sau.

### Backend (Spring Boot)

#### Yêu cầu
- JDK 17 trở lên
- Maven 3.8 trở lên
- PostgreSQL 15 trở lên

#### Bước 1: Cài đặt PostgreSQL

Đảm bảo PostgreSQL đang chạy và đã tạo database với tên "lovestory".

#### Bước 2: Cấu hình kết nối cơ sở dữ liệu

Mở file `love-story-backend/src/main/resources/application-local.properties` và chỉnh sửa thông tin kết nối database:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/lovestory
spring.datasource.username=postgres
spring.datasource.password=your_password
```

#### Bước 3: Chạy ứng dụng backend

```bash
cd love-story-backend
chmod +x mvnw run.sh
./run.sh
```

Backend sẽ khởi động tại http://localhost:8080

### Frontend (React)

#### Yêu cầu
- Node.js 16 trở lên
- npm 8 trở lên

#### Bước 1: Cài đặt dependencies

```bash
cd love-story
npm install
```

#### Bước 2: Cấu hình API URL

Tạo file `.env.local` trong thư mục gốc:

```
VITE_API_BASE_URL=http://localhost:8080/api
```

#### Bước 3: Khởi động ứng dụng frontend

```bash
npm run dev
```

Frontend sẽ khởi động tại http://localhost:5173

## Khởi tạo dữ liệu ban đầu

Sau khi cài đặt thành công, bạn cần khởi tạo dữ liệu ban đầu cho ứng dụng.

### Tạo tài khoản admin

Sử dụng API bên dưới để tạo tài khoản admin:

```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","email":"admin@lovestory.com","password":"Admin@123","roles":["admin"]}'
```

### Đăng nhập vào Back Office

1. Truy cập http://localhost/admin
2. Đăng nhập với thông tin:
   - Username: admin
   - Password: Admin@123

### Thiết lập nội dung ban đầu

Sau khi đăng nhập vào Back Office, thực hiện các bước sau:

1. Tạo mối quan hệ (relationship)
2. Thêm hồ sơ cá nhân (profile) cho bạn và người yêu
3. Thêm các sự kiện (events) vào timeline
4. Tải lên ảnh (photos) cho thư viện

## Tùy chỉnh nâng cao

### Sử dụng HTTPS

Để cấu hình HTTPS, bạn cần:

1. Chuẩn bị chứng chỉ SSL (cert.pem và key.pem)
2. Cập nhật cấu hình Nginx trong `nginx.conf`:

```nginx
server {
    listen 443 ssl;
    server_name your-domain.com;
    
    ssl_certificate /etc/nginx/ssl/cert.pem;
    ssl_certificate_key /etc/nginx/ssl/key.pem;
    
    # Các cấu hình khác...
}
```

3. Cập nhật docker-compose.yml để mount chứng chỉ SSL:

```yaml
frontend:
  # Cấu hình khác...
  volumes:
    - ./ssl:/etc/nginx/ssl
```

### Sao lưu và phục hồi dữ liệu

#### Sao lưu database

```bash
docker exec love-story-db pg_dump -U postgres lovestory > backup.sql
```

#### Phục hồi database

```bash
cat backup.sql | docker exec -i love-story-db psql -U postgres -d lovestory
```

## Khắc phục sự cố

### Backend không kết nối được với database

1. Kiểm tra thông tin kết nối trong application.properties
2. Đảm bảo PostgreSQL đang chạy và database đã được tạo
3. Kiểm tra quyền truy cập của người dùng database

### Lỗi "Unauthorized" khi gọi API

1. Đảm bảo đã đăng nhập và nhận JWT token
2. Kiểm tra token trong localStorage của trình duyệt
3. Đảm bảo token chưa hết hạn

### Không thể tải ảnh lên

1. Kiểm tra thư mục uploads đã tồn tại và có quyền ghi
2. Kiểm tra kích thước ảnh (tối đa 10MB)
3. Xác nhận định dạng ảnh được hỗ trợ (JPG, PNG, GIF)

## Hỗ trợ và liên hệ

Nếu bạn gặp vấn đề khi cài đặt hoặc sử dụng ứng dụng Love Story, vui lòng:

1. Kiểm tra tài liệu này và các tài liệu khác trong thư mục `/docs`
2. Liên hệ với đội ngũ phát triển qua email support@lovestory.com