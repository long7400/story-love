#!/bin/bash

# Script để đăng ký người dùng mới với API
# Sử dụng: ./register_user.sh <username> <email> <password> <role>

# Kiểm tra số lượng tham số
if [ "$#" -lt 4 ]; then
    echo "Sử dụng: $0 <username> <email> <password> <role> [gender]"
    echo "Role có thể là: admin, male, female, user"
    echo "Gender có thể là: male, female (tùy chọn, mặc định là male)"
    exit 1
fi

USERNAME=$1
EMAIL=$2
PASSWORD=$3
ROLE=$4
GENDER=${5:-male}

# URL đến API
API_URL="http://localhost:8080/api/auth/register"

# Tạo JSON data cho request
JSON_DATA=$(cat << EOF
{
  "username": "$USERNAME",
  "email": "$EMAIL",
  "password": "$PASSWORD",
  "role": ["$ROLE"],
  "gender": "$GENDER"
}
EOF
)

# Gửi request đến API
echo "Đang đăng ký người dùng $USERNAME với vai trò $ROLE..."
curl -X POST \
  -H "Content-Type: application/json" \
  -d "$JSON_DATA" \
  $API_URL

echo -e "\nĐăng ký hoàn tất. Vui lòng kiểm tra kết quả ở trên."