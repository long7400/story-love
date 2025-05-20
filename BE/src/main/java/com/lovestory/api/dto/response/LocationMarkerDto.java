package com.lovestory.api.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * DTO for LocationMarker responses
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LocationMarkerDto {
    private Long id;
    
    private String name;
    
    private String description;
    
    private LocalDate date;
    
    private String dateFormatted;
    
    private Double latitude;
    
    private Double longitude;
    
    private Boolean isSpecial;
    
    private String imageUrl;
    
    private Long relationshipId;
}