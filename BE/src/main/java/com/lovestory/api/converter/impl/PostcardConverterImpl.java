package com.lovestory.api.converter.impl;

import com.lovestory.api.converter.PostcardConverter;
import com.lovestory.api.dto.request.PostcardRequestDto;
import com.lovestory.api.dto.response.PostcardDto;
import com.lovestory.api.model.Postcard;
import com.lovestory.api.model.Relationship;
import com.lovestory.api.model.User;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Implementation of PostcardConverter interface
 */
@Component
public class PostcardConverterImpl implements PostcardConverter {

    private final DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ISO_DATE_TIME;

    /**
     * Convert Postcard entity to PostcardDto
     * 
     * @param postcard Postcard entity
     * @return PostcardDto
     */
    @Override
    public PostcardDto toDto(Postcard postcard) {
        if (postcard == null) {
            return null;
        }
        
        return PostcardDto.builder()
                .id(postcard.getId())
                .title(postcard.getTitle())
                .message(postcard.getMessage())
                .imageUrl(postcard.getImageUrl())
                .backgroundColor(postcard.getBackgroundColor())
                .fontFamily(postcard.getFontFamily())
                .fromName(postcard.getFromName())
                .toName(postcard.getToName())
                .createdAt(postcard.getCreatedAt())
                .createdAtFormatted(postcard.getCreatedAt() != null ? postcard.getCreatedAt().format(dateTimeFormatter) : null)
                .deliveredAt(postcard.getDeliveredAt())
                .deliveredAtFormatted(postcard.getDeliveredAt() != null ? postcard.getDeliveredAt().format(dateTimeFormatter) : null)
                .htmlEnabled(postcard.getHtmlEnabled())
                .relationshipId(postcard.getRelationship() != null ? postcard.getRelationship().getId() : null)
                .creatorId(postcard.getCreator() != null ? postcard.getCreator().getId() : null)
                .creatorUsername(postcard.getCreator() != null ? postcard.getCreator().getUsername() : null)
                .build();
    }

    /**
     * Convert a list of Postcard entities to a list of PostcardDtos
     * 
     * @param postcards List of Postcard entities
     * @return List of PostcardDtos
     */
    @Override
    public List<PostcardDto> toDtoList(List<Postcard> postcards) {
        if (postcards == null) {
            return List.of();
        }
        
        return postcards.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    /**
     * Convert PostcardRequestDto to Postcard entity
     * 
     * @param requestDto PostcardRequestDto
     * @param relationship Relationship entity
     * @param creator User entity
     * @return Postcard entity
     */
    @Override
    public Postcard toEntity(PostcardRequestDto requestDto, Relationship relationship, User creator) {
        if (requestDto == null) {
            return null;
        }
        
        Postcard postcard = new Postcard();
        postcard.setTitle(requestDto.getTitle());
        postcard.setMessage(requestDto.getMessage());
        postcard.setImageUrl(requestDto.getImageUrl());
        postcard.setBackgroundColor(requestDto.getBackgroundColor());
        postcard.setFontFamily(requestDto.getFontFamily());
        postcard.setFromName(requestDto.getFromName());
        postcard.setToName(requestDto.getToName());
        postcard.setHtmlEnabled(requestDto.getHtmlEnabled());
        postcard.setRelationship(relationship);
        postcard.setCreator(creator);
        postcard.setCreatedAt(LocalDateTime.now());
        
        return postcard;
    }

    /**
     * Update Postcard entity with PostcardRequestDto
     * 
     * @param postcard Existing Postcard entity
     * @param requestDto PostcardRequestDto with updated values
     * @param relationship Relationship entity
     * @return Updated Postcard entity
     */
    @Override
    public Postcard updateEntity(Postcard postcard, PostcardRequestDto requestDto, Relationship relationship) {
        if (postcard == null || requestDto == null) {
            return postcard;
        }
        
        postcard.setTitle(requestDto.getTitle());
        postcard.setMessage(requestDto.getMessage());
        postcard.setImageUrl(requestDto.getImageUrl());
        postcard.setBackgroundColor(requestDto.getBackgroundColor());
        postcard.setFontFamily(requestDto.getFontFamily());
        postcard.setFromName(requestDto.getFromName());
        postcard.setToName(requestDto.getToName());
        postcard.setHtmlEnabled(requestDto.getHtmlEnabled());
        postcard.setRelationship(relationship);
        
        return postcard;
    }
}