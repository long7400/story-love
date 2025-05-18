# Hướng Dẫn Sử Dụng Back Office (BO)

Tài liệu này hướng dẫn cách sử dụng Back Office để quản lý nội dung cho ứng dụng Love Story.

## Truy cập Back Office

### Môi trường phát triển
```
http://localhost/admin
```

### Môi trường sản xuất
```
https://admin.yourdomain.com
```

## Đăng nhập Back Office

1. Truy cập URL Back Office như ở trên
2. Nhập thông tin đăng nhập:
   - Username: [tài khoản admin của bạn]
   - Password: [mật khẩu của bạn]
3. Nhấn "Đăng nhập"

Lưu ý: Nếu chưa có tài khoản, bạn cần tạo tài khoản admin đầu tiên bằng API như trong hướng dẫn ở README.md.

## Giao diện Back Office

Giao diện Back Office bao gồm:

1. **Sidebar**: Menu điều hướng bên trái với các mục quản lý
2. **Header**: Hiển thị thông tin người dùng và nút đăng xuất
3. **Khu vực nội dung chính**: Hiển thị các form quản lý và danh sách

## Quản lý Mối quan hệ (Relationship)

### Xem và chỉnh sửa mối quan hệ

1. Chọn "Mối quan hệ" từ sidebar
2. Xem thông tin mối quan hệ hiện tại
3. Nhấn "Chỉnh sửa" để thay đổi
4. Cập nhật thông tin:
   - Ngày bắt đầu
   - Tiêu đề
   - Mô tả
   - Thông điệp kỷ niệm
5. Nhấn "Lưu thay đổi"

## Quản lý Hồ sơ (Profiles)

### Tạo hồ sơ mới

1. Chọn "Hồ sơ" từ sidebar
2. Nhấn "Thêm hồ sơ mới"
3. Điền thông tin:
   - Tên
   - Ngày sinh
   - Giới thiệu bản thân
   - Câu trích dẫn yêu thích
4. Tải lên ảnh đại diện
5. Nhấn "Lưu hồ sơ"

### Chỉnh sửa hồ sơ

1. Chọn "Hồ sơ" từ sidebar
2. Tìm hồ sơ cần chỉnh sửa
3. Nhấn vào nút "Chỉnh sửa"
4. Cập nhật thông tin
5. Nhấn "Lưu thay đổi"

## Quản lý Timeline Sự kiện

### Tạo sự kiện mới

1. Chọn "Timeline" từ sidebar
2. Nhấn "Thêm sự kiện mới"
3. Điền thông tin sự kiện:
   - Tiêu đề
   - Ngày tháng
   - Mô tả ngắn
   - Mô tả đầy đủ
4. Tải lên ảnh sự kiện
5. Bật/tắt hỗ trợ HTML nếu cần
6. Nhấn "Lưu sự kiện"

### Chỉnh sửa hoặc xóa sự kiện

1. Chọn "Timeline" từ sidebar
2. Xem danh sách các sự kiện
3. Nhấn "Chỉnh sửa" hoặc "Xóa" bên cạnh sự kiện
4. Nếu chỉnh sửa, cập nhật thông tin và nhấn "Lưu thay đổi"
5. Nếu xóa, xác nhận xóa sự kiện

### Sắp xếp sự kiện

1. Chọn "Timeline" từ sidebar
2. Nhấn "Sắp xếp sự kiện"
3. Kéo và thả để thay đổi thứ tự
4. Nhấn "Lưu thứ tự"

## Quản lý Thư viện Ảnh

### Tải lên ảnh mới

1. Chọn "Thư viện ảnh" từ sidebar
2. Nhấn "Tải lên ảnh mới"
3. Kéo và thả ảnh hoặc nhấn để chọn ảnh
4. Điền thông tin:
   - Tiêu đề
   - Ngày chụp
   - Mô tả
   - Vị trí
   - Tags (phân cách bằng dấu phẩy)
5. Nhấn "Lưu ảnh"

### Quản lý ảnh

1. Chọn "Thư viện ảnh" từ sidebar
2. Xem tất cả ảnh dưới dạng lưới
3. Nhấn vào ảnh để xem chi tiết
4. Chọn "Chỉnh sửa" hoặc "Xóa" từ menu

## Quản lý Bản đồ Tình yêu

### Thêm địa điểm

1. Chọn "Bản đồ tình yêu" từ sidebar
2. Nhấn "Thêm địa điểm mới"
3. Tìm vị trí trên bản đồ hoặc nhập tọa độ
4. Điền thông tin:
   - Tên địa điểm
   - Mô tả
   - Ngày đến thăm
   - Đánh dấu nếu là địa điểm đặc biệt
5. Tải lên ảnh địa điểm (nếu có)
6. Nhấn "Lưu địa điểm"

## Quản lý Thiệp Kỹ thuật số

### Tạo thiệp mới

1. Chọn "Thiệp kỹ thuật số" từ sidebar
2. Nhấn "Tạo thiệp mới"
3. Chọn mẫu thiệp
4. Điền thông tin:
   - Tiêu đề
   - Nội dung
   - Người gửi & người nhận
   - Màu nền
   - Font chữ
5. Tải lên ảnh cho thiệp (nếu có)
6. Bật/tắt hỗ trợ HTML nếu cần
7. Nhấn "Tạo thiệp"

### Gửi thiệp

1. Chọn "Thiệp kỹ thuật số" từ sidebar
2. Tìm thiệp cần gửi
3. Nhấn "Gửi thiệp"
4. Xác nhận gửi

## Quản lý Đếm ngược sự kiện

### Tạo bộ đếm ngược mới

1. Chọn "Đếm ngược" từ sidebar
2. Nhấn "Thêm đếm ngược mới"
3. Điền thông tin:
   - Tiêu đề sự kiện
   - Ngày & giờ mục tiêu
   - Mô tả
   - Màu nền
   - Màu chữ
4. Tải lên ảnh (nếu có)
5. Nhấn "Lưu đếm ngược"

## Tạo nội dung với AI

### Sử dụng AI để tạo mô tả sự kiện

1. Khi tạo hoặc chỉnh sửa sự kiện
2. Nhấn "Tạo nội dung với AI"
3. Chọn phong cách viết
4. Nhấn "Tạo" và đợi hệ thống tạo nội dung
5. Chỉnh sửa nội dung nếu cần

### Sử dụng AI cho thiệp kỹ thuật số

1. Khi tạo thiệp mới
2. Nhấn "Gợi ý nội dung"
3. Chọn dịp và phong cách
4. Nhấn "Tạo" để AI tạo nội dung

## Cài đặt hệ thống

### Cấu hình OpenAI

1. Chọn "Cài đặt" từ sidebar
2. Chọn tab "Tích hợp API"
3. Nhập API key của OpenAI
4. Điều chỉnh các tham số AI
5. Nhấn "Lưu cài đặt"

### Quản lý người dùng

1. Chọn "Người dùng" từ sidebar (chỉ hiển thị với quyền Admin)
2. Xem danh sách người dùng
3. Tạo người dùng mới hoặc chỉnh sửa người dùng hiện có
4. Quản lý quyền truy cập

## Mẹo sử dụng

1. **Định dạng HTML**: Khi bật tính năng HTML, bạn có thể sử dụng các thẻ như:
   ```html
   <b>Đậm</b>, <i>Nghiêng</i>, <u>Gạch chân</u>
   <h3>Tiêu đề</h3>
   <ul><li>Mục 1</li><li>Mục 2</li></ul>
   ```

2. **Upload ảnh**: Hỗ trợ các định dạng JPG, PNG, GIF với kích thước tối đa 10MB

3. **Bản xem trước**: Sử dụng nút "Xem trước" để kiểm tra cách hiển thị nội dung trước khi lưu