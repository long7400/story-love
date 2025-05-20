package com.lovestory.api.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * DTO for LocationMarker creation and update requests
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LocationMarkerRequestDto {
    @NotBlank
    private String name;
    
    private String description;
    
    private LocalDate date;
    
    private Double latitude;
    
    private Double longitude;
    
    private Boolean isSpecial;
    
    private String imageUrl;
    
    private Long relationshipId;
}