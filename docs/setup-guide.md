# Hướng dẫn khởi động và phát triển dự án

## Cấu trúc thư mục hiện tại

Dự án hiện tại được tổ chức thành hai phần chính:

- **BE/**: Chứa ứng dụng Spring Boot với PostgreSQL
- **FE/**: Chứa ứng dụng React với Vite và Tailwind CSS

## Khởi động Backend (Spring Boot)

1. Mở terminal và điều hướng đến thư mục BE:
   ```bash
   cd BE
   ```

2. Kiểm tra cấu hình cơ sở dữ liệu trong `src/main/resources/application.properties` 

3. Khởi động ứng dụng Spring Boot:
   ```bash
   ./mvnw spring-boot:run
   ```
   
4. Spring Boot sẽ chạy trên cổng 8080

## Khởi động Frontend (React)

Để chạy Frontend với đầy đủ CSS:

1. Mở terminal mới và điều hướng đến thư mục FE:
   ```bash
   cd FE
   ```

2. Cài đặt các gói phụ thuộc:
   ```bash
   npm install
   ```

3. Cập nhật file .env.local để trỏ đến BE:
   ```
   VITE_API_BASE_URL=http://localhost:8080
   ```

4. Khởi động ứng dụng:
   ```bash
   npm run dev
   ```

5. Truy cập ứng dụng tại http://localhost:3000

## Giải quyết vấn đề CSS
 
Nếu bạn gặp vấn đề khi thiếu CSS sau khi tái cấu trúc:

1. Đảm bảo tệp tailwind.config.js trong thư mục FE có cấu hình đúng:
   ```js
   content: [
     "./index.html", 
     "./src/**/*.{js,jsx,ts,tsx}"
   ]
   ```

2. Đảm bảo tệp postcss.config.js trong thư mục FE có cấu hình chính xác:
   ```js
   export default {
     plugins: {
       tailwindcss: {},
       autoprefixer: {},
     },
   }
   ```

3. Kiểm tra import CSS trong src/main.tsx:
   ```tsx
   import "./index.css";
   import 'aos/dist/aos.css';
   ```

4. Nếu vẫn gặp vấn đề, thử xóa thư mục node_modules và cài đặt lại:
   ```bash
   rm -rf node_modules
   npm install
   ```

## Phát triển

- Khi phát triển FE: Chỉnh sửa code trong thư mục `FE/src`
- Khi phát triển BE: Chỉnh sửa code trong thư mục `BE/src`

## Kết nối API

FE đã được cấu hình để kết nối trực tiếp đến BE Spring Boot thông qua apiConfig.ts:

```typescript
// FE/src/config/apiConfig.ts
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export const apiConfig = {
  baseUrl: API_BASE_URL,
  endpoints: {
    loveStoryData: '/love-story-data',
    // các endpoint khác...
  }
};
```

## Mẹo

- Sử dụng script đã cung cấp để khởi động nhanh:
  - `./start_be.sh` để khởi động Spring Boot
  - `./start_fe.sh` để khởi động React