package com.lovestory.api.converter;

import com.lovestory.api.dto.request.ProfileRequestDto;
import com.lovestory.api.dto.response.ProfileDto;
import com.lovestory.api.model.Profile;
import com.lovestory.api.model.Relationship;

import java.util.List;

/**
 * Converter interface for Profile entity and DTOs
 */
public interface ProfileConverter {
    /**
     * Convert Profile entity to ProfileDto
     * 
     * @param profile Profile entity
     * @return ProfileDto
     */
    ProfileDto toDto(Profile profile);

    /**
     * Convert a list of Profile entities to a list of ProfileDtos
     * 
     * @param profiles List of Profile entities
     * @return List of ProfileDtos
     */
    List<ProfileDto> toDtoList(List<Profile> profiles);

    /**
     * Convert ProfileRequestDto to Profile entity
     * 
     * @param requestDto ProfileRequestDto
     * @param relationship Relationship entity
     * @return Profile entity
     */
    Profile toEntity(ProfileRequestDto requestDto, Relationship relationship);

    /**
     * Update Profile entity with ProfileRequestDto
     * 
     * @param profile Existing Profile entity
     * @param requestDto ProfileRequestDto with updated values
     * @param relationship Relationship entity
     * @return Updated Profile entity
     */
    Profile updateEntity(Profile profile, ProfileRequestDto requestDto, Relationship relationship);
}
