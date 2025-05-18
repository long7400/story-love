#!/bin/bash

# Tệp chạy Spring Boot Application

# Cấp quyền thực thi cho mvnw
chmod +x ./mvnw

# Kiểm tra biến môi trường Spring profile
if [ -z "$SPRING_PROFILES_ACTIVE" ]; then
  # Nếu không có, mặc định chạy local profile
  SPRING_PROFILES_ACTIVE="local"
fi

echo "Khởi chạy với profile: $SPRING_PROFILES_ACTIVE"

# Chạy ứng dụng Spring Boot
./mvnw spring-boot:run -Dspring-boot.run.profiles=$SPRING_PROFILES_ACTIVE