package com.lovestory.api.controller;

import com.lovestory.api.model.Relationship;
import com.lovestory.api.service.RelationshipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/relationships")
public class RelationshipController {
    
    @Autowired
    private RelationshipService relationshipService;
    
    @GetMapping
    public ResponseEntity<List<Relationship>> getAllRelationships() {
        return ResponseEntity.ok(relationshipService.getAllRelationships());
    }
    
    @GetMapping("/active")
    public ResponseEntity<Relationship> getActiveRelationship() {
        Relationship relationship = relationshipService.getActiveRelationship();
        if (relationship == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(relationship);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Relationship> getRelationshipById(@PathVariable Long id) {
        Relationship relationship = relationshipService.getRelationshipById(id);
        if (relationship == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(relationship);
    }
    
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Relationship> createRelationship(@RequestBody Relationship relationship) {
        return ResponseEntity.ok(relationshipService.createRelationship(relationship));
    }
    
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('PARTNER')")
    public ResponseEntity<Relationship> updateRelationship(@PathVariable Long id, @RequestBody Relationship relationshipDetails) {
        Relationship updatedRelationship = relationshipService.updateRelationship(id, relationshipDetails);
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