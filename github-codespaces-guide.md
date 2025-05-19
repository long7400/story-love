# Hướng dẫn triển khai Love Story Website lên GitHub Codespaces

Tài liệu này hướng dẫn cách triển khai Love Story Website lên GitHub Codespaces để phát triển và kiểm thử.

## GitHub Codespaces là gì?

GitHub Codespaces là môi trường phát triển dựa trên đám mây được tích hợp trực tiếp vào GitHub. Nó cho phép bạn phát triển mã nguồn trong một môi trường đã được cấu hình sẵn mà không cần cài đặt bất kỳ phần mềm nào trên máy tính cá nhân.

## Yêu cầu

- Tài khoản GitHub (đăng ký miễn phí tại [github.com](https://github.com))
- Repository chứa mã nguồn dự án đã được đẩy lên GitHub

## Các bước triển khai lên GitHub Codespaces

### 1. Chuẩn bị repository

1. Đăng nhập vào GitHub và tạo một repository mới hoặc sử dụng repository hiện có
2. Đẩy mã nguồn Love Story Website lên repository này
3. Đảm bảo repository của bạn đã có các tệp cấu hình cần thiết:
   - `docker-compose.yml`
   - `.devcontainer/devcontainer.json`
   - Các Dockerfile cho frontend và backend

### 2. Tạo Codespace mới

1. Truy cập repository của bạn trên GitHub
2. Nhấp vào nút "Code" màu xanh lá
3. Chọn tab "Codespaces"
4. Nhấp vào nút "Create codespace on main" (hoặc nhánh mà bạn muốn sử dụng)

GitHub sẽ bắt đầu tạo Codespace dựa trên cấu hình trong tệp `.devcontainer/devcontainer.json`. Quá trình này có thể mất vài phút.

### 3. Làm việc trong Codespace

Sau khi Codespace được tạo, bạn sẽ thấy một môi trường VS Code chạy trong trình duyệt web. Môi trường này đã được cấu hình với:

- Các dịch vụ Docker (frontend, backend, database) đã được khởi động
- Các cổng đã được chuyển tiếp (80 cho frontend, 8080 cho backend, 5433 cho database)
- Các extension VS Code hữu ích đã được cài đặt

### 4. Truy cập ứng dụng

Để truy cập ứng dụng đang chạy trong Codespace:

1. Nhấp vào tab "Ports" ở phía dưới cùng của VS Code
2. Tìm cổng 80 (Frontend) và nhấp vào liên kết "Open in Browser" hoặc biểu tượng địa cầu
3. Ứng dụng sẽ mở ra trong một tab mới của trình duyệt

### 5. Phát triển và kiểm thử

Bạn có thể phát triển và kiểm thử ứng dụng trực tiếp trong Codespace:

- Chỉnh sửa mã nguồn trong VS Code
- Sử dụng terminal tích hợp để chạy lệnh
- Xem logs của các dịch vụ Docker
- Commit và push thay đổi trực tiếp từ Codespace

## Cấu hình nâng cao

### Tùy chỉnh cấu hình Codespace

Bạn có thể tùy chỉnh cấu hình Codespace bằng cách chỉnh sửa tệp `.devcontainer/devcontainer.json`:

- Thay đổi các extension VS Code được cài đặt
- Điều chỉnh cài đặt VS Code
- Thêm các lệnh chạy sau khi tạo Codespace
- Thay đổi cấu hình chuyển tiếp cổng

### Tùy chỉnh Docker Compose

Bạn có thể tùy chỉnh cấu hình Docker Compose bằng cách chỉnh sửa tệp `docker-compose.yml`:

- Thêm hoặc xóa dịch vụ
- Thay đổi cấu hình môi trường
- Điều chỉnh ánh xạ volume

## Xử lý lỗi thường gặp

1. **Codespace không tạo được**: Kiểm tra cấu hình trong tệp `.devcontainer/devcontainer.json` và `docker-compose.yml`
2. **Dịch vụ không khởi động**: Kiểm tra logs của dịch vụ trong tab "Docker" của VS Code
3. **Không thể truy cập ứng dụng**: Kiểm tra cấu hình chuyển tiếp cổng trong tab "Ports"
4. **Thay đổi không có hiệu lực**: Khởi động lại các dịch vụ Docker bằng cách chạy `docker-compose restart` trong terminal

## Lưu ý quan trọng

- GitHub Codespaces có giới hạn về thời gian sử dụng miễn phí. Kiểm tra [trang định giá](https://github.com/features/codespaces#pricing) để biết thêm chi tiết
- Codespaces sẽ tự động ngủ sau một thời gian không hoạt động để tiết kiệm tài nguyên
- Dữ liệu trong Codespace có thể bị mất khi Codespace bị xóa. Hãy đảm bảo commit và push các thay đổi quan trọng

## Tài nguyên bổ sung

- [Tài liệu chính thức về GitHub Codespaces](https://docs.github.com/en/codespaces)
- [Tài liệu về Dev Containers](https://code.visualstudio.com/docs/remote/containers)
- [Mẫu cấu hình Dev Container](https://github.com/microsoft/vscode-dev-containers)