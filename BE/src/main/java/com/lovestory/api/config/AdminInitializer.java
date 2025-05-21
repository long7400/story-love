package com.lovestory.api.config;

import com.lovestory.api.model.ERole;
import com.lovestory.api.model.Role;
import com.lovestory.api.model.User;
import com.lovestory.api.repository.RoleRepository;
import com.lovestory.api.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

/**
 * Initializes the admin user on application startup if one doesn't exist.
 * Uses environment variables for admin credentials to avoid hardcoding sensitive information.
 */
@Component
public class AdminInitializer implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(AdminInitializer.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Value("${ADMIN_USERNAME:admin}")
    private String adminUsername;

    @Value("${ADMIN_EMAIL:admin@lovestory.com}")
    private String adminEmail;

    @Value("${ADMIN_PASSWORD:#{null}}")
    private String adminPassword;

    @Override
    public void run(String... args) {
        // Check if admin password is set
        if (adminPassword == null || adminPassword.trim().isEmpty()) {
            logger.warn("Admin password not set. Using default password for development only.");
            adminPassword = "admin123"; // Default password for development
        }

        // Check if admin user exists
        if (!userRepository.existsByUsername(adminUsername)) {
            logger.info("Creating admin user: {}", adminUsername);
            createAdminUser();
        } else {
            logger.info("Admin user already exists: {}", adminUsername);
        }
    }

    private void createAdminUser() {
        // Create admin user
        User adminUser = new User(
                adminUsername,
                adminEmail,
                passwordEncoder.encode(adminPassword)
        );

        // Set admin role
        Optional<Role> adminRoleOpt = roleRepository.findByName(ERole.ROLE_ADMIN);
        if (adminRoleOpt.isPresent()) {
            Set<Role> roles = new HashSet<>();
            roles.add(adminRoleOpt.get());
            adminUser.setRoles(roles);
        } else {
            logger.error("Admin role not found. Make sure database is properly initialized.");
            return;
        }

        // Activate admin user
        adminUser.setActivated(true);

        // Save admin user
        userRepository.save(adminUser);
        logger.info("Admin user created successfully");
    }
}
