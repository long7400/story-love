package com.lovestory.api.controller;

import com.lovestory.api.model.Postcard;
import com.lovestory.api.model.Relationship;
import com.lovestory.api.model.User;
import com.lovestory.api.repository.UserRepository;
import com.lovestory.api.service.PostcardService;
import com.lovestory.api.service.RelationshipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/postcards")
public class PostcardController {

    @Autowired
    private PostcardService postcardService;

    @Autowired
    private RelationshipService relationshipService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<Postcard>> getAllPostcards() {
        return ResponseEntity.ok(postcardService.getAllPostcards());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Postcard> getPostcardById(@PathVariable Long id) {
        Postcard postcard = postcardService.getPostcardById(id);
        if (postcard == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(postcard);
    }

    @GetMapping("/relationship/{relationshipId}")
    public ResponseEntity<List<Postcard>> getPostcardsByRelationship(@PathVariable Long relationshipId) {
        Relationship relationship = relationshipService.getRelationshipById(relationshipId);
        if (relationship == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(postcardService.getPostcardsByRelationship(relationship));
    }

    @GetMapping("/from/{senderName}")
    public ResponseEntity<List<Postcard>> getPostcardsBySender(@PathVariable String senderName) {
        return ResponseEntity.ok(postcardService.getPostcardsBySender(senderName));
    }

    @GetMapping("/to/{recipientName}")
    public ResponseEntity<List<Postcard>> getPostcardsByRecipient(@PathVariable String recipientName) {
        return ResponseEntity.ok(postcardService.getPostcardsByRecipient(recipientName));
    }

    @GetMapping("/undelivered")
    public ResponseEntity<List<Postcard>> getUndeliveredPostcards() {
        return ResponseEntity.ok(postcardService.getUndeliveredPostcards());
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Postcard> createPostcard(@RequestBody Postcard postcard) {
        // Get the current authenticated user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = userRepository.findByUsername(username).orElse(null);

        if (user != null) {
            postcard.setCreator(user);
        }

        return ResponseEntity.ok(postcardService.createPostcard(postcard));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Postcard> updatePostcard(@PathVariable Long id, @RequestBody Postcard postcardDetails) {
        Postcard updatedPostcard = postcardService.updatePostcard(id, postcardDetails);
        if (updatedPostcard == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedPostcard);
    }

    @PutMapping("/{id}/deliver")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Postcard> markAsDelivered(@PathVariable Long id) {
        Postcard deliveredPostcard = postcardService.markAsDelivered(id);
        if (deliveredPostcard == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(deliveredPostcard);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deletePostcard(@PathVariable Long id) {
        boolean success = postcardService.deletePostcard(id);
        if (!success) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }
}
