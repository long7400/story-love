#!/bin/bash

# Script tạo tài khoản cho cặp đôi trong Love Story
# Sử dụng: sudo bash ./register_account.sh

# Kiểm tra quyền sudo
if [ "$(id -u)" -ne 0 ]; then
    echo "Vui lòng chạy script với quyền sudo"
    exit 1
fi

echo "===================================================="
echo "     ĐĂNG KÝ TÀI KHOẢN LOVE STORY"
echo "===================================================="
echo ""
echo "Script này sẽ tạo tài khoản cho cặp đôi trên Love Story website"
echo ""

# Thông tin tài khoản cho nữ
read -p "Nhập tên đăng nhập cho bạn nữ: " female_username
read -s -p "Nhập mật khẩu cho bạn nữ: " female_password
echo ""
read -p "Nhập email cho bạn nữ: " female_email

# Thông tin tài khoản cho nam
echo ""
read -p "Nhập tên đăng nhập cho bạn nam: " male_username
read -s -p "Nhập mật khẩu cho bạn nam: " male_password
echo ""
read -p "Nhập email cho bạn nam: " male_email

echo ""
echo "Đang tạo tài khoản, vui lòng đợi..."

# Tạo tài khoản nữ thông qua API
echo ""
echo "Tạo tài khoản cho bạn nữ..."
female_result=$(curl -s -X POST -H "Content-Type: application/json" -d '{
    "username": "'$female_username'",
    "email": "'$female_email'",
    "password": "'$female_password'",
    "role": ["user", "female"],
    "gender": "female"
}' http://localhost:8080/api/auth/register)

if [[ $female_result == *"User registered successfully"* ]]; then
    echo "✅ Đã tạo tài khoản cho bạn nữ thành công!"
else
    echo "❌ Lỗi khi tạo tài khoản cho bạn nữ: $female_result"
fi

# Tạo tài khoản nam thông qua API
echo ""
echo "Tạo tài khoản cho bạn nam..."
male_result=$(curl -s -X POST -H "Content-Type: application/json" -d '{
    "username": "'$male_username'",
    "email": "'$male_email'",
    "password": "'$male_password'",
    "role": ["user", "male"],
    "gender": "male"
}' http://localhost:8080/api/auth/register)

if [[ $male_result == *"User registered successfully"* ]]; then
    echo "✅ Đã tạo tài khoản cho bạn nam thành công!"
else
    echo "❌ Lỗi khi tạo tài khoản cho bạn nam: $male_result"
fi

echo ""
echo "===================================================="
echo "     THÔNG TIN ĐĂNG NHẬP"
echo "===================================================="
echo "Bạn nữ:"
echo "- Tên đăng nhập: $female_username"
echo "- Mật khẩu: ********"
echo ""
echo "Bạn nam:"
echo "- Tên đăng nhập: $male_username"
echo "- Mật khẩu: ********"
echo ""
echo "Vui lòng lưu lại thông tin này để đăng nhập vào trang Love Story!"
echo "===================================================="