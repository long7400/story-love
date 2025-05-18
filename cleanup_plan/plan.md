# Kế hoạch tái tổ chức thư mục

## Mục tiêu
- Chỉ giữ lại 2 thư mục chính: BE và FE
- Đảm bảo trang web vẫn hoạt động như hiện tại

## Cấu trúc mới
```
/
├── BE/ (Spring Boot Backend)
│   ├── src/
│   ├── Dockerfile
│   └── ...
│
├── FE/ (React Frontend + Node.js API)
│   ├── src/ (React code)
│   ├── server/ (Node.js backend)
│   ├── shared/ (Shared types)
│   ├── public/ (Static assets)
│   ├── Dockerfile
│   └── ...
│
├── attached_assets/ (Các tệp ảnh và tài nguyên khác)
├── docs/ (Tài liệu)
└── docker-compose.yml
```

## Các bước thực hiện
1. Sao chép cấu trúc hiện tại vào thư mục tạm để đề phòng
2. Di chuyển code từ các thư mục gốc vào FE
3. Cập nhật đường dẫn trong các file cấu hình
4. Đảm bảo Docker Compose hoạt động với cấu trúc mới
5. Xóa các thư mục thừa

## Lợi ích
- Cấu trúc dự án rõ ràng, dễ bảo trì
- Phân tách rõ ràng giữa backend Java và frontend
- Dễ dàng triển khai với Docker
