package com.lovestory.api.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * DTO for Relationship creation and update requests
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RelationshipRequestDto {
    private LocalDate startDate;
    
    private String title;
    
    private String description;
    
    private String anniversaryMessage;
}