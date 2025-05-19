package com.lovestory.api.controller;

import com.lovestory.api.model.User;
import com.lovestory.api.payload.request.LoginRequest;
import com.lovestory.api.payload.response.JwtResponse;
import com.lovestory.api.repository.UserRepository;
import com.lovestory.api.security.jwt.JwtUtils;
import com.lovestory.api.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class StorefrontAuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/login/storefront")
    public ResponseEntity<?> authenticateStorefrontUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        // Thêm thông tin về giới tính người dùng (lấy từ DB)
        Optional<User> userOpt = userRepository.findByUsername(userDetails.getUsername());
        String gender = "male"; // Mặc định là nam
        
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            // Giả sử thông tin giới tính được lưu trong trường "gender" 
            if (user.getGender() != null && user.getGender().equalsIgnoreCase("female")) {
                gender = "female";
            }
        }

        return ResponseEntity.ok(new JwtResponse(
                jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles,
                gender));
    }
}