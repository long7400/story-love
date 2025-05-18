# Love Story Frontend - React

Frontend của ứng dụng Love Story được xây dựng bằng React và Vite, cung cấp giao diện người dùng cho cả Storefront và Back Office.

## Cấu trúc dự án frontend

```
client/
├── public/               # Static assets (images, sounds, etc.)
├── src/
│   ├── components/       # Shared UI components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utilities, API client, helpers
│   ├── pages/            # Page components
│   ├── types/            # TypeScript type definitions
│   ├── App.tsx           # Main application component
│   ├── index.css         # Global styles
│   └── main.tsx          # Application entry point
└── README.md             # Documentation
```

## Cách chạy frontend

### Sử dụng Docker

Bạn có thể build và chạy frontend trong Docker:

```bash
docker build -t love-story-frontend -f Dockerfile .
docker run -p 80:80 love-story-frontend
```

### Sử dụng Docker Compose (Khuyến nghị)

Từ thư mục gốc của dự án:

```bash
docker-compose up -d frontend
```

Frontend sẽ chạy tại http://localhost

### Chạy trong môi trường phát triển

```bash
npm install
npm run dev
```

Frontend sẽ chạy tại http://localhost:5173

## Tương tác với backend

Frontend được cấu hình để giao tiếp với backend Spring Boot thông qua API client. Khi chạy ở chế độ development, mặc định nó sẽ kết nối với backend tại `http://localhost:8080/api`.

Bạn có thể thay đổi URL của backend bằng cách thiết lập biến môi trường `VITE_API_BASE_URL`.

## Xác thực và phân quyền

Frontend hỗ trợ hai loại người dùng chính:
- **Admin**: Quản trị viên, có quyền truy cập vào Back Office
- **User**: Người dùng thông thường, có quyền truy cập vào Storefront

Để đăng nhập vào Back Office, truy cập `/admin` và sử dụng tài khoản admin đã được đăng ký trước đó.

## Tính năng chính

### Storefront

- **Timeline**: Hiển thị câu chuyện tình yêu theo dòng thời gian
- **Gallery**: Thư viện ảnh kỷ niệm
- **Love Map**: Bản đồ các địa điểm đặc biệt
- **Anniversary**: Đếm ngược đến các sự kiện, kỷ niệm

### Back Office

- **User Management**: Quản lý người dùng và phân quyền
- **Content Editor**: Quản lý nội dung timeline, gallery
- **Map Editor**: Thêm/sửa/xóa địa điểm trên bản đồ
- **Settings**: Cấu hình ứng dụng, bao gồm cài đặt OpenAI

## Mở rộng và tùy chỉnh

Để thêm thành phần giao diện mới:

1. Tạo component trong thư mục `src/components`
2. Import và sử dụng trong page thích hợp
3. Cập nhật styling trong Tailwind CSS

## Tích hợp API

Các cuộc gọi API được xử lý thông qua lớp ApiClient trong `src/lib/api.ts`. Mỗi chức năng được triển khai bằng React Query để quản lý state và fetching.