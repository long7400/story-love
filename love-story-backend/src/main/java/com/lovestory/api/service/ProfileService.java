package com.lovestory.api.service;

import com.lovestory.api.model.Profile;
import com.lovestory.api.model.Relationship;
import com.lovestory.api.repository.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ProfileService {
    @Autowired
    private ProfileRepository profileRepository;
    
    /**
     * Get all profiles
     */
    public List<Profile> getAllProfiles() {
        return profileRepository.findAll();
    }
    
    /**
     * Get profile by ID
     */
    public Profile getProfileById(Long id) {
        Optional<Profile> profile = profileRepository.findById(id);
        return profile.orElse(null);
    }
    
    /**
     * Get profiles by relationship
     */
    public List<Profile> getProfilesByRelationship(Relationship relationship) {
        return profileRepository.findByRelationship(relationship);
    }
    
    /**
     * Create a new profile
     */
    @Transactional
    public Profile createProfile(Profile profile) {
        return profileRepository.save(profile);
    }
    
    /**
     * Update an existing profile
     */
    @Transactional
    public Profile updateProfile(Long id, Profile profileDetails) {
        Profile profile = getProfileById(id);
        if (profile == null) {
            return null;
        }
        
        profile.setName(profileDetails.getName());
        profile.setBirthday(profileDetails.getBirthday());
        profile.setAvatarUrl(profileDetails.getAvatarUrl());
        profile.setBio(profileDetails.getBio());
        profile.setFavoriteQuote(profileDetails.getFavoriteQuote());
        profile.setRelationship(profileDetails.getRelationship());
        
        return profileRepository.save(profile);
    }
    
    /**
     * Delete a profile
     */
    @Transactional
    public boolean deleteProfile(Long id) {
        Profile profile = getProfileById(id);
        if (profile == null) {
            return false;
        }
        
        profileRepository.delete(profile);
        return true;
    }
}