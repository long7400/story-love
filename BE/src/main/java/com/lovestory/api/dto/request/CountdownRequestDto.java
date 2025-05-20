package com.lovestory.api.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * DTO for Countdown creation and update requests
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CountdownRequestDto {
    @NotBlank
    private String title;
    
    private LocalDateTime targetDate;
    
    private String description;
    
    private String imageUrl;
    
    private String backgroundColor;
    
    private String fontColor;
    
    private Long relationshipId;
}