package com.lovestory.api.converter.impl;

import com.lovestory.api.converter.PhotoConverter;
import com.lovestory.api.dto.request.PhotoRequestDto;
import com.lovestory.api.dto.response.PhotoDto;
import com.lovestory.api.model.Photo;
import com.lovestory.api.model.Relationship;
import org.springframework.stereotype.Component;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Implementation of PhotoConverter interface
 */
@Component
public class PhotoConverterImpl implements PhotoConverter {

    private final DateTimeFormatter dateFormatter = DateTimeFormatter.ISO_DATE;

    /**
     * Convert Photo entity to PhotoDto
     * 
     * @param photo Photo entity
     * @return PhotoDto
     */
    @Override
    public PhotoDto toDto(Photo photo) {
        if (photo == null) {
            return null;
        }

        return PhotoDto.builder()
                .id(photo.getId())
                .title(photo.getTitle())
                .date(photo.getDate())
                .dateFormatted(photo.getDate() != null ? photo.getDate().format(dateFormatter) : null)
                .description(photo.getDescription())
                .imageUrl(photo.getImageUrl())
                .relationshipId(photo.getRelationship() != null ? photo.getRelationship().getId() : null)
                .build();
    }

    /**
     * Convert a list of Photo entities to a list of PhotoDtos
     * 
     * @param photos List of Photo entities
     * @return List of PhotoDtos
     */
    @Override
    public List<PhotoDto> toDtoList(List<Photo> photos) {
        if (photos == null) {
            return List.of();
        }

        return photos.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    /**
     * Convert PhotoRequestDto to Photo entity
     * 
     * @param requestDto PhotoRequestDto
     * @param relationship Relationship entity
     * @return Photo entity
     */
    @Override
    public Photo toEntity(PhotoRequestDto requestDto, Relationship relationship) {
        if (requestDto == null) {
            return null;
        }

        Photo photo = new Photo();
        photo.setTitle(requestDto.getTitle());
        photo.setDate(requestDto.getDate());
        photo.setDescription(requestDto.getDescription());
        photo.setImageUrl(requestDto.getImageUrl());
        photo.setLocation(requestDto.getLocation());
        photo.setTags(requestDto.getTags());
        photo.setHtmlEnabled(requestDto.getHtmlEnabled());
        photo.setRelationship(relationship);

        return photo;
    }

    /**
     * Update Photo entity with PhotoRequestDto
     * 
     * @param photo Existing Photo entity
     * @param requestDto PhotoRequestDto with updated values
     * @param relationship Relationship entity
     * @return Updated Photo entity
     */
    @Override
    public Photo updateEntity(Photo photo, PhotoRequestDto requestDto, Relationship relationship) {
        if (photo == null || requestDto == null) {
            return photo;
        }

        photo.setTitle(requestDto.getTitle());
        photo.setDate(requestDto.getDate());
        photo.setDescription(requestDto.getDescription());
        photo.setImageUrl(requestDto.getImageUrl());
        photo.setLocation(requestDto.getLocation());
        photo.setTags(requestDto.getTags());
        photo.setHtmlEnabled(requestDto.getHtmlEnabled());
        photo.setRelationship(relationship);

        return photo;
    }
}
