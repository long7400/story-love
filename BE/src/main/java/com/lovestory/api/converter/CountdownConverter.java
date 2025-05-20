package com.lovestory.api.converter;

import com.lovestory.api.dto.request.CountdownRequestDto;
import com.lovestory.api.dto.response.CountdownDto;
import com.lovestory.api.model.Countdown;
import com.lovestory.api.model.Relationship;

import java.util.List;

/**
 * Converter interface for Countdown entity and DTOs
 */
public interface CountdownConverter {
    /**
     * Convert Countdown entity to CountdownDto
     * 
     * @param countdown Countdown entity
     * @return CountdownDto
     */
    CountdownDto toDto(Countdown countdown);
    
    /**
     * Convert a list of Countdown entities to a list of CountdownDtos
     * 
     * @param countdowns List of Countdown entities
     * @return List of CountdownDtos
     */
    List<CountdownDto> toDtoList(List<Countdown> countdowns);
    
    /**
     * Convert CountdownRequestDto to Countdown entity
     * 
     * @param requestDto CountdownRequestDto
     * @param relationship Relationship entity
     * @return Countdown entity
     */
    Countdown toEntity(CountdownRequestDto requestDto, Relationship relationship);
    
    /**
     * Update Countdown entity with CountdownRequestDto
     * 
     * @param countdown Existing Countdown entity
     * @param requestDto CountdownRequestDto with updated values
     * @param relationship Relationship entity
     * @return Updated Countdown entity
     */
    Countdown updateEntity(Countdown countdown, CountdownRequestDto requestDto, Relationship relationship);
}