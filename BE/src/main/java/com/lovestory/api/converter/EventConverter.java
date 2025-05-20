package com.lovestory.api.converter;

import com.lovestory.api.dto.request.EventRequestDto;
import com.lovestory.api.dto.response.EventResponseDto;
import com.lovestory.api.model.Event;
import com.lovestory.api.model.Relationship;

/**
 * Converter interface for Event entity and DTOs
 */
public interface EventConverter {
    /**
     * Convert Event entity to EventResponseDto
     * 
     * @param event Event entity
     * @return EventResponseDto
     */
    EventResponseDto toDto(Event event);
    
    /**
     * Convert EventRequestDto to Event entity
     * 
     * @param requestDto EventRequestDto
     * @param relationship Relationship entity
     * @return Event entity
     */
    Event toEntity(EventRequestDto requestDto, Relationship relationship);
    
    /**
     * Update Event entity with EventRequestDto
     * 
     * @param event Existing Event entity
     * @param requestDto EventRequestDto with updated values
     * @param relationship Relationship entity
     * @return Updated Event entity
     */
    Event updateEntity(Event event, EventRequestDto requestDto, Relationship relationship);
}