FROM openjdk:17-jdk-slim as build

WORKDIR /app

# Sao chép các file Maven
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
COPY src ./src

# Cấp quyền thực thi cho mvnw
RUN chmod +x ./mvnw

# Build ứng dụng
RUN ./mvnw package -DskipTests

# Bước runtime
FROM openjdk:17-jdk-slim

WORKDIR /app

# Sao chép file JAR từ bước build
COPY --from=build /app/target/*.jar app.jar

# Tạo thư mục uploads
RUN mkdir -p /app/uploads
VOLUME /app/uploads

# Cổng mà application sử dụng
EXPOSE 8080

# Biến môi trường cho profiles
ENV SPRING_PROFILES_ACTIVE=dev

# Chạy ứng dụng
ENTRYPOINT ["java", "-jar", "/app/app.jar"]