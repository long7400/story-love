package com.lovestory.api.service;

import com.lovestory.api.model.Photo;
import com.lovestory.api.model.Relationship;
import com.lovestory.api.repository.PhotoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class PhotoService {
    @Autowired
    private PhotoRepository photoRepository;
    
    /**
     * Get all photos
     */
    public List<Photo> getAllPhotos() {
        return photoRepository.findAll();
    }
    
    /**
     * Get photo by ID
     */
    public Photo getPhotoById(Long id) {
        Optional<Photo> photo = photoRepository.findById(id);
        return photo.orElse(null);
    }
    
    /**
     * Get photos by relationship
     */
    public List<Photo> getPhotosByRelationship(Relationship relationship) {
        return photoRepository.findByRelationshipOrderByDateDesc(relationship);
    }
    
    /**
     * Search photos by term
     */
    public List<Photo> searchPhotos(String searchTerm) {
        return photoRepository.findByTitleContainingOrDescriptionContaining(searchTerm, searchTerm);
    }
    
    /**
     * Get photos between two dates
     */
    public List<Photo> getPhotosBetweenDates(LocalDate startDate, LocalDate endDate) {
        return photoRepository.findByDateBetween(startDate, endDate);
    }
    
    /**
     * Create a new photo
     */
    @Transactional
    public Photo createPhoto(Photo photo) {
        return photoRepository.save(photo);
    }
    
    /**
     * Update an existing photo
     */
    @Transactional
    public Photo updatePhoto(Long id, Photo photoDetails) {
        Photo photo = getPhotoById(id);
        if (photo == null) {
            return null;
        }
        
        photo.setTitle(photoDetails.getTitle());
        photo.setDate(photoDetails.getDate());
        photo.setDescription(photoDetails.getDescription());
        photo.setImageUrl(photoDetails.getImageUrl());
        photo.setLocation(photoDetails.getLocation());
        photo.setTags(photoDetails.getTags());
        photo.setHtmlEnabled(photoDetails.getHtmlEnabled());
        photo.setRelationship(photoDetails.getRelationship());
        
        return photoRepository.save(photo);
    }
    
    /**
     * Delete a photo
     */
    @Transactional
    public boolean deletePhoto(Long id) {
        Photo photo = getPhotoById(id);
        if (photo == null) {
            return false;
        }
        
        photoRepository.delete(photo);
        return true;
    }
}