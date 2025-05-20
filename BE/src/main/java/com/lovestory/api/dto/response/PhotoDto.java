package com.lovestory.api.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * DTO for Photo responses
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PhotoDto {
    private Long id;
    private String title;
    private LocalDate date;
    private String dateFormatted;
    private String description;
    private String imageUrl;
    private Long relationshipId;
}