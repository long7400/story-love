package com.lovestory.api.service;

import com.lovestory.api.converter.PhotoConverter;
import com.lovestory.api.dto.request.PhotoRequestDto;
import com.lovestory.api.dto.response.PhotoDto;
import com.lovestory.api.model.Photo;
import com.lovestory.api.model.Relationship;
import com.lovestory.api.repository.PhotoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service for Photo related operations
 */
@Service
public class PhotoService {
    private final PhotoRepository photoRepository;
    private final PhotoConverter photoConverter;
    private final RelationshipService relationshipService;

    @Autowired
    public PhotoService(PhotoRepository photoRepository, 
                        PhotoConverter photoConverter,
                        RelationshipService relationshipService) {
        this.photoRepository = photoRepository;
        this.photoConverter = photoConverter;
        this.relationshipService = relationshipService;
    }

    /**
     * Get all photos
     * 
     * @return List of PhotoDto
     */
    public List<PhotoDto> getAllPhotos() {
        List<Photo> photos = photoRepository.findAll();
        return photos.stream()
                .map(photoConverter::toDto)
                .collect(Collectors.toList());
    }

    /**
     * Get photo by ID
     * 
     * @param id Photo ID
     * @return PhotoDto or null if not found
     */
    public PhotoDto getPhotoById(Long id) {
        Optional<Photo> photoOpt = photoRepository.findById(id);
        return photoOpt.map(photoConverter::toDto).orElse(null);
    }

    /**
     * Get photos by relationship
     * 
     * @param relationship Relationship entity
     * @return List of PhotoDto
     */
    public List<PhotoDto> getPhotosByRelationship(Relationship relationship) {
        List<Photo> photos = photoRepository.findByRelationshipOrderByDateDesc(relationship);
        return photos.stream()
                .map(photoConverter::toDto)
                .collect(Collectors.toList());
    }

    /**
     * Get photos by relationship ID
     * 
     * @param relationshipId Relationship ID
     * @return List of PhotoDto
     */
    public List<PhotoDto> getPhotosByRelationshipId(Long relationshipId) {
        Relationship relationship = relationshipService.getRelationshipEntityById(relationshipId);
        if (relationship == null) {
            return List.of();
        }
        return getPhotosByRelationship(relationship);
    }

    /**
     * Search photos by term
     * 
     * @param searchTerm Search term
     * @return List of PhotoDto
     */
    public List<PhotoDto> searchPhotos(String searchTerm) {
        List<Photo> photos = photoRepository.findByTitleContainingOrDescriptionContaining(searchTerm, searchTerm);
        return photos.stream()
                .map(photoConverter::toDto)
                .collect(Collectors.toList());
    }

    /**
     * Get photos between two dates
     * 
     * @param startDate Start date
     * @param endDate End date
     * @return List of PhotoDto
     */
    public List<PhotoDto> getPhotosBetweenDates(LocalDate startDate, LocalDate endDate) {
        List<Photo> photos = photoRepository.findByDateBetween(startDate, endDate);
        return photos.stream()
                .map(photoConverter::toDto)
                .collect(Collectors.toList());
    }

    /**
     * Create a new photo
     * 
     * @param requestDto PhotoRequestDto
     * @return PhotoDto
     */
    @Transactional
    public PhotoDto createPhoto(PhotoRequestDto requestDto) {
        Relationship relationship = null;
        if (requestDto.getRelationshipId() != null) {
            relationship = relationshipService.getRelationshipEntityById(requestDto.getRelationshipId());
        }

        Photo photo = photoConverter.toEntity(requestDto, relationship);
        Photo savedPhoto = photoRepository.save(photo);
        return photoConverter.toDto(savedPhoto);
    }

    /**
     * Update an existing photo
     * 
     * @param id Photo ID
     * @param requestDto PhotoRequestDto with updated values
     * @return PhotoDto or null if not found
     */
    @Transactional
    public PhotoDto updatePhoto(Long id, PhotoRequestDto requestDto) {
        Optional<Photo> photoOpt = photoRepository.findById(id);
        if (photoOpt.isEmpty()) {
            return null;
        }

        Relationship relationship = null;
        if (requestDto.getRelationshipId() != null) {
            relationship = relationshipService.getRelationshipEntityById(requestDto.getRelationshipId());
        }

        Photo photo = photoOpt.get();
        photo = photoConverter.updateEntity(photo, requestDto, relationship);
        Photo updatedPhoto = photoRepository.save(photo);
        return photoConverter.toDto(updatedPhoto);
    }

    /**
     * Delete a photo
     * 
     * @param id Photo ID
     * @return true if deleted, false if not found
     */
    @Transactional
    public boolean deletePhoto(Long id) {
        Optional<Photo> photoOpt = photoRepository.findById(id);
        if (photoOpt.isEmpty()) {
            return false;
        }

        photoRepository.delete(photoOpt.get());
        return true;
    }

    /**
     * Get photo entity by ID (for internal use)
     * 
     * @param id Photo ID
     * @return Photo entity or null if not found
     */
    protected Photo getPhotoEntityById(Long id) {
        return photoRepository.findById(id).orElse(null);
    }
}
