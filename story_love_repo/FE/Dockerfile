FROM node:18-alpine as build

WORKDIR /app

# Sao chép package.json và package-lock.json
COPY package*.json ./

# Cài đặt dependencies
RUN npm ci

# Sao chép toàn bộ source code frontend
COPY . .

# Xây dựng ứng dụng
RUN npm run build

# Bước production - sử dụng Nginx để phục vụ trang tĩnh
FROM nginx:alpine

# Sao chép cấu hình Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Sao chép build files từ bước build
COPY --from=build /app/dist /usr/share/nginx/html

# Mở port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]