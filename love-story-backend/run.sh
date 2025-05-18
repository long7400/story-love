#!/bin/bash

echo "Building Love Story Spring Boot application..."
cd "$(dirname "$0")"
./mvnw clean package -DskipTests

echo "Running Love Story Spring Boot application..."
java -jar target/api-0.0.1-SNAPSHOT.jar