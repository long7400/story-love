package com.lovestory.api.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * DTO for Photo creation and update requests
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PhotoRequestDto {
    @NotBlank
    private String title;
    
    private LocalDate date;
    
    private String description;
    
    @NotBlank
    private String imageUrl;
    
    private String location;
    
    private String tags;
    
    private Boolean htmlEnabled;
    
    private Long relationshipId;
}