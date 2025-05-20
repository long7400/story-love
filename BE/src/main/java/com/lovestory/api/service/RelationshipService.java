package com.lovestory.api.service;

import com.lovestory.api.converter.RelationshipConverter;
import com.lovestory.api.dto.request.RelationshipRequestDto;
import com.lovestory.api.dto.response.RelationshipDto;
import com.lovestory.api.model.Relationship;
import com.lovestory.api.repository.RelationshipRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service for Relationship related operations
 */
@Service
public class RelationshipService {
    private final RelationshipRepository relationshipRepository;
    private final RelationshipConverter relationshipConverter;

    @Autowired
    public RelationshipService(RelationshipRepository relationshipRepository,
                              RelationshipConverter relationshipConverter) {
        this.relationshipRepository = relationshipRepository;
        this.relationshipConverter = relationshipConverter;
    }

    /**
     * Get all relationships
     * 
     * @return List of RelationshipDto
     */
    public List<RelationshipDto> getAllRelationships() {
        List<Relationship> relationships = relationshipRepository.findAll();
        return relationshipConverter.toDtoList(relationships);
    }

    /**
     * Get relationship by ID
     * 
     * @param id Relationship ID
     * @return RelationshipDto or null if not found
     */
    public RelationshipDto getRelationshipById(Long id) {
        Optional<Relationship> relationshipOpt = relationshipRepository.findById(id);
        return relationshipOpt.map(relationshipConverter::toDto).orElse(null);
    }

    /**
     * Get the active relationship (currently just returns the first one - 
     * in future could be extended to support multiple relationships)
     * 
     * @return RelationshipDto or null if not found
     */
    public RelationshipDto getActiveRelationship() {
        List<Relationship> relationships = relationshipRepository.findAll();
        if (relationships.isEmpty()) {
            return null;
        }
        return relationshipConverter.toDto(relationships.get(0));
    }

    /**
     * Create a new relationship
     * 
     * @param requestDto RelationshipRequestDto
     * @return RelationshipDto
     */
    @Transactional
    public RelationshipDto createRelationship(RelationshipRequestDto requestDto) {
        Relationship relationship = relationshipConverter.toEntity(requestDto);
        Relationship savedRelationship = relationshipRepository.save(relationship);
        return relationshipConverter.toDto(savedRelationship);
    }

    /**
     * Update an existing relationship
     * 
     * @param id Relationship ID
     * @param requestDto RelationshipRequestDto with updated values
     * @return RelationshipDto or null if not found
     */
    @Transactional
    public RelationshipDto updateRelationship(Long id, RelationshipRequestDto requestDto) {
        Optional<Relationship> relationshipOpt = relationshipRepository.findById(id);
        if (relationshipOpt.isEmpty()) {
            return null;
        }

        Relationship relationship = relationshipOpt.get();
        relationship = relationshipConverter.updateEntity(relationship, requestDto);
        Relationship updatedRelationship = relationshipRepository.save(relationship);
        return relationshipConverter.toDto(updatedRelationship);
    }

    /**
     * Delete a relationship
     * 
     * @param id Relationship ID
     * @return true if deleted, false if not found
     */
    @Transactional
    public boolean deleteRelationship(Long id) {
        Optional<Relationship> relationshipOpt = relationshipRepository.findById(id);
        if (relationshipOpt.isEmpty()) {
            return false;
        }

        relationshipRepository.delete(relationshipOpt.get());
        return true;
    }

    /**
     * Get relationship entity by ID (for internal use)
     * 
     * @param id Relationship ID
     * @return Relationship entity or null if not found
     */
    protected Relationship getRelationshipEntityById(Long id) {
        return relationshipRepository.findById(id).orElse(null);
    }
}
