package com.lovestory.api.service;

import com.lovestory.api.model.Photo;
import com.lovestory.api.repository.PhotoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PhotoService {

    private final PhotoRepository photoRepository;

    @Autowired
    public PhotoService(PhotoRepository photoRepository) {
        this.photoRepository = photoRepository;
    }

    public List<Photo> getAllPhotos() {
        return photoRepository.findAll();
    }

    public Optional<Photo> getPhotoById(Long id) {
        return photoRepository.findById(id);
    }

    public Photo createPhoto(Photo photo) {
        return photoRepository.save(photo);
    }

    public Optional<Photo> updatePhoto(Long id, Photo photoDetails) {
        return photoRepository.findById(id)
                .map(existingPhoto -> {
                    existingPhoto.setTitle(photoDetails.getTitle());
                    existingPhoto.setDate(photoDetails.getDate());
                    existingPhoto.setDescription(photoDetails.getDescription());
                    existingPhoto.setImageUrl(photoDetails.getImageUrl());
                    return photoRepository.save(existingPhoto);
                });
    }

    public boolean deletePhoto(Long id) {
        return photoRepository.findById(id)
                .map(photo -> {
                    photoRepository.delete(photo);
                    return true;
                })
                .orElse(false);
    }
}