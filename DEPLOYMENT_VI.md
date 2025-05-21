# Hướng Dẫn Triển Khai Ứng Dụng Love Story

Tài liệu này cung cấp hướng dẫn chi tiết để triển khai ứng dụng Love Story lên VPS sử dụng Docker.

## Tổng Quan Về Các Thay Đổi

Các thay đổi sau đã được thực hiện để chuẩn bị cho việc triển khai ứng dụng:

1. **Cấu Hình Docker**
   - Tạo `docker-compose.yml` để điều phối các dịch vụ (backend, frontend và database)
   - Cấu hình dịch vụ backend sử dụng biến môi trường cho thông tin nhạy cảm
   - Cấu hình dịch vụ frontend sử dụng Nginx để phục vụ ứng dụng
   - Thiết lập volumes cho lưu trữ dữ liệu liên tục

2. **Tăng Cường Bảo Mật**
   - Loại bỏ khóa bí mật JWT cứng trong tệp thuộc tính ứng dụng
   - Loại bỏ thông tin đăng nhập cơ sở dữ liệu cứng từ tệp thuộc tính ứng dụng
   - Tạo AdminInitializer để tạo người dùng quản trị một cách an toàn khi chạy lần đầu
   - Cấu hình CORS cho môi trường sản xuất
   - Thiết lập SSL/TLS với mã hóa an toàn trong Nginx
   - Thêm tiêu đề bảo mật vào cấu hình Nginx

3. **Cấu Hình Môi Trường**
   - Tạo mẫu `.env.example` cho biến môi trường
   - Thêm biến môi trường cho cơ sở dữ liệu, JWT, thông tin đăng nhập quản trị và CORS
   - Cập nhật `.gitignore` để loại trừ các tệp nhạy cảm

## Các Bước Triển Khai

Thực hiện theo các bước sau để triển khai ứng dụng lên VPS của bạn:

### 1. Chuẩn Bị VPS

- Cài đặt Docker và Docker Compose
  ```bash
  # Cài đặt Docker
  curl -fsSL https://get.docker.com -o get-docker.sh
  sudo sh get-docker.sh

  # Cài đặt Docker Compose
  sudo curl -L "https://github.com/docker/compose/releases/download/v2.24.6/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
  sudo chmod +x /usr/local/bin/docker-compose
  ```

- Thiết lập tên miền trỏ đến VPS của bạn
  - Đăng nhập vào nhà cung cấp tên miền của bạn
  - Tạo bản ghi A trỏ đến địa chỉ IP của VPS
  - Tạo bản ghi CNAME cho www trỏ đến tên miền chính

- Lấy chứng chỉ SSL cho tên miền của bạn
  ```bash
  # Cài đặt Certbot
  sudo apt-get update
  sudo apt-get install certbot

  # Lấy chứng chỉ SSL
  sudo certbot certonly --standalone -d togetherforever.site -d www.togetherforever.site
  ```

### 2. Sao Chép Mã Nguồn

```bash
git clone https://github.com/yourusername/story-love.git
cd story-love
```

### 3. Cấu Hình Biến Môi Trường

Sao chép tệp môi trường mẫu và chỉnh sửa với cài đặt của bạn:

```bash
cp .env.example .env
```

Chỉnh sửa tệp `.env` với các giá trị sản xuất của bạn:
- Đặt mật khẩu cơ sở dữ liệu mạnh
- Tạo chuỗi ngẫu nhiên an toàn cho JWT_SECRET
- Cập nhật CORS_ALLOWED_ORIGINS với tên miền của bạn
- Đặt tên miền của bạn trong DOMAIN_NAME
- Cập nhật đường dẫn chứng chỉ SSL nếu cần

### 4. Cấu Hình Chứng Chỉ SSL

Đảm bảo thư mục `ssl` tồn tại và sao chép chứng chỉ SSL của bạn vào đó:

```bash
mkdir -p ssl
# Sao chép chứng chỉ SSL của bạn vào thư mục ssl
```

Nếu bạn đang sử dụng Let's Encrypt, bạn có thể sao chép chứng chỉ từ `/etc/letsencrypt/live/togetherforever.site/`:

```bash
sudo cp /etc/letsencrypt/live/togetherforever.site/fullchain.pem ssl/
sudo cp /etc/letsencrypt/live/togetherforever.site/privkey.pem ssl/
sudo chmod 644 ssl/fullchain.pem ssl/privkey.pem
```

### 5. Cấu Hình Nginx

Cấu hình Nginx đã được thiết lập sẵn cho tên miền `togetherforever.site`. Nếu bạn cần sử dụng tên miền khác, hãy chỉnh sửa tệp `nginx/nginx.conf` để thay thế `togetherforever.site` bằng tên miền thực tế của bạn:

```bash
sed -i 's/togetherforever.site/your-actual-domain.com/g' nginx/nginx.conf
```

### 6. Xây Dựng và Khởi Động Các Dịch Vụ

```bash
docker-compose up -d
```

Lệnh này sẽ:
- Xây dựng các hình ảnh Docker backend và frontend
- Khởi động cơ sở dữ liệu PostgreSQL
- Khởi động dịch vụ backend
- Khởi động dịch vụ frontend với Nginx

### 7. Xác Minh Việc Triển Khai

Truy cập tên miền của bạn trong trình duyệt web để xác minh rằng ứng dụng đang chạy đúng.

Bạn có thể kiểm tra nhật ký của từng dịch vụ:

```bash
# Xem nhật ký cho tất cả các dịch vụ
docker-compose logs

# Xem nhật ký cho một dịch vụ cụ thể
docker-compose logs backend
docker-compose logs frontend
docker-compose logs db
```

## Cân Nhắc Về Bảo Mật

1. **Biến Môi Trường**: Giữ tệp `.env` của bạn an toàn và không bao giờ commit nó vào kiểm soát phiên bản.
2. **Mật Khẩu Cơ Sở Dữ Liệu**: Sử dụng mật khẩu mạnh, duy nhất cho cơ sở dữ liệu của bạn.
3. **Bí Mật JWT**: Sử dụng một chuỗi dài, ngẫu nhiên cho bí mật JWT của bạn.
4. **Chứng Chỉ SSL**: Giữ chứng chỉ SSL của bạn cập nhật.
5. **Tường Lửa**: Cấu hình tường lửa VPS của bạn để chỉ cho phép các cổng cần thiết (80, 443).
6. **Cập Nhật Thường Xuyên**: Giữ hình ảnh Docker và hệ thống máy chủ của bạn cập nhật với các bản vá bảo mật.

## Sao Lưu và Khôi Phục

### Sao Lưu Cơ Sở Dữ Liệu
```bash
docker-compose exec db pg_dump -U postgres lovestory > backup.sql
```

### Khôi Phục Cơ Sở Dữ Liệu
```bash
cat backup.sql | docker-compose exec -T db psql -U postgres -d lovestory
```

## Cập Nhật Ứng Dụng

Để cập nhật ứng dụng:

```bash
# Kéo các thay đổi mới nhất
git pull

# Xây dựng lại và khởi động lại các dịch vụ
docker-compose up -d --build
```

## Xử Lý Sự Cố

### Vấn Đề Kết Nối Cơ Sở Dữ Liệu

Nếu backend không thể kết nối với cơ sở dữ liệu:

1. Kiểm tra xem container cơ sở dữ liệu có đang chạy không: `docker-compose ps`
2. Kiểm tra nhật ký cơ sở dữ liệu: `docker-compose logs db`
3. Xác minh thông tin đăng nhập cơ sở dữ liệu trong tệp `.env`

### Vấn Đề Chứng Chỉ SSL

Nếu bạn gặp vấn đề với SSL:

1. Xác minh rằng các tệp chứng chỉ tồn tại trong thư mục `ssl`
2. Kiểm tra nhật ký Nginx: `docker-compose logs frontend`
3. Xác minh rằng đường dẫn chứng chỉ trong `nginx/nginx.conf` là chính xác

### Ứng Dụng Không Khởi Động

Nếu ứng dụng không khởi động:

1. Kiểm tra nhật ký của từng dịch vụ: `docker-compose logs`
2. Xác minh rằng tất cả các biến môi trường được đặt chính xác
3. Thử xây dựng lại các dịch vụ: `docker-compose up -d --build`

## Kết Luận

Ứng dụng Love Story hiện đã được cấu hình để triển khai an toàn lên VPS sử dụng Docker. Cấu hình tuân theo các phương pháp tốt nhất về bảo mật, hiệu suất và khả năng bảo trì.
