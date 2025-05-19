package com.lovestory.api.controller;

import com.lovestory.api.model.Countdown;
import com.lovestory.api.model.Relationship;
import com.lovestory.api.service.CountdownService;
import com.lovestory.api.service.RelationshipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/countdowns")
public class CountdownController {

    @Autowired
    private CountdownService countdownService;

    @Autowired
    private RelationshipService relationshipService;

    @GetMapping
    public ResponseEntity<List<Countdown>> getAllCountdowns() {
        return ResponseEntity.ok(countdownService.getAllCountdowns());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Countdown> getCountdownById(@PathVariable Long id) {
        Countdown countdown = countdownService.getCountdownById(id);
        if (countdown == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(countdown);
    }

    @GetMapping("/relationship/{relationshipId}")
    public ResponseEntity<List<Countdown>> getCountdownsByRelationship(@PathVariable Long relationshipId) {
        Relationship relationship = relationshipService.getRelationshipById(relationshipId);
        if (relationship == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(countdownService.getCountdownsByRelationship(relationship));
    }

    @GetMapping("/future")
    public ResponseEntity<List<Countdown>> getFutureCountdowns() {
        return ResponseEntity.ok(countdownService.getFutureCountdowns());
    }

    @GetMapping("/past")
    public ResponseEntity<List<Countdown>> getPastCountdowns() {
        return ResponseEntity.ok(countdownService.getPastCountdowns());
    }

    @GetMapping("/search")
    public ResponseEntity<List<Countdown>> searchCountdowns(@RequestParam String term) {
        return ResponseEntity.ok(countdownService.searchCountdowns(term));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Countdown> createCountdown(@RequestBody Countdown countdown) {
        return ResponseEntity.ok(countdownService.createCountdown(countdown));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Countdown> updateCountdown(@PathVariable Long id, @RequestBody Countdown countdownDetails) {
        Countdown updatedCountdown = countdownService.updateCountdown(id, countdownDetails);
        if (updatedCountdown == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedCountdown);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteCountdown(@PathVariable Long id) {
        boolean success = countdownService.deleteCountdown(id);
        if (!success) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }
}
