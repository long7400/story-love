package com.lovestory.api.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * DTO for Event creation and update requests
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EventRequestDto {
    @NotBlank
    private String title;
    
    private LocalDate date;
    
    private String shortDescription;
    
    private String fullDescription;
    
    private String imageUrl;
    
    private Boolean htmlEnabled;
    
    private Long relationshipId = 1L;
}