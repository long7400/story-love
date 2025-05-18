#!/bin/bash

echo "==== Bắt đầu tái tổ chức thư mục ===="

# 1. Di chuyển các file cấu hình từ thư mục gốc vào FE
echo "Di chuyển các file cấu hình vào FE..."
cp -f postcss.config.js FE/
cp -f tailwind.config.ts FE/
cp -f tsconfig.json FE/
cp -f .env* FE/

# 2. Di chuyển các thành phần mới vào FE
echo "Di chuyển các thành phần mới..."
cp -f client/src/components/HeartbeatMilestones.tsx FE/src/components/
cp -f client/src/components/LoveQuoteOverlay.tsx FE/src/components/
cp -f client/src/components/MoodDashboard.tsx FE/src/components/

# 3. Di chuyển nghiệp vụ server và shared vào FE
echo "Di chuyển mã nguồn server và shared..."
cp -rf server/* FE/server/
cp -rf shared/* FE/shared/

# 4. Di chuyển public vào FE
echo "Di chuyển public assets..."
cp -rf public/* FE/public/

# 5. Cập nhật tệp README.md
echo "Cập nhật README.md..."
# (Đã thực hiện thủ công)

echo "==== Hoàn thành tái tổ chức ===="
echo "Cấu trúc thư mục mới:"
echo "- BE/: Backend Spring Boot"
echo "- FE/: Frontend React + Node.js API"
echo "- attached_assets/: Tài nguyên đính kèm"
echo "- docs/: Tài liệu"
echo "- docker-compose.yml: Cấu hình Docker Compose"
