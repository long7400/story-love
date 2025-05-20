package com.lovestory.api.controller;

import com.lovestory.api.dto.request.RelationshipRequestDto;
import com.lovestory.api.dto.response.RelationshipDto;
import com.lovestory.api.service.RelationshipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

/**
 * REST controller for managing relationships
 */
@RestController
@RequestMapping("/api/relationships")
public class RelationshipController {

    private final RelationshipService relationshipService;

    @Autowired
    public RelationshipController(RelationshipService relationshipService) {
        this.relationshipService = relationshipService;
    }

    @GetMapping
    public ResponseEntity<List<RelationshipDto>> getAllRelationships() {
        return ResponseEntity.ok(relationshipService.getAllRelationships());
    }

    @GetMapping("/active")
    public ResponseEntity<RelationshipDto> getActiveRelationship() {
        RelationshipDto relationship = relationshipService.getActiveRelationship();
        if (relationship == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(relationship);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RelationshipDto> getRelationshipById(@PathVariable Long id) {
        RelationshipDto relationship = relationshipService.getRelationshipById(id);
        if (relationship == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(relationship);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<RelationshipDto> createRelationship(@Valid @RequestBody RelationshipRequestDto requestDto) {
        return ResponseEntity.ok(relationshipService.createRelationship(requestDto));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<RelationshipDto> updateRelationship(@PathVariable Long id, @Valid @RequestBody RelationshipRequestDto requestDto) {
        RelationshipDto updatedRelationship = relationshipService.updateRelationship(id, requestDto);
        if (updatedRelationship == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedRelationship);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteRelationship(@PathVariable Long id) {
        boolean success = relationshipService.deleteRelationship(id);
        if (!success) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }
}
