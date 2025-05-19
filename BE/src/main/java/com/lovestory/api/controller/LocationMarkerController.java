package com.lovestory.api.controller;

import com.lovestory.api.model.LocationMarker;
import com.lovestory.api.model.Relationship;
import com.lovestory.api.service.LocationMarkerService;
import com.lovestory.api.service.RelationshipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/location-markers")
public class LocationMarkerController {

    @Autowired
    private LocationMarkerService locationMarkerService;

    @Autowired
    private RelationshipService relationshipService;

    @GetMapping
    public ResponseEntity<List<LocationMarker>> getAllLocationMarkers() {
        return ResponseEntity.ok(locationMarkerService.getAllLocationMarkers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<LocationMarker> getLocationMarkerById(@PathVariable Long id) {
        LocationMarker locationMarker = locationMarkerService.getLocationMarkerById(id);
        if (locationMarker == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(locationMarker);
    }

    @GetMapping("/relationship/{relationshipId}")
    public ResponseEntity<List<LocationMarker>> getLocationMarkersByRelationship(@PathVariable Long relationshipId) {
        Relationship relationship = relationshipService.getRelationshipById(relationshipId);
        if (relationship == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(locationMarkerService.getLocationMarkersByRelationship(relationship));
    }

    @GetMapping("/special/{relationshipId}")
    public ResponseEntity<List<LocationMarker>> getSpecialLocationMarkers(@PathVariable Long relationshipId) {
        Relationship relationship = relationshipService.getRelationshipById(relationshipId);
        if (relationship == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(locationMarkerService.getSpecialLocationMarkers(relationship));
    }

    @GetMapping("/search")
    public ResponseEntity<List<LocationMarker>> searchLocationMarkers(@RequestParam String term) {
        return ResponseEntity.ok(locationMarkerService.searchLocationMarkers(term));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<LocationMarker> createLocationMarker(@RequestBody LocationMarker locationMarker) {
        return ResponseEntity.ok(locationMarkerService.createLocationMarker(locationMarker));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<LocationMarker> updateLocationMarker(@PathVariable Long id, @RequestBody LocationMarker locationMarkerDetails) {
        LocationMarker updatedLocationMarker = locationMarkerService.updateLocationMarker(id, locationMarkerDetails);
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
