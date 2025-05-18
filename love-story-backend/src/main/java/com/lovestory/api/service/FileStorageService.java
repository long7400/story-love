package com.lovestory.api.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class FileStorageService {

    private final Path fileStorageLocation;

    public FileStorageService(@Value("${app.file.upload-dir}") String uploadDir) {
        this.fileStorageLocation = Paths.get(uploadDir)
                .toAbsolutePath().normalize();

        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new RuntimeException("Không thể tạo thư mục để lưu trữ file tải lên.", ex);
        }
    }

    public String storeFile(MultipartFile file) {
        // Chuẩn hóa tên file
        String originalFileName = StringUtils.cleanPath(file.getOriginalFilename());
        String fileExtension = "";
        
        try {
            // Kiểm tra file có chứa ký tự không hợp lệ
            if (originalFileName.contains("..")) {
                throw new RuntimeException("Xin lỗi! Tên file chứa đường dẫn không hợp lệ " + originalFileName);
            }
            
            // Lấy phần mở rộng của file
            int dotIndex = originalFileName.lastIndexOf('.');
            if (dotIndex > 0) {
                fileExtension = originalFileName.substring(dotIndex);
            }
            
            // Tạo tên file duy nhất dựa trên UUID
            String fileName = UUID.randomUUID().toString() + fileExtension;
            
            // Đường dẫn lưu trữ target
            Path targetLocation = this.fileStorageLocation.resolve(fileName);
            
            // Lưu file vào hệ thống
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            return fileName;
        } catch (IOException ex) {
            throw new RuntimeException("Không thể lưu trữ file " + originalFileName + ". Vui lòng thử lại!", ex);
        }
    }

    public Resource loadFileAsResource(String fileName) {
        try {
            Path filePath = this.fileStorageLocation.resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists()) {
                return resource;
            } else {
                throw new RuntimeException("Không tìm thấy file " + fileName);
            }
        } catch (MalformedURLException ex) {
            throw new RuntimeException("Không tìm thấy file " + fileName, ex);
        }
    }
    
    public boolean deleteFile(String fileName) {
        try {
            Path filePath = this.fileStorageLocation.resolve(fileName).normalize();
            return Files.deleteIfExists(filePath);
        } catch (IOException ex) {
            throw new RuntimeException("Không thể xóa file " + fileName, ex);
        }
    }
}