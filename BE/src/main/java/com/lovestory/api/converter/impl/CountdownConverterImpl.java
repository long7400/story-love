package com.lovestory.api.converter.impl;

import com.lovestory.api.converter.CountdownConverter;
import com.lovestory.api.dto.request.CountdownRequestDto;
import com.lovestory.api.dto.response.CountdownDto;
import com.lovestory.api.model.Countdown;
import com.lovestory.api.model.Relationship;
import org.springframework.stereotype.Component;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Implementation of CountdownConverter interface
 */
@Component
public class CountdownConverterImpl implements CountdownConverter {

    private final DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ISO_DATE_TIME;

    /**
     * Convert Countdown entity to CountdownDto
     * 
     * @param countdown Countdown entity
     * @return CountdownDto
     */
    @Override
    public CountdownDto toDto(Countdown countdown) {
        if (countdown == null) {
            return null;
        }
        
        return CountdownDto.builder()
                .id(countdown.getId())
                .title(countdown.getTitle())
                .targetDate(countdown.getTargetDate())
                .targetDateFormatted(countdown.getTargetDate() != null ? countdown.getTargetDate().format(dateTimeFormatter) : null)
                .description(countdown.getDescription())
                .imageUrl(countdown.getImageUrl())
                .backgroundColor(countdown.getBackgroundColor())
                .fontColor(countdown.getFontColor())
                .relationshipId(countdown.getRelationship() != null ? countdown.getRelationship().getId() : null)
                .build();
    }

    /**
     * Convert a list of Countdown entities to a list of CountdownDtos
     * 
     * @param countdowns List of Countdown entities
     * @return List of CountdownDtos
     */
    @Override
    public List<CountdownDto> toDtoList(List<Countdown> countdowns) {
        if (countdowns == null) {
            return List.of();
        }
        
        return countdowns.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    /**
     * Convert CountdownRequestDto to Countdown entity
     * 
     * @param requestDto CountdownRequestDto
     * @param relationship Relationship entity
     * @return Countdown entity
     */
    @Override
    public Countdown toEntity(CountdownRequestDto requestDto, Relationship relationship) {
        if (requestDto == null) {
            return null;
        }
        
        Countdown countdown = new Countdown();
        countdown.setTitle(requestDto.getTitle());
        countdown.setTargetDate(requestDto.getTargetDate());
        countdown.setDescription(requestDto.getDescription());
        countdown.setImageUrl(requestDto.getImageUrl());
        countdown.setBackgroundColor(requestDto.getBackgroundColor());
        countdown.setFontColor(requestDto.getFontColor());
        countdown.setRelationship(relationship);
        
        return countdown;
    }

    /**
     * Update Countdown entity with CountdownRequestDto
     * 
     * @param countdown Existing Countdown entity
     * @param requestDto CountdownRequestDto with updated values
     * @param relationship Relationship entity
     * @return Updated Countdown entity
     */
    @Override
    public Countdown updateEntity(Countdown countdown, CountdownRequestDto requestDto, Relationship relationship) {
        if (countdown == null || requestDto == null) {
            return countdown;
        }
        
        countdown.setTitle(requestDto.getTitle());
        countdown.setTargetDate(requestDto.getTargetDate());
        countdown.setDescription(requestDto.getDescription());
        countdown.setImageUrl(requestDto.getImageUrl());
        countdown.setBackgroundColor(requestDto.getBackgroundColor());
        countdown.setFontColor(requestDto.getFontColor());
        countdown.setRelationship(relationship);
        
        return countdown;
    }
}