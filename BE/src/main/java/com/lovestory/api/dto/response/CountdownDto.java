package com.lovestory.api.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * DTO for Countdown responses
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CountdownDto {
    private Long id;
    
    private String title;
    
    private LocalDateTime targetDate;
    
    private String targetDateFormatted;
    
    private String description;
    
    private String imageUrl;
    
    private String backgroundColor;
    
    private String fontColor;
    
    private Long relationshipId;
}