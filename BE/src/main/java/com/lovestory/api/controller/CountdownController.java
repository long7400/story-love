package com.lovestory.api.controller;

import com.lovestory.api.dto.request.CountdownRequestDto;
import com.lovestory.api.dto.response.CountdownDto;
import com.lovestory.api.service.CountdownService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

/**
 * REST controller for managing countdowns
 */
@RestController
@RequestMapping("/api/countdowns")
public class CountdownController {

    private final CountdownService countdownService;

    @Autowired
    public CountdownController(CountdownService countdownService) {
        this.countdownService = countdownService;
    }

    @GetMapping
    public ResponseEntity<List<CountdownDto>> getAllCountdowns() {
        return ResponseEntity.ok(countdownService.getAllCountdowns());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CountdownDto> getCountdownById(@PathVariable Long id) {
        CountdownDto countdown = countdownService.getCountdownById(id);
        if (countdown == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(countdown);
    }

    @GetMapping("/relationship/{relationshipId}")
    public ResponseEntity<List<CountdownDto>> getCountdownsByRelationship(@PathVariable Long relationshipId) {
        List<CountdownDto> countdowns = countdownService.getCountdownsByRelationshipId(relationshipId);
        if (countdowns.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(countdowns);
    }

    @GetMapping("/future")
    public ResponseEntity<List<CountdownDto>> getFutureCountdowns() {
        return ResponseEntity.ok(countdownService.getFutureCountdowns());
    }

    @GetMapping("/past")
    public ResponseEntity<List<CountdownDto>> getPastCountdowns() {
        return ResponseEntity.ok(countdownService.getPastCountdowns());
    }

    @GetMapping("/search")
    public ResponseEntity<List<CountdownDto>> searchCountdowns(@RequestParam String term) {
        return ResponseEntity.ok(countdownService.searchCountdowns(term));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CountdownDto> createCountdown(@Valid @RequestBody CountdownRequestDto requestDto) {
        return ResponseEntity.ok(countdownService.createCountdown(requestDto));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CountdownDto> updateCountdown(@PathVariable Long id, @Valid @RequestBody CountdownRequestDto requestDto) {
        CountdownDto updatedCountdown = countdownService.updateCountdown(id, requestDto);
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
