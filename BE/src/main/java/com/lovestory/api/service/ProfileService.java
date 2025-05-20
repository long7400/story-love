package com.lovestory.api.service;

import com.lovestory.api.converter.ProfileConverter;
import com.lovestory.api.dto.request.ProfileRequestDto;
import com.lovestory.api.dto.response.ProfileDto;
import com.lovestory.api.model.Profile;
import com.lovestory.api.model.Relationship;
import com.lovestory.api.repository.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service for Profile related operations
 */
@Service
public class ProfileService {
    private final ProfileRepository profileRepository;
    private final ProfileConverter profileConverter;
    private final RelationshipService relationshipService;

    @Autowired
    public ProfileService(ProfileRepository profileRepository, 
                         ProfileConverter profileConverter,
                         RelationshipService relationshipService) {
        this.profileRepository = profileRepository;
        this.profileConverter = profileConverter;
        this.relationshipService = relationshipService;
    }

    /**
     * Get all profiles
     * 
     * @return List of ProfileDto
     */
    public List<ProfileDto> getAllProfiles() {
        List<Profile> profiles = profileRepository.findAll();
        return profiles.stream()
                .map(profileConverter::toDto)
                .collect(Collectors.toList());
    }

    /**
     * Get profile by ID
     * 
     * @param id Profile ID
     * @return ProfileDto or null if not found
     */
    public ProfileDto getProfileById(Long id) {
        Optional<Profile> profileOpt = profileRepository.findById(id);
        return profileOpt.map(profileConverter::toDto).orElse(null);
    }

    /**
     * Get profiles by relationship
     * 
     * @param relationship Relationship entity
     * @return List of ProfileDto
     */
    public List<ProfileDto> getProfilesByRelationship(Relationship relationship) {
        List<Profile> profiles = profileRepository.findByRelationship(relationship);
        return profiles.stream()
                .map(profileConverter::toDto)
                .collect(Collectors.toList());
    }

    /**
     * Get profiles by relationship ID
     * 
     * @param relationshipId Relationship ID
     * @return List of ProfileDto
     */
    public List<ProfileDto> getProfilesByRelationshipId(Long relationshipId) {
        Relationship relationship = relationshipService.getRelationshipEntityById(relationshipId);
        if (relationship == null) {
            return List.of();
        }
        List<Profile> profiles = profileRepository.findByRelationship(relationship);
        return profiles.stream()
                .map(profileConverter::toDto)
                .collect(Collectors.toList());
    }

    /**
     * Create a new profile
     * 
     * @param requestDto ProfileRequestDto
     * @return ProfileDto
     */
    @Transactional
    public ProfileDto createProfile(ProfileRequestDto requestDto) {
        Relationship relationship = null;
        if (requestDto.getRelationshipId() != null) {
            relationship = relationshipService.getRelationshipEntityById(requestDto.getRelationshipId());
        }

        Profile profile = profileConverter.toEntity(requestDto, relationship);
        Profile savedProfile = profileRepository.save(profile);
        return profileConverter.toDto(savedProfile);
    }

    /**
     * Update an existing profile
     * 
     * @param id Profile ID
     * @param requestDto ProfileRequestDto with updated values
     * @return ProfileDto or null if not found
     */
    @Transactional
    public ProfileDto updateProfile(Long id, ProfileRequestDto requestDto) {
        Optional<Profile> profileOpt = profileRepository.findById(id);
        if (profileOpt.isEmpty()) {
            return null;
        }

        Relationship relationship = null;
        if (requestDto.getRelationshipId() != null) {
            relationship = relationshipService.getRelationshipEntityById(requestDto.getRelationshipId());
        }

        Profile profile = profileOpt.get();
        profile = profileConverter.updateEntity(profile, requestDto, relationship);
        Profile updatedProfile = profileRepository.save(profile);
        return profileConverter.toDto(updatedProfile);
    }

    /**
     * Delete a profile
     * 
     * @param id Profile ID
     * @return true if deleted, false if not found
     */
    @Transactional
    public boolean deleteProfile(Long id) {
        Optional<Profile> profileOpt = profileRepository.findById(id);
        if (profileOpt.isEmpty()) {
            return false;
        }

        profileRepository.delete(profileOpt.get());
        return true;
    }

    /**
     * Get profile entity by ID (for internal use)
     * 
     * @param id Profile ID
     * @return Profile entity or null if not found
     */
    protected Profile getProfileEntityById(Long id) {
        return profileRepository.findById(id).orElse(null);
    }
}
