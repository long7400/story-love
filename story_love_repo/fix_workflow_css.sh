#!/bin/bash

echo "===== Sửa lỗi CSS cho ứng dụng ====="

# 1. Thêm chức năng CSS vào môi trường gốc
echo "Cập nhật cấu hình trong thư mục gốc..."

# Cập nhật tailwind.config.ts
echo "import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './index.html', 
    './src/**/*.{js,jsx,ts,tsx}',
    './client/index.html', 
    './client/src/**/*.{js,jsx,ts,tsx}',
    './FE/index.html', 
    './FE/src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      // Các cấu hình hiện có
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
} satisfies Config;" > tailwind.config.ts

# Tạo symbolic link từ node_modules đến FE
echo "Tạo symbolic link để chia sẻ node_modules..."
mkdir -p FE/node_modules

# Tạo script để chạy ứng dụng FE
echo "Tạo script launch_fe.js..."
cat > launch_fe.js << 'EOF'
const { exec } = require('child_process');
const path = require('path');

// Đường dẫn đến thư mục FE
const feDirectory = path.join(__dirname, 'FE');

// Chạy Vite từ thư mục FE
const viteProcess = exec('npx vite', {
  cwd: feDirectory
});

viteProcess.stdout.on('data', (data) => {
  console.log(`[FE] ${data}`);
});

viteProcess.stderr.on('data', (data) => {
  console.error(`[FE Error] ${data}`);
});

viteProcess.on('close', (code) => {
  console.log(`FE process exited with code ${code}`);
});
EOF

# Cập nhật file package.json để sử dụng script mới
NODE_START=$(cat package.json | grep -n "\"dev\"" | cut -d ":" -f 1)
sed -i "${NODE_START}s/.*/    \"dev\": \"NODE_ENV=development tsx server\/index.ts \& node launch_fe.js\",/" package.json

echo "===== Hoàn thành sửa lỗi CSS cho ứng dụng ====="
echo "Vui lòng khởi động lại workflow 'Start application' để áp dụng các thay đổi"