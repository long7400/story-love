#!/bin/bash

# Script kích hoạt tài khoản người dùng trong Love Story
# Sử dụng: sudo bash ./activate_account.sh

# Kiểm tra quyền sudo
if [ "$(id -u)" -ne 0 ]; then
    echo "Vui lòng chạy script với quyền sudo"
    exit 1
fi

echo "===================================================="
echo "     KÍCH HOẠT TÀI KHOẢN LOVE STORY"
echo "===================================================="
echo ""
echo "Script này sẽ kích hoạt tài khoản người dùng mà không cần trả lời câu hỏi tình yêu"
echo ""

# Thông tin tài khoản
read -p "Nhập tên đăng nhập cần kích hoạt: " username

echo ""
echo "Đang kích hoạt tài khoản, vui lòng đợi..."

# Kiểm tra tài khoản
read -s -p "Nhập mật khẩu admin: " admin_password
echo ""

# Đăng nhập với tài khoản admin để lấy token
echo "Đang xác thực admin..."
admin_result=$(curl -s -X POST -H "Content-Type: application/json" -d '{
    "username": "admin",
    "password": "'$admin_password'"
}' http://localhost:8080/api/auth/login)

# Xác thực tài khoản thất bại
if [[ $admin_result != *"token"* ]]; then
    echo "❌ Xác thực admin thất bại!"
    exit 1
fi

# Trích xuất token
token=$(echo $admin_result | sed -n 's/.*"token":"\([^"]*\)".*/\1/p')

# Gọi API kích hoạt tài khoản
echo "Đang kích hoạt tài khoản $username..."
activate_result=$(curl -s -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer $token" -d '{
    "username": "'$username'",
    "activated": true
}' http://localhost:8080/api/auth/activate)

if [[ $activate_result == *"success"* ]]; then
    echo "✅ Đã kích hoạt tài khoản $username thành công!"
else
    echo "❌ Lỗi khi kích hoạt tài khoản: $activate_result"
fi

echo ""
echo "===================================================="
echo "Tài khoản $username giờ đây có thể đăng nhập và truy cập"
echo "trang Love Story mà không cần trả lời câu hỏi tình yêu nữa."
echo "===================================================="