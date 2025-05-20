package com.lovestory.api.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for Postcard creation and update requests
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostcardRequestDto {
    @NotBlank
    private String title;
    
    private String message;
    
    private String imageUrl;
    
    private String backgroundColor;
    
    private String fontFamily;
    
    private String fromName;
    
    private String toName;
    
    private Boolean htmlEnabled;
    
    private Long relationshipId;
}