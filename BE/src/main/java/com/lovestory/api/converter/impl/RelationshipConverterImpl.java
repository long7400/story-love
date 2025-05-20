package com.lovestory.api.converter.impl;

import com.lovestory.api.converter.RelationshipConverter;
import com.lovestory.api.dto.request.RelationshipRequestDto;
import com.lovestory.api.dto.response.RelationshipDto;
import com.lovestory.api.model.Relationship;
import org.springframework.stereotype.Component;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Implementation of RelationshipConverter interface
 */
@Component
public class RelationshipConverterImpl implements RelationshipConverter {

    private final DateTimeFormatter dateFormatter = DateTimeFormatter.ISO_DATE;

    /**
     * Convert Relationship entity to RelationshipDto
     * 
     * @param relationship Relationship entity
     * @return RelationshipDto
     */
    @Override
    public RelationshipDto toDto(Relationship relationship) {
        if (relationship == null) {
            return null;
        }

        return RelationshipDto.builder()
                .id(relationship.getId())
                .startDate(relationship.getStartDate())
                .startDateFormatted(relationship.getStartDate() != null ? relationship.getStartDate().format(dateFormatter) : null)
                .title(relationship.getTitle())
                .description(relationship.getDescription())
                .anniversaryMessage(relationship.getAnniversaryMessage())
                .build();
    }

    /**
     * Convert a list of Relationship entities to a list of RelationshipDtos
     * 
     * @param relationships List of Relationship entities
     * @return List of RelationshipDtos
     */
    @Override
    public List<RelationshipDto> toDtoList(List<Relationship> relationships) {
        if (relationships == null) {
            return List.of();
        }

        return relationships.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    /**
     * Convert RelationshipRequestDto to Relationship entity
     * 
     * @param requestDto RelationshipRequestDto
     * @return Relationship entity
     */
    @Override
    public Relationship toEntity(RelationshipRequestDto requestDto) {
        if (requestDto == null) {
            return null;
        }

        Relationship relationship = new Relationship();
        relationship.setStartDate(requestDto.getStartDate());
        relationship.setTitle(requestDto.getTitle());
        relationship.setDescription(requestDto.getDescription());
        relationship.setAnniversaryMessage(requestDto.getAnniversaryMessage());

        return relationship;
    }

    /**
     * Update Relationship entity with RelationshipRequestDto
     * 
     * @param relationship Existing Relationship entity
     * @param requestDto RelationshipRequestDto with updated values
     * @return Updated Relationship entity
     */
    @Override
    public Relationship updateEntity(Relationship relationship, RelationshipRequestDto requestDto) {
        if (relationship == null || requestDto == null) {
            return relationship;
        }

        relationship.setStartDate(requestDto.getStartDate());
        relationship.setTitle(requestDto.getTitle());
        relationship.setDescription(requestDto.getDescription());
        relationship.setAnniversaryMessage(requestDto.getAnniversaryMessage());

        return relationship;
    }
}
