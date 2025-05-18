# Hướng Dẫn Sử Dụng Swagger UI

Tài liệu này cung cấp hướng dẫn chi tiết về cách sử dụng Swagger UI để tìm hiểu và thử nghiệm API của hệ thống Love Story.

## Swagger UI là gì?

Swagger UI là công cụ trực quan giúp bạn:
- Khám phá tất cả các API endpoint có sẵn
- Hiểu cách sử dụng từng API với tài liệu chi tiết
- Thử nghiệm các API trực tiếp từ giao diện web
- Xem cấu trúc dữ liệu yêu cầu và phản hồi

## Truy cập Swagger UI

### Môi trường phát triển (local)
```
http://localhost:8080/swagger-ui.html
```

### Môi trường production
```
https://api.yourdomain.com/swagger-ui.html
```

## Cách sử dụng Swagger UI

### 1. Khám phá tài liệu API

Khi truy cập Swagger UI, bạn sẽ thấy tất cả các API được phân loại theo controller:

- **Auth Controller**: API xác thực và quản lý người dùng
- **Profile Controller**: API quản lý hồ sơ người dùng
- **Relationship Controller**: API quản lý mối quan hệ
- **Event Controller**: API quản lý sự kiện timeline
- **Photo Controller**: API quản lý thư viện ảnh
- **Location Marker Controller**: API quản lý điểm đánh dấu trên bản đồ
- **Postcard Controller**: API quản lý thiệp kỹ thuật số
- **Countdown Controller**: API quản lý đếm ngược sự kiện
- **File Controller**: API upload và download file

Bạn có thể mở rộng từng controller để xem chi tiết các API endpoint.

### 2. Xác thực với Swagger UI

대부분의 API는 인증이 필요합니다. Swagger UI에서 인증하는 방법:

1. Nhấn vào nút "Authorize" (biểu tượng khóa) ở góc trên bên phải
2. Nhập JWT token theo định dạng:
   ```
   Bearer your_jwt_token
   ```
3. Nhấn "Authorize" để lưu token

**Lưu ý**: Để có JWT token, bạn cần gọi API đăng nhập (`/api/auth/login`) trước.

### 3. Thử nghiệm API

Để thử nghiệm một API:

1. Chọn API endpoint bạn muốn thử
2. Nhấn nút "Try it out"
3. Điền thông tin yêu cầu (request body, parameters...)
4. Nhấn "Execute" để gửi yêu cầu
5. Xem kết quả phản hồi bên dưới

### 4. Hiểu cấu trúc Schema

Swagger UI hiển thị chi tiết về cấu trúc dữ liệu của:
- Request body: Dữ liệu cần gửi đi
- Response: Dữ liệu nhận về
- Models: Các mô hình dữ liệu được sử dụng

Bạn có thể mở rộng phần "Schema" để xem chi tiết cấu trúc dữ liệu.

## Ví dụ sử dụng Swagger UI

### Đăng ký người dùng mới

1. Mở rộng Auth Controller
2. Chọn endpoint POST `/api/auth/register`
3. Nhấn "Try it out"
4. Nhập thông tin đăng ký:
   ```json
   {
     "username": "newuser",
     "email": "user@example.com",
     "password": "Password123!",
     "roles": ["user"]
   }
   ```
5. Nhấn "Execute" và xem kết quả

### Đăng nhập

1. Mở rộng Auth Controller
2. Chọn endpoint POST `/api/auth/login`
3. Nhấn "Try it out"
4. Nhập thông tin đăng nhập:
   ```json
   {
     "username": "newuser",
     "password": "Password123!"
   }
   ```
5. Nhấn "Execute" và lưu token từ phản hồi
6. Nhấn "Authorize" và nhập token theo định dạng `Bearer your_jwt_token`

### Tạo sự kiện mới

1. Xác thực với JWT token trước (như hướng dẫn ở trên)
2. Mở rộng Event Controller
3. Chọn endpoint POST `/api/events`
4. Nhấn "Try it out"
5. Nhập thông tin sự kiện:
   ```json
   {
     "title": "Lần đầu gặp nhau",
     "date": "2023-05-15",
     "shortDescription": "Gặp nhau lần đầu tại quán cà phê",
     "fullDescription": "Chi tiết về buổi hẹn đầu tiên của chúng mình...",
     "imageUrl": "https://example.com/image.jpg",
     "htmlEnabled": true,
     "relationship": {
       "id": 1
     }
   }
   ```
6. Nhấn "Execute" và xem kết quả

## Lưu ý khi sử dụng Swagger UI

1. **Bảo mật**: Không sử dụng Swagger UI trong môi trường production public mà không có bảo vệ truy cập
2. **Xác thực**: JWT token sẽ hết hạn sau một thời gian, bạn cần đăng nhập lại để có token mới
3. **Thử nghiệm thận trọng**: Cẩn thận khi thử nghiệm các API DELETE hoặc UPDATE vì chúng sẽ thay đổi dữ liệu thực

## Tích hợp với Postman

Bạn có thể dễ dàng nhập API từ Swagger vào Postman:

1. Truy cập API docs tại `/v3/api-docs`
2. Lưu nội dung JSON
3. Trong Postman, chọn "Import" > "Raw text" và dán JSON

## Hỗ trợ và Liên hệ

Nếu bạn gặp vấn đề khi sử dụng Swagger UI hoặc API, vui lòng liên hệ với đội ngũ phát triển qua email support@lovestory.com.