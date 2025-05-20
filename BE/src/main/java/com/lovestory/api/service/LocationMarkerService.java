package com.lovestory.api.service;

import com.lovestory.api.converter.LocationMarkerConverter;
import com.lovestory.api.dto.request.LocationMarkerRequestDto;
import com.lovestory.api.dto.response.LocationMarkerDto;
import com.lovestory.api.model.LocationMarker;
import com.lovestory.api.model.Relationship;
import com.lovestory.api.repository.LocationMarkerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service for LocationMarker related operations
 */
@Service
public class LocationMarkerService {
    private final LocationMarkerRepository locationMarkerRepository;
    private final LocationMarkerConverter locationMarkerConverter;
    private final RelationshipService relationshipService;

    @Autowired
    public LocationMarkerService(LocationMarkerRepository locationMarkerRepository,
                                LocationMarkerConverter locationMarkerConverter,
                                RelationshipService relationshipService) {
        this.locationMarkerRepository = locationMarkerRepository;
        this.locationMarkerConverter = locationMarkerConverter;
        this.relationshipService = relationshipService;
    }

    /**
     * Get all location markers
     * 
     * @return List of LocationMarkerDto
     */
    public List<LocationMarkerDto> getAllLocationMarkers() {
        List<LocationMarker> locationMarkers = locationMarkerRepository.findAll();
        return locationMarkerConverter.toDtoList(locationMarkers);
    }

    /**
     * Get location marker by ID
     * 
     * @param id LocationMarker ID
     * @return LocationMarkerDto or null if not found
     */
    public LocationMarkerDto getLocationMarkerById(Long id) {
        Optional<LocationMarker> locationMarkerOpt = locationMarkerRepository.findById(id);
        return locationMarkerOpt.map(locationMarkerConverter::toDto).orElse(null);
    }

    /**
     * Get location markers by relationship
     * 
     * @param relationship Relationship entity
     * @return List of LocationMarkerDto
     */
    public List<LocationMarkerDto> getLocationMarkersByRelationship(Relationship relationship) {
        List<LocationMarker> locationMarkers = locationMarkerRepository.findByRelationship(relationship);
        return locationMarkerConverter.toDtoList(locationMarkers);
    }

    /**
     * Get location markers by relationship ID
     * 
     * @param relationshipId Relationship ID
     * @return List of LocationMarkerDto
     */
    public List<LocationMarkerDto> getLocationMarkersByRelationshipId(Long relationshipId) {
        Relationship relationship = relationshipService.getRelationshipEntityById(relationshipId);
        if (relationship == null) {
            return List.of();
        }
        return getLocationMarkersByRelationship(relationship);
    }

    /**
     * Get special location markers
     * 
     * @param relationship Relationship entity
     * @return List of LocationMarkerDto
     */
    public List<LocationMarkerDto> getSpecialLocationMarkers(Relationship relationship) {
        List<LocationMarker> locationMarkers = locationMarkerRepository.findByRelationshipAndIsSpecial(relationship, true);
        return locationMarkerConverter.toDtoList(locationMarkers);
    }

    /**
     * Get special location markers by relationship ID
     * 
     * @param relationshipId Relationship ID
     * @return List of LocationMarkerDto
     */
    public List<LocationMarkerDto> getSpecialLocationMarkersByRelationshipId(Long relationshipId) {
        Relationship relationship = relationshipService.getRelationshipEntityById(relationshipId);
        if (relationship == null) {
            return List.of();
        }
        return getSpecialLocationMarkers(relationship);
    }

    /**
     * Search location markers
     * 
     * @param searchTerm Search term
     * @return List of LocationMarkerDto
     */
    public List<LocationMarkerDto> searchLocationMarkers(String searchTerm) {
        List<LocationMarker> locationMarkers = locationMarkerRepository.findByNameContainingOrDescriptionContaining(searchTerm, searchTerm);
        return locationMarkerConverter.toDtoList(locationMarkers);
    }

    /**
     * Create a new location marker
     * 
     * @param requestDto LocationMarkerRequestDto
     * @return LocationMarkerDto
     */
    @Transactional
    public LocationMarkerDto createLocationMarker(LocationMarkerRequestDto requestDto) {
        Relationship relationship = null;
        if (requestDto.getRelationshipId() != null) {
            relationship = relationshipService.getRelationshipEntityById(requestDto.getRelationshipId());
        }

        LocationMarker locationMarker = locationMarkerConverter.toEntity(requestDto, relationship);
        LocationMarker savedLocationMarker = locationMarkerRepository.save(locationMarker);
        return locationMarkerConverter.toDto(savedLocationMarker);
    }

    /**
     * Update an existing location marker
     * 
     * @param id LocationMarker ID
     * @param requestDto LocationMarkerRequestDto with updated values
     * @return LocationMarkerDto or null if not found
     */
    @Transactional
    public LocationMarkerDto updateLocationMarker(Long id, LocationMarkerRequestDto requestDto) {
        Optional<LocationMarker> locationMarkerOpt = locationMarkerRepository.findById(id);
        if (locationMarkerOpt.isEmpty()) {
            return null;
        }

        Relationship relationship = null;
        if (requestDto.getRelationshipId() != null) {
            relationship = relationshipService.getRelationshipEntityById(requestDto.getRelationshipId());
        }

        LocationMarker locationMarker = locationMarkerOpt.get();
        locationMarker = locationMarkerConverter.updateEntity(locationMarker, requestDto, relationship);
        LocationMarker updatedLocationMarker = locationMarkerRepository.save(locationMarker);
        return locationMarkerConverter.toDto(updatedLocationMarker);
    }

    /**
     * Delete a location marker
     * 
     * @param id LocationMarker ID
     * @return true if deleted, false if not found
     */
    @Transactional
    public boolean deleteLocationMarker(Long id) {
        Optional<LocationMarker> locationMarkerOpt = locationMarkerRepository.findById(id);
        if (locationMarkerOpt.isEmpty()) {
            return false;
        }

        locationMarkerRepository.delete(locationMarkerOpt.get());
        return true;
    }

    /**
     * Get location marker entity by ID (for internal use)
     * 
     * @param id LocationMarker ID
     * @return LocationMarker entity or null if not found
     */
    protected LocationMarker getLocationMarkerEntityById(Long id) {
        return locationMarkerRepository.findById(id).orElse(null);
    }
}
