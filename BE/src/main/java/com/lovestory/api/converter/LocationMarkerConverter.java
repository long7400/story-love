package com.lovestory.api.converter;

import com.lovestory.api.dto.request.LocationMarkerRequestDto;
import com.lovestory.api.dto.response.LocationMarkerDto;
import com.lovestory.api.model.LocationMarker;
import com.lovestory.api.model.Relationship;

import java.util.List;

/**
 * Converter interface for LocationMarker entity and DTOs
 */
public interface LocationMarkerConverter {
    /**
     * Convert LocationMarker entity to LocationMarkerDto
     * 
     * @param locationMarker LocationMarker entity
     * @return LocationMarkerDto
     */
    LocationMarkerDto toDto(LocationMarker locationMarker);
    
    /**
     * Convert a list of LocationMarker entities to a list of LocationMarkerDtos
     * 
     * @param locationMarkers List of LocationMarker entities
     * @return List of LocationMarkerDtos
     */
    List<LocationMarkerDto> toDtoList(List<LocationMarker> locationMarkers);
    
    /**
     * Convert LocationMarkerRequestDto to LocationMarker entity
     * 
     * @param requestDto LocationMarkerRequestDto
     * @param relationship Relationship entity
     * @return LocationMarker entity
     */
    LocationMarker toEntity(LocationMarkerRequestDto requestDto, Relationship relationship);
    
    /**
     * Update LocationMarker entity with LocationMarkerRequestDto
     * 
     * @param locationMarker Existing LocationMarker entity
     * @param requestDto LocationMarkerRequestDto with updated values
     * @param relationship Relationship entity
     * @return Updated LocationMarker entity
     */
    LocationMarker updateEntity(LocationMarker locationMarker, LocationMarkerRequestDto requestDto, Relationship relationship);
}