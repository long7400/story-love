package com.lovestory.api.controller;

import com.lovestory.api.dto.request.PostcardRequestDto;
import com.lovestory.api.dto.response.PostcardDto;
import com.lovestory.api.service.PostcardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

/**
 * REST controller for managing postcards
 */
@RestController
@RequestMapping("/api/postcards")
public class PostcardController {

    private final PostcardService postcardService;

    @Autowired
    public PostcardController(PostcardService postcardService) {
        this.postcardService = postcardService;
    }

    /**
     * Get all postcards
     * 
     * @return ResponseEntity with list of PostcardDto
     */
    @GetMapping
    public ResponseEntity<List<PostcardDto>> getAllPostcards() {
        return ResponseEntity.ok(postcardService.getAllPostcards());
    }

    /**
     * Get postcard by ID
     * 
     * @param id Postcard ID
     * @return ResponseEntity with PostcardDto
     */
    @GetMapping("/{id}")
    public ResponseEntity<PostcardDto> getPostcardById(@PathVariable Long id) {
        PostcardDto postcard = postcardService.getPostcardById(id);
        if (postcard == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(postcard);
    }

    /**
     * Get postcards by relationship ID
     * 
     * @param relationshipId Relationship ID
     * @return ResponseEntity with list of PostcardDto
     */
    @GetMapping("/relationship/{relationshipId}")
    public ResponseEntity<List<PostcardDto>> getPostcardsByRelationship(@PathVariable Long relationshipId) {
        List<PostcardDto> postcards = postcardService.getPostcardsByRelationshipId(relationshipId);
        if (postcards.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(postcards);
    }

    /**
     * Get postcards by sender name
     * 
     * @param senderName Sender name
     * @return ResponseEntity with list of PostcardDto
     */
    @GetMapping("/from/{senderName}")
    public ResponseEntity<List<PostcardDto>> getPostcardsBySender(@PathVariable String senderName) {
        return ResponseEntity.ok(postcardService.getPostcardsBySender(senderName));
    }

    /**
     * Get postcards by recipient name
     * 
     * @param recipientName Recipient name
     * @return ResponseEntity with list of PostcardDto
     */
    @GetMapping("/to/{recipientName}")
    public ResponseEntity<List<PostcardDto>> getPostcardsByRecipient(@PathVariable String recipientName) {
        return ResponseEntity.ok(postcardService.getPostcardsByRecipient(recipientName));
    }

    /**
     * Get all undelivered postcards
     * 
     * @return ResponseEntity with list of PostcardDto
     */
    @GetMapping("/undelivered")
    public ResponseEntity<List<PostcardDto>> getUndeliveredPostcards() {
        return ResponseEntity.ok(postcardService.getUndeliveredPostcards());
    }

    /**
     * Create a new postcard
     * 
     * @param requestDto PostcardRequestDto
     * @return ResponseEntity with created PostcardDto
     */
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<PostcardDto> createPostcard(@Valid @RequestBody PostcardRequestDto requestDto) {
        return ResponseEntity.ok(postcardService.createPostcard(requestDto));
    }

    /**
     * Update an existing postcard
     * 
     * @param id Postcard ID
     * @param requestDto PostcardRequestDto with updated values
     * @return ResponseEntity with updated PostcardDto
     */
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<PostcardDto> updatePostcard(@PathVariable Long id, @Valid @RequestBody PostcardRequestDto requestDto) {
        PostcardDto updatedPostcard = postcardService.updatePostcard(id, requestDto);
        if (updatedPostcard == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedPostcard);
    }

    /**
     * Mark a postcard as delivered
     * 
     * @param id Postcard ID
     * @return ResponseEntity with delivered PostcardDto
     */
    @PutMapping("/{id}/deliver")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<PostcardDto> markAsDelivered(@PathVariable Long id) {
        PostcardDto deliveredPostcard = postcardService.markAsDelivered(id);
        if (deliveredPostcard == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(deliveredPostcard);
    }

    /**
     * Delete a postcard
     * 
     * @param id Postcard ID
     * @return ResponseEntity with no content
     */
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
