package com.lovestory.api.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * DTO for Event responses
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EventResponseDto {
    private Long id;
    
    private String title;
    
    private LocalDate date;
    
    private String shortDescription;
    
    private String fullDescription;
    
    private String imageUrl;
    
    private Boolean htmlEnabled;
    
    private Long relationshipId;
    
    // Additional fields that might be needed for the frontend
    private String relationshipTitle;
}