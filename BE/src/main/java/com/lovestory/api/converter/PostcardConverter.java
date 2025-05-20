package com.lovestory.api.converter;

import com.lovestory.api.dto.request.PostcardRequestDto;
import com.lovestory.api.dto.response.PostcardDto;
import com.lovestory.api.model.Postcard;
import com.lovestory.api.model.Relationship;
import com.lovestory.api.model.User;

import java.util.List;

/**
 * Converter interface for Postcard entity and DTOs
 */
public interface PostcardConverter {
    /**
     * Convert Postcard entity to PostcardDto
     * 
     * @param postcard Postcard entity
     * @return PostcardDto
     */
    PostcardDto toDto(Postcard postcard);
    
    /**
     * Convert a list of Postcard entities to a list of PostcardDtos
     * 
     * @param postcards List of Postcard entities
     * @return List of PostcardDtos
     */
    List<PostcardDto> toDtoList(List<Postcard> postcards);
    
    /**
     * Convert PostcardRequestDto to Postcard entity
     * 
     * @param requestDto PostcardRequestDto
     * @param relationship Relationship entity
     * @param creator User entity
     * @return Postcard entity
     */
    Postcard toEntity(PostcardRequestDto requestDto, Relationship relationship, User creator);
    
    /**
     * Update Postcard entity with PostcardRequestDto
     * 
     * @param postcard Existing Postcard entity
     * @param requestDto PostcardRequestDto with updated values
     * @param relationship Relationship entity
     * @return Updated Postcard entity
     */
    Postcard updateEntity(Postcard postcard, PostcardRequestDto requestDto, Relationship relationship);
}