package com.lovestory.api.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * DTO for Profile responses
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProfileDto {
    private Long id;
    private String name;
    private LocalDate birthday;
    private String birthdayFormatted;
    private String avatarUrl;
    private String bio;
    private String favoriteQuote;
    private Long relationshipId;
}
