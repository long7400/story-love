#!/bin/bash

echo "===== Kiểm tra trạng thái FE ====="

# Danh sách kiểm tra
echo "1. Cấu trúc thư mục FE:"
ls -la FE

echo -e "\n2. Cấu hình tailwind:"
cat FE/tailwind.config.ts

echo -e "\n3. Cấu hình postcss:"
cat FE/postcss.config.js

echo -e "\n4. Danh sách thư mục src:"
ls -la FE/src

echo -e "\n5. Kiểm tra CSS:"
cat FE/src/index.css | head -10

echo -e "\n6. Kiểm tra các thư viện đã cài đặt:"
cat FE/package.json | grep -E "tailwindcss|postcss|autoprefixer"

echo -e "\n===== Hoàn thành kiểm tra ====="