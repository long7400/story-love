#!/bin/bash

echo "==== Bắt đầu dọn dẹp thư mục FE ===="

# Tạo thư mục tạm để lưu các file cần thiết
mkdir -p temp_fe_backup

# Di chuyển các file từ FE sang thư mục tạm (giữ cấu trúc thư mục gốc)
echo "Sao lưu các file quan trọng từ FE..."
cp -r FE/src temp_fe_backup/
cp -r FE/public temp_fe_backup/
cp FE/package.json temp_fe_backup/
cp FE/vite.config.ts temp_fe_backup/
cp FE/tsconfig.json temp_fe_backup/
cp FE/index.html temp_fe_backup/
cp FE/postcss.config.js temp_fe_backup/
cp FE/tailwind.config.ts temp_fe_backup/
cp FE/.env* temp_fe_backup/ 2>/dev/null || true

# Xóa thư mục server từ FE (bỏ phần Node.js backend)
echo "Xóa server từ FE (bỏ phần Node.js backend)..."
rm -rf FE/server

# Xóa các file không cần thiết từ thư mục gốc
echo "Xóa các thư mục không cần thiết từ thư mục gốc..."
rm -rf server
rm -rf shared
rm -rf client
rm -rf backup

echo "==== Hoàn thành dọn dẹp FE ===="
echo "Cấu trúc thư mục hiện tại:"
echo "- BE/: Backend Spring Boot"
echo "- FE/: Frontend React (đã loại bỏ Node.js)"
echo "- attached_assets/: Tài nguyên đính kèm"
echo "- docs/: Tài liệu"

