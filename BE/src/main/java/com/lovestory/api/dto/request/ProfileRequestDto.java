package com.lovestory.api.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * DTO for Profile creation and update requests
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProfileRequestDto {
    @NotBlank
    private String name;
    
    private LocalDate birthday;
    
    private String avatarUrl;
    
    private String bio;
    
    private String favoriteQuote;
    
    private Long relationshipId;
}