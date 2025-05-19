package com.lovestory.api.controller;

import java.util.List;
import java.util.stream.Collectors;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lovestory.api.model.User;
import com.lovestory.api.payload.request.LoginRequest;
import com.lovestory.api.payload.response.JwtResponse;
import com.lovestory.api.payload.response.MessageResponse;
import com.lovestory.api.repository.UserRepository;
import com.lovestory.api.security.jwt.JwtUtils;
import com.lovestory.api.security.services.UserDetailsImpl;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/storefront")
public class StorefrontAuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        // Kiểm tra xem user có tồn tại không
        User user = userRepository.findByUsername(loginRequest.getUsername())
                .orElse(null);
        
        if (user == null) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: User not found!"));
        }
        
        // Kiểm tra xem user đã được kích hoạt chưa
        if (!user.isActivated()) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Account is not activated!"));
        }
        
        // Kiểm tra xem user có vai trò ROLE_MALE hoặc ROLE_FEMALE không
        boolean hasStorefrontRole = user.getRoles().stream()
                .anyMatch(role -> role.getName().name().equals("ROLE_MALE") 
                        || role.getName().name().equals("ROLE_FEMALE"));
        
        if (!hasStorefrontRole) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: You do not have permission to access the Storefront!"));
        }
        
        // Xác thực người dùng
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());
        
        // Trả về thông tin người dùng kèm token
        return ResponseEntity.ok(new JwtResponse(jwt, 
                                 userDetails.getId(), 
                                 userDetails.getUsername(), 
                                 userDetails.getEmail(), 
                                 roles));
    }
    
    @PostMapping("/check-account")
    public ResponseEntity<?> checkAccount(@RequestBody LoginRequest loginRequest) {
        // Kiểm tra xem user có tồn tại không
        User user = userRepository.findByUsername(loginRequest.getUsername())
                .orElse(null);
                
        if (user == null) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: User not found!"));
        }
        
        // Kiểm tra password - nhưng không đăng nhập
        try {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
                
            // Nếu chưa kích hoạt, trả về lỗi 401 để hiển thị màn hình kích hoạt
            if (!user.isActivated()) {
                return ResponseEntity.status(401)
                        .body(new MessageResponse("Account needs activation"));
            }
            
            // Nếu đã kích hoạt, trả về thông tin vai trò
            return ResponseEntity.ok().body(
                    new MessageResponse("PARTNER")
            );
            
        } catch (Exception e) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Invalid credentials"));
        }
    }
    
    @PostMapping("/activate-account")
    public ResponseEntity<?> activateAccount(@RequestBody LoginRequest loginRequest) {
        // Kiểm tra xem user có tồn tại không
        User user = userRepository.findByUsername(loginRequest.getUsername())
                .orElse(null);
                
        if (user == null) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: User not found!"));
        }
        
        // Kích hoạt tài khoản
        user.setActivated(true);
        userRepository.save(user);
        
        // Xác thực người dùng và tạo token
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());
        
        // Trả về thông tin người dùng kèm token
        return ResponseEntity.ok(new JwtResponse(jwt, 
                                 userDetails.getId(), 
                                 userDetails.getUsername(), 
                                 userDetails.getEmail(), 
                                 roles));
    }
}