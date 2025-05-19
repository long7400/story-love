-- Script khởi tạo dữ liệu cho các bảng xác thực người dùng
-- Sử dụng: psql -U <username> -d <database_name> -f init_auth_data.sql

-- Xóa dữ liệu cũ (nếu có)
TRUNCATE TABLE user_roles CASCADE;
TRUNCATE TABLE roles CASCADE;
TRUNCATE TABLE users CASCADE;

-- Khởi tạo lại sequence
ALTER SEQUENCE roles_id_seq RESTART WITH 1;
ALTER SEQUENCE users_id_seq RESTART WITH 1;

-- Thêm dữ liệu vào bảng roles
INSERT INTO roles (name) VALUES
('ROLE_USER'),
('ROLE_ADMIN'),
('ROLE_MALE'),
('ROLE_FEMALE');

-- Thêm tài khoản admin
-- Mật khẩu: admin123 (đã được hash bằng BCrypt)
INSERT INTO users (username, email, password, gender, activated) VALUES 
('admin', 'admin@lovestory.com', '$2a$10$mR8IouAA.LnDKqDevnR3Q.1vKf7xcGvzz/GDMjB5J.AGDp2nxgdgW', 'male', true);

-- Gán vai trò cho admin
INSERT INTO user_roles (user_id, role_id) VALUES
(1, 1), -- ROLE_USER
(1, 2); -- ROLE_ADMIN

-- Thêm các ràng buộc cho bảng sessions (nếu chưa có)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_user_roles_user_id') THEN
        ALTER TABLE user_roles ADD CONSTRAINT fk_user_roles_user_id FOREIGN KEY (user_id) REFERENCES users(id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_user_roles_role_id') THEN
        ALTER TABLE user_roles ADD CONSTRAINT fk_user_roles_role_id FOREIGN KEY (role_id) REFERENCES roles(id);
    END IF;
END $$;

-- Kiểm tra dữ liệu
SELECT u.id, u.username, u.email, u.gender, u.activated, r.name as role 
FROM users u 
JOIN user_roles ur ON u.id = ur.user_id 
JOIN roles r ON ur.role_id = r.id
ORDER BY u.id, r.id;