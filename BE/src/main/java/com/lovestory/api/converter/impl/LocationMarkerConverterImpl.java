package com.lovestory.api.converter.impl;

import com.lovestory.api.converter.LocationMarkerConverter;
import com.lovestory.api.dto.request.LocationMarkerRequestDto;
import com.lovestory.api.dto.response.LocationMarkerDto;
import com.lovestory.api.model.LocationMarker;
import com.lovestory.api.model.Relationship;
import org.springframework.stereotype.Component;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Implementation of LocationMarkerConverter interface
 */
@Component
public class LocationMarkerConverterImpl implements LocationMarkerConverter {

    private final DateTimeFormatter dateFormatter = DateTimeFormatter.ISO_DATE;

    /**
     * Convert LocationMarker entity to LocationMarkerDto
     * 
     * @param locationMarker LocationMarker entity
     * @return LocationMarkerDto
     */
    @Override
    public LocationMarkerDto toDto(LocationMarker locationMarker) {
        if (locationMarker == null) {
            return null;
        }
        
        return LocationMarkerDto.builder()
                .id(locationMarker.getId())
                .name(locationMarker.getName())
                .description(locationMarker.getDescription())
                .date(locationMarker.getDate())
                .dateFormatted(locationMarker.getDate() != null ? locationMarker.getDate().format(dateFormatter) : null)
                .latitude(locationMarker.getLatitude())
                .longitude(locationMarker.getLongitude())
                .isSpecial(locationMarker.getIsSpecial())
                .imageUrl(locationMarker.getImageUrl())
                .relationshipId(locationMarker.getRelationship() != null ? locationMarker.getRelationship().getId() : null)
                .build();
    }

    /**
     * Convert a list of LocationMarker entities to a list of LocationMarkerDtos
     * 
     * @param locationMarkers List of LocationMarker entities
     * @return List of LocationMarkerDtos
     */
    @Override
    public List<LocationMarkerDto> toDtoList(List<LocationMarker> locationMarkers) {
        if (locationMarkers == null) {
            return List.of();
        }
        
        return locationMarkers.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    /**
     * Convert LocationMarkerRequestDto to LocationMarker entity
     * 
     * @param requestDto LocationMarkerRequestDto
     * @param relationship Relationship entity
     * @return LocationMarker entity
     */
    @Override
    public LocationMarker toEntity(LocationMarkerRequestDto requestDto, Relationship relationship) {
        if (requestDto == null) {
            return null;
        }
        
        LocationMarker locationMarker = new LocationMarker();
        locationMarker.setName(requestDto.getName());
        locationMarker.setDescription(requestDto.getDescription());
        locationMarker.setDate(requestDto.getDate());
        locationMarker.setLatitude(requestDto.getLatitude());
        locationMarker.setLongitude(requestDto.getLongitude());
        locationMarker.setIsSpecial(requestDto.getIsSpecial());
        locationMarker.setImageUrl(requestDto.getImageUrl());
        locationMarker.setRelationship(relationship);
        
        return locationMarker;
    }

    /**
     * Update LocationMarker entity with LocationMarkerRequestDto
     * 
     * @param locationMarker Existing LocationMarker entity
     * @param requestDto LocationMarkerRequestDto with updated values
     * @param relationship Relationship entity
     * @return Updated LocationMarker entity
     */
    @Override
    public LocationMarker updateEntity(LocationMarker locationMarker, LocationMarkerRequestDto requestDto, Relationship relationship) {
        if (locationMarker == null || requestDto == null) {
            return locationMarker;
        }
        
        locationMarker.setName(requestDto.getName());
        locationMarker.setDescription(requestDto.getDescription());
        locationMarker.setDate(requestDto.getDate());
        locationMarker.setLatitude(requestDto.getLatitude());
        locationMarker.setLongitude(requestDto.getLongitude());
        locationMarker.setIsSpecial(requestDto.getIsSpecial());
        locationMarker.setImageUrl(requestDto.getImageUrl());
        locationMarker.setRelationship(relationship);
        
        return locationMarker;
    }
}