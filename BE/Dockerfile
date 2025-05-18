FROM maven:3.8.4-openjdk-17-slim AS build

WORKDIR /app

# Sao chép pom.xml
COPY pom.xml .

# Tải dependencies (lớp cache)
RUN mvn dependency:go-offline -B

# Sao chép source code
COPY src ./src

# Build ứng dụng
RUN mvn package -DskipTests

# Bước runtime
FROM openjdk:17-slim

WORKDIR /app

# Sao chép JAR từ bước build
COPY --from=build /app/target/*.jar app.jar

# Thư mục uploads
RUN mkdir -p /app/uploads

# Mở port
EXPOSE 8080

# Chạy ứng dụng
ENTRYPOINT ["java", "-jar", "/app/app.jar"]