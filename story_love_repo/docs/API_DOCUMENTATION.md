# Love Story API Documentation

Tài liệu này mô tả chi tiết API endpoints của ứng dụng Love Story, giúp việc tích hợp và sử dụng các API trở nên dễ dàng hơn.

## Base URL

- Development: `http://localhost:8080/api`
- Production: `/api` (Đường dẫn tương đối, được cấu hình trong Nginx)

## API Authentication

Hầu hết các API endpoint yêu cầu xác thực. Để xác thực:

1. Gọi API login để nhận JWT token
2. Thêm token vào header của mỗi request tiếp theo:
   ```
   Authorization: Bearer <your_jwt_token>
   ```

## Authentication Endpoints

### Đăng ký tài khoản

```
POST /auth/register
```

Đăng ký người dùng mới vào hệ thống.

**Request Body:**
```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "roles": ["string"] // Có thể là "admin", "user", hoặc "partner"
}
```

**Response (200):**
```json
{
  "message": "Đăng ký người dùng thành công!"
}
```

**Response (400 - Username đã tồn tại):**
```json
{
  "message": "Lỗi: Tên đăng nhập đã được sử dụng!"
}
```

**Response (400 - Email đã tồn tại):**
```json
{
  "message": "Lỗi: Email đã được sử dụng!"
}
```

### Đăng nhập

```
POST /auth/login
```

Đăng nhập và nhận JWT token.

**Request Body:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Response (200):**
```json
{
  "token": "string",
  "type": "Bearer",
  "id": 0,
  "username": "string",
  "email": "string",
  "roles": ["string"]
}
```

**Response (401 - Đăng nhập thất bại):**
```json
{
  "message": "Tên đăng nhập hoặc mật khẩu không chính xác"
}
```

### Thông tin người dùng hiện tại

```
GET /auth/user
```

Lấy thông tin người dùng đã đăng nhập.

**Response (200):**
```json
{
  "id": 0,
  "username": "string",
  "email": "string",
  "roles": ["string"]
}
```

**Response (401 - Chưa xác thực):**
```json
{
  "message": "Unauthorized"
}
```

## Relationship Endpoints

### Tạo mối quan hệ

```
POST /relationships
```

Tạo mới mối quan hệ (chỉ có thể có một mối quan hệ hoạt động cùng lúc).

**Request Body:**
```json
{
  "startDate": "2023-01-01",
  "title": "Chuyện tình của chúng mình",
  "description": "Mô tả về mối quan hệ chúng mình",
  "anniversaryMessage": "Thông điệp kỷ niệm"
}
```

**Response (200):**
```json
{
  "id": 1,
  "startDate": "2023-01-01",
  "title": "Chuyện tình của chúng mình",
  "description": "Mô tả về mối quan hệ chúng mình",
  "anniversaryMessage": "Thông điệp kỷ niệm"
}
```

### Cập nhật mối quan hệ

```
PUT /relationships/{id}
```

Cập nhật thông tin mối quan hệ.

**Path Parameter:**
- `id`: ID của mối quan hệ

**Request Body:**
```json
{
  "startDate": "2023-01-01",
  "title": "Chuyện tình của chúng mình (cập nhật)",
  "description": "Mô tả mới",
  "anniversaryMessage": "Thông điệp mới"
}
```

**Response (200):**
```json
{
  "id": 1,
  "startDate": "2023-01-01",
  "title": "Chuyện tình của chúng mình (cập nhật)",
  "description": "Mô tả mới",
  "anniversaryMessage": "Thông điệp mới"
}
```

## Profile Endpoints

### Tạo hồ sơ

```
POST /profiles
```

Tạo hồ sơ cho một người trong mối quan hệ.

**Request Body:**
```json
{
  "name": "Nguyễn Văn A",
  "birthday": "1990-05-15",
  "avatarUrl": "https://example.com/avatar.jpg",
  "bio": "Mô tả về bản thân",
  "favoriteQuote": "Câu trích dẫn yêu thích",
  "relationship": {
    "id": 1
  }
}
```

**Response (200):**
```json
{
  "id": 1,
  "name": "Nguyễn Văn A",
  "birthday": "1990-05-15",
  "avatarUrl": "https://example.com/avatar.jpg",
  "bio": "Mô tả về bản thân",
  "favoriteQuote": "Câu trích dẫn yêu thích",
  "relationship": {
    "id": 1
  }
}
```

### Cập nhật hồ sơ

```
PUT /profiles/{id}
```

Cập nhật thông tin hồ sơ.

**Path Parameter:**
- `id`: ID của hồ sơ

**Request Body:**
```json
{
  "name": "Nguyễn Văn A",
  "birthday": "1990-05-15",
  "avatarUrl": "https://example.com/new_avatar.jpg",
  "bio": "Mô tả mới về bản thân",
  "favoriteQuote": "Câu trích dẫn yêu thích mới"
}
```

## Event Endpoints

### Tạo sự kiện mới

```
POST /events
```

Thêm sự kiện mới vào timeline.

**Request Body:**
```json
{
  "title": "Lần đầu gặp nhau",
  "date": "2023-02-14",
  "shortDescription": "Mô tả ngắn về sự kiện",
  "fullDescription": "Mô tả đầy đủ về sự kiện",
  "imageUrl": "https://example.com/event.jpg",
  "htmlEnabled": true,
  "relationship": {
    "id": 1
  }
}
```

**Response (200):**
```json
{
  "id": 1,
  "title": "Lần đầu gặp nhau",
  "date": "2023-02-14",
  "shortDescription": "Mô tả ngắn về sự kiện",
  "fullDescription": "Mô tả đầy đủ về sự kiện",
  "imageUrl": "https://example.com/event.jpg",
  "htmlEnabled": true,
  "relationship": {
    "id": 1
  }
}
```

### Tải ảnh lên cho sự kiện

```
POST /files/upload
```

Tải lên file ảnh (multipart form).

**Request Body:**
```
Content-Type: multipart/form-data

file: [binary data]
```

**Response (200):**
```json
{
  "fileName": "a1b2c3d4.jpg",
  "fileDownloadUri": "http://localhost:8080/api/files/download/a1b2c3d4.jpg",
  "fileType": "image/jpeg",
  "size": 1234567
}
```

## Photo Endpoints

### Thêm ảnh vào thư viện

```
POST /photos
```

Thêm ảnh mới vào thư viện.

**Request Body:**
```json
{
  "title": "Kỷ niệm tại Đà Lạt",
  "date": "2023-05-20",
  "description": "Chuyến đi của chúng mình",
  "imageUrl": "https://example.com/photo.jpg",
  "location": "Đà Lạt",
  "tags": "travel,vacation,memories",
  "htmlEnabled": false,
  "relationship": {
    "id": 1
  }
}
```

### Tìm kiếm ảnh

```
GET /photos/search?term={searchTerm}
```

Tìm kiếm ảnh theo từ khóa.

**Query Parameters:**
- `term`: Từ khóa tìm kiếm

**Response (200):**
```json
[
  {
    "id": 1,
    "title": "Kỷ niệm tại Đà Lạt",
    "date": "2023-05-20",
    "description": "Chuyến đi của chúng mình",
    "imageUrl": "https://example.com/photo.jpg",
    "location": "Đà Lạt",
    "tags": "travel,vacation,memories",
    "htmlEnabled": false
  }
]
```

## Location Marker Endpoints

### Thêm điểm đánh dấu trên bản đồ

```
POST /location-markers
```

Thêm điểm đánh dấu mới trên bản đồ.

**Request Body:**
```json
{
  "name": "Quán cà phê đầu tiên",
  "description": "Nơi chúng mình gặp nhau lần đầu",
  "date": "2023-02-14",
  "latitude": 10.823099,
  "longitude": 106.629664,
  "isSpecial": true,
  "imageUrl": "https://example.com/cafe.jpg",
  "relationship": {
    "id": 1
  }
}
```

### Lấy các điểm đánh dấu đặc biệt

```
GET /location-markers/special/{relationshipId}
```

Lấy danh sách các điểm đánh dấu đặc biệt.

**Path Parameter:**
- `relationshipId`: ID của mối quan hệ

**Response (200):**
```json
[
  {
    "id": 1,
    "name": "Quán cà phê đầu tiên",
    "description": "Nơi chúng mình gặp nhau lần đầu",
    "date": "2023-02-14",
    "latitude": 10.823099,
    "longitude": 106.629664,
    "isSpecial": true,
    "imageUrl": "https://example.com/cafe.jpg"
  }
]
```

## Postcard Endpoints

### Tạo thiệp mới

```
POST /postcards
```

Tạo thiệp kỹ thuật số mới.

**Request Body:**
```json
{
  "title": "Thiệp chúc mừng sinh nhật",
  "message": "Chúc em sinh nhật vui vẻ!",
  "imageUrl": "https://example.com/birthday_card.jpg",
  "backgroundColor": "#f5f5f5",
  "fontFamily": "Dancing Script",
  "fromName": "Anh",
  "toName": "Em",
  "htmlEnabled": true,
  "relationship": {
    "id": 1
  }
}
```

### Đánh dấu thiệp đã gửi

```
PUT /postcards/{id}/deliver
```

Đánh dấu thiệp đã được gửi.

**Path Parameter:**
- `id`: ID của thiệp

**Response (200):**
```json
{
  "id": 1,
  "title": "Thiệp chúc mừng sinh nhật",
  "message": "Chúc em sinh nhật vui vẻ!",
  "imageUrl": "https://example.com/birthday_card.jpg",
  "backgroundColor": "#f5f5f5",
  "fontFamily": "Dancing Script",
  "fromName": "Anh",
  "toName": "Em",
  "createdAt": "2023-05-20T10:30:00",
  "deliveredAt": "2023-05-20T10:35:00",
  "htmlEnabled": true
}
```

## Countdown Endpoints

### Tạo bộ đếm ngược mới

```
POST /countdowns
```

Tạo bộ đếm ngược mới cho sự kiện sắp tới.

**Request Body:**
```json
{
  "title": "Ngày kỷ niệm 1 năm",
  "targetDate": "2024-02-14T00:00:00",
  "description": "Kỷ niệm 1 năm yêu nhau",
  "imageUrl": "https://example.com/anniversary.jpg",
  "backgroundColor": "#ffe6e6",
  "fontColor": "#333333",
  "relationship": {
    "id": 1
  }
}
```

### Lấy danh sách sự kiện sắp tới

```
GET /countdowns/future
```

Lấy danh sách các bộ đếm ngược cho sự kiện sắp tới.

**Response (200):**
```json
[
  {
    "id": 1,
    "title": "Ngày kỷ niệm 1 năm",
    "targetDate": "2024-02-14T00:00:00",
    "description": "Kỷ niệm 1 năm yêu nhau",
    "imageUrl": "https://example.com/anniversary.jpg",
    "backgroundColor": "#ffe6e6",
    "fontColor": "#333333"
  }
]
```

## Lỗi Phổ Biến

### 401 Unauthorized

```json
{
  "message": "Unauthorized"
}
```

Nguyên nhân:
- Token JWT hết hạn
- Token không hợp lệ
- Không cung cấp token

### 403 Forbidden

```json
{
  "message": "Forbidden"
}
```

Nguyên nhân:
- Người dùng không có quyền truy cập vào tài nguyên
- Yêu cầu quyền ADMIN hoặc PARTNER

### 404 Not Found

```json
{
  "message": "Not found"
}
```

Nguyên nhân:
- Tài nguyên không tồn tại
- URL không chính xác

### 500 Internal Server Error

```json
{
  "message": "Internal server error"
}
```

Nguyên nhân:
- Lỗi server
- Vui lòng liên hệ quản trị viên