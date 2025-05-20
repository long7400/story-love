package com.lovestory.api.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * DTO for Relationship responses
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RelationshipDto {
    private Long id;
    private LocalDate startDate;
    private String startDateFormatted;
    private String title;
    private String description;
    private String anniversaryMessage;
}