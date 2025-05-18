# Love Story Website

Nền tảng số thân mật dành cho các cặp đôi giúp họ lưu giữ và chia sẻ câu chuyện tình yêu của mình qua các trải nghiệm tương tác sáng tạo được hỗ trợ bởi công nghệ.

## Cấu trúc dự án

Dự án được tổ chức thành hai phần chính:

- **BE**: Backend Spring Boot Java
  - REST API
  - Xác thực và phân quyền
  - Kết nối cơ sở dữ liệu PostgreSQL
  - Tích hợp OpenAI

- **FE**: Frontend React + Node.js API
  - Giao diện người dùng React
  - API Node.js
  - Tích hợp với BE

## Công nghệ sử dụng

- **Frontend**:
  - React.js với TypeScript
  - Tailwind CSS
  - Vite
  - Các component tương tác với chủ đề tình yêu và micro-animations

- **Backend**:
  - Spring Boot Java
  - Node.js Express (API trung gian)
  - PostgreSQL

## Tính năng chính

- **Dòng thời gian mối quan hệ**: Hiển thị các sự kiện quan trọng theo thứ tự thời gian
- **Thư viện ảnh**: Lưu trữ và hiển thị khoảnh khắc đáng nhớ
- **Bảng điều khiển tâm trạng**: Trực quan hóa cảm xúc của cặp đôi theo thời gian
- **Trích dẫn tình yêu**: Hiển thị các trích dẫn lãng mạn với hiệu ứng chuyển đổi
- **Nhịp tim cột mốc**: Theo dõi các mốc quan trọng trong mối quan hệ với hiệu ứng nhịp tim
- **Bản đồ tình yêu**: Hiển thị các địa điểm quan trọng của cặp đôi
- **Thẻ bưu thiếp**: Tạo và chia sẻ các bưu thiếp tình yêu cá nhân hóa

## Triển khai

Dự án được cấu hình để triển khai dễ dàng bằng Docker:

```bash
docker-compose up -d
```

Sau khi triển khai:
- Frontend: http://localhost
- Backend: http://localhost:8080
- API Documentation: http://localhost:8080/swagger-ui.html

## Phát triển

### Frontend

```bash
cd FE
npm install
npm run dev
```

### Backend (Spring Boot)

```bash
cd BE
./mvnw spring-boot:run
```

## Tài liệu

Xem thêm tài liệu chi tiết trong thư mục `docs`:

- [Cài đặt](docs/INSTALLATION.md)
- [Tài liệu API](docs/API_DOCUMENTATION.md)
- [Hướng dẫn Back Office](docs/BACK_OFFICE_GUIDE.md)
- [Tích hợp OpenAI](docs/OPENAI_INTEGRATION.md)
- [Hướng dẫn Swagger](docs/SWAGGER_GUIDE.md)