package com.lovestory.api.service;

import com.lovestory.api.model.Relationship;
import com.lovestory.api.repository.RelationshipRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class RelationshipService {
    @Autowired
    private RelationshipRepository relationshipRepository;
    
    /**
     * Get all relationships
     */
    public List<Relationship> getAllRelationships() {
        return relationshipRepository.findAll();
    }
    
    /**
     * Get relationship by ID
     */
    public Relationship getRelationshipById(Long id) {
        Optional<Relationship> relationship = relationshipRepository.findById(id);
        return relationship.orElse(null);
    }
    
    /**
     * Get the active relationship (currently just returns the first one - 
     * in future could be extended to support multiple relationships)
     */
    public Relationship getActiveRelationship() {
        List<Relationship> relationships = relationshipRepository.findAll();
        if (relationships.isEmpty()) {
            return null;
        }
        return relationships.get(0);
    }
    
    /**
     * Create a new relationship
     */
    @Transactional
    public Relationship createRelationship(Relationship relationship) {
        return relationshipRepository.save(relationship);
    }
    
    /**
     * Update an existing relationship
     */
    @Transactional
    public Relationship updateRelationship(Long id, Relationship relationshipDetails) {
        Relationship relationship = getRelationshipById(id);
        if (relationship == null) {
            return null;
        }
        
        relationship.setStartDate(relationshipDetails.getStartDate());
        relationship.setTitle(relationshipDetails.getTitle());
        relationship.setDescription(relationshipDetails.getDescription());
        relationship.setAnniversaryMessage(relationshipDetails.getAnniversaryMessage());
        
        return relationshipRepository.save(relationship);
    }
    
    /**
     * Delete a relationship
     */
    @Transactional
    public boolean deleteRelationship(Long id) {
        Relationship relationship = getRelationshipById(id);
        if (relationship == null) {
            return false;
        }
        
        relationshipRepository.delete(relationship);
        return true;
    }
}