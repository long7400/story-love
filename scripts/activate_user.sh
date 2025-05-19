#!/bin/bash

# Script để kích hoạt hoặc vô hiệu hóa tài khoản người dùng
# Sử dụng: ./activate_user.sh <username> <token> <activate>

# Kiểm tra số lượng tham số
if [ "$#" -lt 3 ]; then
    echo "Sử dụng: $0 <username> <token> <activate>"
    echo "activate có thể là: true, false"
    exit 1
fi

USERNAME=$1
TOKEN=$2
ACTIVATE=$3

# URL đến API
API_URL="http://localhost:8080/api/auth/activate"

# Tạo JSON data cho request
JSON_DATA=$(cat << EOF
{
  "username": "$USERNAME",
  "activated": $ACTIVATE
}
EOF
)

# Gửi request đến API
echo "Đang ${ACTIVATE} tài khoản $USERNAME..."
curl -X PUT \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d "$JSON_DATA" \
  $API_URL

echo -e "\nCập nhật hoàn tất. Vui lòng kiểm tra kết quả ở trên."