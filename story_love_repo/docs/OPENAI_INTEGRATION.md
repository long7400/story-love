# Tích Hợp OpenAI trong Ứng Dụng Love Story

Tài liệu này mô tả cách sử dụng tính năng tích hợp OpenAI trong ứng dụng Love Story để tự động tạo nội dung cho các mục trong ứng dụng của bạn.

## Tổng quan

Ứng dụng Love Story tích hợp API của OpenAI để giúp tạo nội dung tự động cho:
- Mô tả sự kiện trên timeline
- Nội dung bưu thiệp
- Mô tả ảnh trong thư viện
- Nội dung cho các địa điểm trên bản đồ

Các tính năng này giúp bạn tiết kiệm thời gian và tạo nội dung phong phú, sáng tạo mà không cần phải viết tất cả từ đầu.

## Yêu cầu

Để sử dụng tính năng tích hợp OpenAI, bạn cần:

1. Đăng ký tài khoản tại [OpenAI](https://platform.openai.com/)
2. Tạo API key trong phần API Keys của tài khoản
3. Thêm API key vào biến môi trường của ứng dụng

## Cài đặt

### Thêm API Key vào môi trường

Có hai cách để thêm API key:

#### Cách 1: Sử dụng biến môi trường trong file .env

Thêm dòng sau vào file `.env` trong thư mục gốc của dự án:

```
OPENAI_API_KEY=your_openai_api_key
```

#### Cách 2: Thêm API key thông qua giao diện quản trị (Back Office)

1. Đăng nhập vào Back Office
2. Truy cập phần "Cài đặt" > "Tích hợp API"
3. Nhập OpenAI API key vào trường tương ứng
4. Nhấn "Lưu cài đặt"

## Cách sử dụng

### Tạo mô tả sự kiện tự động

1. Truy cập Back Office
2. Đi đến phần "Timeline" và nhấn "Thêm sự kiện" hoặc chọn sửa một sự kiện
3. Điền tiêu đề và ngày tháng của sự kiện
4. Nhấn vào nút "Tạo nội dung với AI" bên cạnh trường mô tả
5. Chọn phong cách viết (lãng mạn, hài hước, trang trọng, v.v.)
6. Nhấn "Tạo" và đợi hệ thống tạo nội dung
7. Chỉnh sửa nội dung nếu cần và lưu sự kiện

### Tạo nội dung thiệp tự động

1. Truy cập phần "Bưu thiếp" và tạo thiệp mới
2. Chọn mẫu thiệp và điền các thông tin cơ bản
3. Nhấn vào nút "Gợi ý nội dung với AI"
4. Chọn dịp (sinh nhật, kỷ niệm, tình yêu, v.v.) và phong cách
5. Nhấn "Tạo" để AI tạo nội dung phù hợp
6. Chỉnh sửa và gửi thiệp

### Gợi ý địa điểm trên bản đồ

Tính năng này giúp gợi ý nội dung cho các địa điểm đã thêm vào bản đồ tình yêu:

1. Truy cập phần "Bản đồ tình yêu"
2. Chọn một địa điểm đã thêm
3. Nhấn "Gợi ý mô tả với AI"
4. AI sẽ tạo mô tả dựa trên tên và loại địa điểm

## Tùy chỉnh nâng cao

### Điều chỉnh nhiệt độ (temperature) của AI

Nhiệt độ là tham số ảnh hưởng đến độ sáng tạo của nội dung được tạo. Giá trị từ 0.0 đến 1.0:
- Giá trị thấp (0.2-0.4): Nội dung an toàn, nhất quán
- Giá trị trung bình (0.5-0.7): Cân bằng giữa nhất quán và sáng tạo
- Giá trị cao (0.8-1.0): Nội dung sáng tạo, đa dạng nhưng ít nhất quán hơn

Để thay đổi tham số này:
1. Truy cập Back Office > "Cài đặt" > "AI Settings"
2. Điều chỉnh thanh trượt "Temperature"
3. Nhấn "Lưu cài đặt"

### Sử dụng AI để tạo hashtag cho ảnh

Tính năng này tự động phân tích ảnh và gợi ý các hashtag phù hợp:

1. Tải lên ảnh vào thư viện
2. Nhấn vào nút "Gợi ý hashtag" 
3. AI sẽ phân tích ảnh và tạo các hashtag liên quan
4. Chọn các hashtag bạn muốn sử dụng

## Ví dụ sử dụng

### Ví dụ 1: Tạo mô tả cho sự kiện "Lần đầu hẹn hò"

**Đầu vào:**
- Tiêu đề: Lần đầu hẹn hò
- Ngày: 14/02/2023
- Phong cách: Lãng mạn

**Kết quả từ AI:**
```
Buổi chiều ngày Valentine năm ấy, chúng mình đã có buổi hẹn hò đầu tiên tại quán cà phê nhỏ bên hồ. Ánh nắng chiều rọi qua khung cửa sổ, hắt lên gương mặt em những tia nắng vàng ấm áp. Từ lúc đó, anh đã biết cuộc đời mình sẽ thay đổi mãi mãi. Chúng mình đã trò chuyện hàng giờ liền, quên cả thời gian. Đó là khoảnh khắc đẹp nhất, khi hai trái tim bắt đầu nhịp đập chung một nhịp điệu.
```

### Ví dụ 2: Tạo nội dung thiệp sinh nhật

**Đầu vào:**
- Dịp: Sinh nhật
- Người nhận: Em
- Phong cách: Ngọt ngào

**Kết quả từ AI:**
```
Gửi đến người con gái dịu dàng của anh,

Chúc mừng sinh nhật em yêu! 🎂✨

Mỗi năm trôi qua, anh càng thêm biết ơn vì có em trong cuộc đời mình. Nụ cười của em là ánh nắng của những ngày anh tăm tối. Hôm nay, ngày đặc biệt này, anh muốn em biết rằng tình yêu anh dành cho em sẽ không ngừng lớn mạnh theo thời gian.

Sinh nhật vui vẻ và tràn ngập hạnh phúc, người anh yêu nhất!

Yêu em rất nhiều ❤️
```

## Khắc phục sự cố

### Không thể kết nối với API OpenAI

1. Kiểm tra API key đã được cấu hình đúng
2. Xác nhận Internet connection đang hoạt động
3. Kiểm tra xem API key có đủ credit không
4. Kiểm tra console log để xem thông báo lỗi chi tiết

### Nội dung được tạo không phù hợp

1. Điều chỉnh nhiệt độ (temperature) để có nội dung phù hợp hơn
2. Cung cấp nhiều thông tin đầu vào hơn để hướng dẫn AI tốt hơn
3. Chỉnh sửa phong cách và yêu cầu cụ thể hơn

## Giới hạn và lưu ý

1. API OpenAI có giới hạn số lượng yêu cầu mỗi phút và mỗi ngày
2. Tạo nội dung bằng AI có thể tốn thời gian, đặc biệt là vào giờ cao điểm
3. Luôn kiểm tra và chỉnh sửa nội dung do AI tạo ra trước khi sử dụng
4. Nội dung tạo tự động nên được coi là gợi ý, không nên sử dụng hoàn toàn tự động

## Hỗ trợ và phản hồi

Nếu bạn gặp vấn đề với tính năng tích hợp OpenAI hoặc có phản hồi để cải thiện, vui lòng liên hệ với chúng tôi qua:
- Email: support@lovestory.com
- Mục "Phản hồi" trong Back Office