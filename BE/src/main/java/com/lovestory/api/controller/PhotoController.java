package com.lovestory.api.controller;

import com.lovestory.api.model.Photo;
import com.lovestory.api.model.Relationship;
import com.lovestory.api.service.PhotoService;
import com.lovestory.api.service.RelationshipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/photos")
public class PhotoController {
    
    @Autowired
    private PhotoService photoService;
    
    @Autowired
    private RelationshipService relationshipService;
    
    @GetMapping
    public ResponseEntity<List<Photo>> getAllPhotos() {
        return ResponseEntity.ok(photoService.getAllPhotos());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Photo> getPhotoById(@PathVariable Long id) {
        Photo photo = photoService.getPhotoById(id);
        if (photo == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(photo);
    }
    
    @GetMapping("/relationship/{relationshipId}")
    public ResponseEntity<List<Photo>> getPhotosByRelationship(@PathVariable Long relationshipId) {
        Relationship relationship = relationshipService.getRelationshipById(relationshipId);
        if (relationship == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(photoService.getPhotosByRelationship(relationship));
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<Photo>> searchPhotos(@RequestParam String term) {
        return ResponseEntity.ok(photoService.searchPhotos(term));
    }
    
    @GetMapping("/date-range")
    public ResponseEntity<List<Photo>> getPhotosBetweenDates(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        return ResponseEntity.ok(photoService.getPhotosBetweenDates(startDate, endDate));
    }
    
    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('PARTNER')")
    public ResponseEntity<Photo> createPhoto(@RequestBody Photo photo) {
        return ResponseEntity.ok(photoService.createPhoto(photo));
    }
    
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('PARTNER')")
    public ResponseEntity<Photo> updatePhoto(@PathVariable Long id, @RequestBody Photo photoDetails) {
        Photo updatedPhoto = photoService.updatePhoto(id, photoDetails);
        if (updatedPhoto == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedPhoto);
    }
    
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('PARTNER')")
    public ResponseEntity<Void> deletePhoto(@PathVariable Long id) {
        boolean success = photoService.deletePhoto(id);
        if (!success) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }
}