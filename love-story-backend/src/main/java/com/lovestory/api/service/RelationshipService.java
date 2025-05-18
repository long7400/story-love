package com.lovestory.api.service;

import com.lovestory.api.model.Relationship;
import com.lovestory.api.repository.RelationshipRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RelationshipService {

    private final RelationshipRepository relationshipRepository;

    @Autowired
    public RelationshipService(RelationshipRepository relationshipRepository) {
        this.relationshipRepository = relationshipRepository;
    }

    public List<Relationship> getAllRelationships() {
        return relationshipRepository.findAll();
    }

    public Optional<Relationship> getRelationshipById(Long id) {
        return relationshipRepository.findById(id);
    }

    public Relationship createRelationship(Relationship relationship) {
        return relationshipRepository.save(relationship);
    }

    public Optional<Relationship> updateRelationship(Long id, Relationship relationshipDetails) {
        return relationshipRepository.findById(id)
                .map(existingRelationship -> {
                    existingRelationship.setStartDate(relationshipDetails.getStartDate());
                    return relationshipRepository.save(existingRelationship);
                });
    }

    public boolean deleteRelationship(Long id) {
        return relationshipRepository.findById(id)
                .map(relationship -> {
                    relationshipRepository.delete(relationship);
                    return true;
                })
                .orElse(false);
    }
}