package com.lovestory.api.service;

import com.lovestory.api.model.Profile;
import com.lovestory.api.repository.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProfileService {

    private final ProfileRepository profileRepository;

    @Autowired
    public ProfileService(ProfileRepository profileRepository) {
        this.profileRepository = profileRepository;
    }

    public List<Profile> getAllProfiles() {
        return profileRepository.findAll();
    }

    public Optional<Profile> getProfileById(Long id) {
        return profileRepository.findById(id);
    }

    public Profile createProfile(Profile profile) {
        return profileRepository.save(profile);
    }

    public Optional<Profile> updateProfile(Long id, Profile profileDetails) {
        return profileRepository.findById(id)
                .map(existingProfile -> {
                    existingProfile.setName(profileDetails.getName());
                    existingProfile.setBirthday(profileDetails.getBirthday());
                    return profileRepository.save(existingProfile);
                });
    }

    public boolean deleteProfile(Long id) {
        return profileRepository.findById(id)
                .map(profile -> {
                    profileRepository.delete(profile);
                    return true;
                })
                .orElse(false);
    }
}