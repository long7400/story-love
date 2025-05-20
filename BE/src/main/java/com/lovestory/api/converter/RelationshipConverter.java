package com.lovestory.api.converter;

import com.lovestory.api.dto.request.RelationshipRequestDto;
import com.lovestory.api.dto.response.RelationshipDto;
import com.lovestory.api.model.Relationship;

import java.util.List;

/**
 * Converter interface for Relationship entity and DTOs
 */
public interface RelationshipConverter {
    /**
     * Convert Relationship entity to RelationshipDto
     * 
     * @param relationship Relationship entity
     * @return RelationshipDto
     */
    RelationshipDto toDto(Relationship relationship);

    /**
     * Convert a list of Relationship entities to a list of RelationshipDtos
     * 
     * @param relationships List of Relationship entities
     * @return List of RelationshipDtos
     */
    List<RelationshipDto> toDtoList(List<Relationship> relationships);

    /**
     * Convert RelationshipRequestDto to Relationship entity
     * 
     * @param requestDto RelationshipRequestDto
     * @return Relationship entity
     */
    Relationship toEntity(RelationshipRequestDto requestDto);

    /**
     * Update Relationship entity with RelationshipRequestDto
     * 
     * @param relationship Existing Relationship entity
     * @param requestDto RelationshipRequestDto with updated values
     * @return Updated Relationship entity
     */
    Relationship updateEntity(Relationship relationship, RelationshipRequestDto requestDto);
}
