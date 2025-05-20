package com.lovestory.api.controller;

import com.lovestory.api.dto.request.LocationMarkerRequestDto;
import com.lovestory.api.dto.response.LocationMarkerDto;
import com.lovestory.api.service.LocationMarkerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

/**
 * REST controller for managing location markers
 */
@RestController
@RequestMapping("/api/location-markers")
public class LocationMarkerController {

    private final LocationMarkerService locationMarkerService;

    @Autowired
    public LocationMarkerController(LocationMarkerService locationMarkerService) {
        this.locationMarkerService = locationMarkerService;
    }

    @GetMapping
    public ResponseEntity<List<LocationMarkerDto>> getAllLocationMarkers() {
        return ResponseEntity.ok(locationMarkerService.getAllLocationMarkers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<LocationMarkerDto> getLocationMarkerById(@PathVariable Long id) {
        LocationMarkerDto locationMarker = locationMarkerService.getLocationMarkerById(id);
        if (locationMarker == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(locationMarker);
    }

    @GetMapping("/relationship/{relationshipId}")
    public ResponseEntity<List<LocationMarkerDto>> getLocationMarkersByRelationship(@PathVariable Long relationshipId) {
        List<LocationMarkerDto> locationMarkers = locationMarkerService.getLocationMarkersByRelationshipId(relationshipId);
        if (locationMarkers.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(locationMarkers);
    }

    @GetMapping("/special/{relationshipId}")
    public ResponseEntity<List<LocationMarkerDto>> getSpecialLocationMarkers(@PathVariable Long relationshipId) {
        List<LocationMarkerDto> locationMarkers = locationMarkerService.getSpecialLocationMarkersByRelationshipId(relationshipId);
        if (locationMarkers.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(locationMarkers);
    }

    @GetMapping("/search")
    public ResponseEntity<List<LocationMarkerDto>> searchLocationMarkers(@RequestParam String term) {
        return ResponseEntity.ok(locationMarkerService.searchLocationMarkers(term));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<LocationMarkerDto> createLocationMarker(@Valid @RequestBody LocationMarkerRequestDto requestDto) {
        return ResponseEntity.ok(locationMarkerService.createLocationMarker(requestDto));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<LocationMarkerDto> updateLocationMarker(@PathVariable Long id, @Valid @RequestBody LocationMarkerRequestDto requestDto) {
        LocationMarkerDto updatedLocationMarker = locationMarkerService.updateLocationMarker(id, requestDto);
        if (updatedLocationMarker == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedLocationMarker);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteLocationMarker(@PathVariable Long id) {
        boolean success = locationMarkerService.deleteLocationMarker(id);
        if (!success) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }
}
