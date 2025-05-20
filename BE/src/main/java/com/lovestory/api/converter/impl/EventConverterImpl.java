package com.lovestory.api.converter.impl;

import com.lovestory.api.converter.EventConverter;
import com.lovestory.api.dto.request.EventRequestDto;
import com.lovestory.api.dto.response.EventResponseDto;
import com.lovestory.api.model.Event;
import com.lovestory.api.model.Relationship;
import org.springframework.stereotype.Component;

/**
 * Implementation of EventConverter interface
 */
@Component
public class EventConverterImpl implements EventConverter {

    /**
     * Convert Event entity to EventResponseDto
     * 
     * @param event Event entity
     * @return EventResponseDto
     */
    @Override
    public EventResponseDto toDto(Event event) {
        if (event == null) {
            return null;
        }
        
        return EventResponseDto.builder()
                .id(event.getId())
                .title(event.getTitle())
                .date(event.getDate())
                .shortDescription(event.getShortDescription())
                .fullDescription(event.getFullDescription())
                .imageUrl(event.getImageUrl())
                .htmlEnabled(event.getHtmlEnabled())
                .relationshipId(event.getRelationship() != null ? event.getRelationship().getId() : null)
                .relationshipTitle(event.getRelationship() != null ? event.getRelationship().getTitle() : null)
                .build();
    }

    /**
     * Convert EventRequestDto to Event entity
     * 
     * @param requestDto EventRequestDto
     * @param relationship Relationship entity
     * @return Event entity
     */
    @Override
    public Event toEntity(EventRequestDto requestDto, Relationship relationship) {
        if (requestDto == null) {
            return null;
        }
        
        Event event = new Event();
        event.setTitle(requestDto.getTitle());
        event.setDate(requestDto.getDate());
        event.setShortDescription(requestDto.getShortDescription());
        event.setFullDescription(requestDto.getFullDescription());
        event.setImageUrl(requestDto.getImageUrl());
        event.setHtmlEnabled(requestDto.getHtmlEnabled());
        event.setRelationship(relationship);
        
        return event;
    }

    /**
     * Update Event entity with EventRequestDto
     * 
     * @param event Existing Event entity
     * @param requestDto EventRequestDto with updated values
     * @param relationship Relationship entity
     * @return Updated Event entity
     */
    @Override
    public Event updateEntity(Event event, EventRequestDto requestDto, Relationship relationship) {
        if (event == null || requestDto == null) {
            return event;
        }
        
        event.setTitle(requestDto.getTitle());
        event.setDate(requestDto.getDate());
        event.setShortDescription(requestDto.getShortDescription());
        event.setFullDescription(requestDto.getFullDescription());
        event.setImageUrl(requestDto.getImageUrl());
        event.setHtmlEnabled(requestDto.getHtmlEnabled());
        event.setRelationship(relationship);
        
        return event;
    }
}