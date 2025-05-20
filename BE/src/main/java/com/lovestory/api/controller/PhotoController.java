package com.lovestory.api.controller;

import com.lovestory.api.dto.request.PhotoRequestDto;
import com.lovestory.api.dto.response.PhotoDto;
import com.lovestory.api.service.PhotoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.time.LocalDate;
import java.util.List;

/**
 * REST controller for managing photos
 */
@RestController
@RequestMapping("/api/photos")
public class PhotoController {

    private final PhotoService photoService;

    @Autowired
    public PhotoController(PhotoService photoService) {
        this.photoService = photoService;
    }

    @GetMapping
    public ResponseEntity<List<PhotoDto>> getAllPhotos() {
        return ResponseEntity.ok(photoService.getAllPhotos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PhotoDto> getPhotoById(@PathVariable Long id) {
        PhotoDto photo = photoService.getPhotoById(id);
        if (photo == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(photo);
    }

    @GetMapping("/relationship/{relationshipId}")
    public ResponseEntity<List<PhotoDto>> getPhotosByRelationship(@PathVariable Long relationshipId) {
        List<PhotoDto> photos = photoService.getPhotosByRelationshipId(relationshipId);
        if (photos.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(photos);
    }

    @GetMapping("/search")
    public ResponseEntity<List<PhotoDto>> searchPhotos(@RequestParam String term) {
        return ResponseEntity.ok(photoService.searchPhotos(term));
    }

    @GetMapping("/date-range")
    public ResponseEntity<List<PhotoDto>> getPhotosBetweenDates(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        return ResponseEntity.ok(photoService.getPhotosBetweenDates(startDate, endDate));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<PhotoDto> createPhoto(@Valid @RequestBody PhotoRequestDto requestDto) {
        return ResponseEntity.ok(photoService.createPhoto(requestDto));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<PhotoDto> updatePhoto(@PathVariable Long id, @Valid @RequestBody PhotoRequestDto requestDto) {
        PhotoDto updatedPhoto = photoService.updatePhoto(id, requestDto);
        if (updatedPhoto == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedPhoto);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deletePhoto(@PathVariable Long id) {
        boolean success = photoService.deletePhoto(id);
        if (!success) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }
}
