package com.lovestory.api.converter;

import com.lovestory.api.dto.request.PhotoRequestDto;
import com.lovestory.api.dto.response.PhotoDto;
import com.lovestory.api.model.Photo;
import com.lovestory.api.model.Relationship;

import java.util.List;

/**
 * Converter interface for Photo entity and DTOs
 */
public interface PhotoConverter {
    /**
     * Convert Photo entity to PhotoDto
     * 
     * @param photo Photo entity
     * @return PhotoDto
     */
    PhotoDto toDto(Photo photo);

    /**
     * Convert a list of Photo entities to a list of PhotoDtos
     * 
     * @param photos List of Photo entities
     * @return List of PhotoDtos
     */
    List<PhotoDto> toDtoList(List<Photo> photos);

    /**
     * Convert PhotoRequestDto to Photo entity
     * 
     * @param requestDto PhotoRequestDto
     * @param relationship Relationship entity
     * @return Photo entity
     */
    Photo toEntity(PhotoRequestDto requestDto, Relationship relationship);

    /**
     * Update Photo entity with PhotoRequestDto
     * 
     * @param photo Existing Photo entity
     * @param requestDto PhotoRequestDto with updated values
     * @param relationship Relationship entity
     * @return Updated Photo entity
     */
    Photo updateEntity(Photo photo, PhotoRequestDto requestDto, Relationship relationship);
}
