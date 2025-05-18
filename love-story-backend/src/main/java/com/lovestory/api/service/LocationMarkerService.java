package com.lovestory.api.service;

import com.lovestory.api.model.LocationMarker;
import com.lovestory.api.model.Relationship;
import com.lovestory.api.repository.LocationMarkerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class LocationMarkerService {
    @Autowired
    private LocationMarkerRepository locationMarkerRepository;
    
    /**
     * Get all location markers
     */
    public List<LocationMarker> getAllLocationMarkers() {
        return locationMarkerRepository.findAll();
    }
    
    /**
     * Get location marker by ID
     */
    public LocationMarker getLocationMarkerById(Long id) {
        Optional<LocationMarker> locationMarker = locationMarkerRepository.findById(id);
        return locationMarker.orElse(null);
    }
    
    /**
     * Get location markers by relationship
     */
    public List<LocationMarker> getLocationMarkersByRelationship(Relationship relationship) {
        return locationMarkerRepository.findByRelationship(relationship);
    }
    
    /**
     * Get special location markers
     */
    public List<LocationMarker> getSpecialLocationMarkers(Relationship relationship) {
        return locationMarkerRepository.findByRelationshipAndIsSpecial(relationship, true);
    }
    
    /**
     * Search location markers
     */
    public List<LocationMarker> searchLocationMarkers(String searchTerm) {
        return locationMarkerRepository.findByNameContainingOrDescriptionContaining(searchTerm, searchTerm);
    }
    
    /**
     * Create a new location marker
     */
    @Transactional
    public LocationMarker createLocationMarker(LocationMarker locationMarker) {
        return locationMarkerRepository.save(locationMarker);
    }
    
    /**
     * Update an existing location marker
     */
    @Transactional
    public LocationMarker updateLocationMarker(Long id, LocationMarker locationMarkerDetails) {
        LocationMarker locationMarker = getLocationMarkerById(id);
        if (locationMarker == null) {
            return null;
        }
        
        locationMarker.setName(locationMarkerDetails.getName());
        locationMarker.setDescription(locationMarkerDetails.getDescription());
        locationMarker.setDate(locationMarkerDetails.getDate());
        locationMarker.setLatitude(locationMarkerDetails.getLatitude());
        locationMarker.setLongitude(locationMarkerDetails.getLongitude());
        locationMarker.setIsSpecial(locationMarkerDetails.getIsSpecial());
        locationMarker.setImageUrl(locationMarkerDetails.getImageUrl());
        locationMarker.setRelationship(locationMarkerDetails.getRelationship());
        
        return locationMarkerRepository.save(locationMarker);
    }
    
    /**
     * Delete a location marker
     */
    @Transactional
    public boolean deleteLocationMarker(Long id) {
        LocationMarker locationMarker = getLocationMarkerById(id);
        if (locationMarker == null) {
            return false;
        }
        
        locationMarkerRepository.delete(locationMarker);
        return true;
    }
}