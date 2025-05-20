package com.lovestory.api.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * DTO for Postcard responses
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostcardDto {
    private Long id;
    
    private String title;
    
    private String message;
    
    private String imageUrl;
    
    private String backgroundColor;
    
    private String fontFamily;
    
    private String fromName;
    
    private String toName;
    
    private LocalDateTime createdAt;
    
    private String createdAtFormatted;
    
    private LocalDateTime deliveredAt;
    
    private String deliveredAtFormatted;
    
    private Boolean htmlEnabled;
    
    private Long relationshipId;
    
    private Long creatorId;
    
    private String creatorUsername;
}