package com.lovestory.api.controller;

import com.lovestory.api.model.Relationship;
import com.lovestory.api.service.RelationshipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/relationships")
public class RelationshipController {

    private final RelationshipService relationshipService;

    @Autowired
    public RelationshipController(RelationshipService relationshipService) {
        this.relationshipService = relationshipService;
    }

    @GetMapping
    public ResponseEntity<List<Relationship>> getAllRelationships() {
        return ResponseEntity.ok(relationshipService.getAllRelationships());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Relationship> getRelationshipById(@PathVariable Long id) {
        return relationshipService.getRelationshipById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Relationship> createRelationship(@RequestBody Relationship relationship) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(relationshipService.createRelationship(relationship));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Relationship> updateRelationship(@PathVariable Long id, @RequestBody Relationship relationship) {
        return relationshipService.updateRelationship(id, relationship)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRelationship(@PathVariable Long id) {
        if (relationshipService.deleteRelationship(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}