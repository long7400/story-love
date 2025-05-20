package com.lovestory.api.converter.impl;

import com.lovestory.api.converter.ProfileConverter;
import com.lovestory.api.dto.request.ProfileRequestDto;
import com.lovestory.api.dto.response.ProfileDto;
import com.lovestory.api.model.Profile;
import com.lovestory.api.model.Relationship;
import org.springframework.stereotype.Component;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Implementation of ProfileConverter interface
 */
@Component
public class ProfileConverterImpl implements ProfileConverter {

    private final DateTimeFormatter dateFormatter = DateTimeFormatter.ISO_DATE;

    /**
     * Convert Profile entity to ProfileDto
     * 
     * @param profile Profile entity
     * @return ProfileDto
     */
    @Override
    public ProfileDto toDto(Profile profile) {
        if (profile == null) {
            return null;
        }

        return ProfileDto.builder()
                .id(profile.getId())
                .name(profile.getName())
                .birthday(profile.getBirthday())
                .birthdayFormatted(profile.getBirthday() != null ? profile.getBirthday().format(dateFormatter) : null)
                .avatarUrl(profile.getAvatarUrl())
                .bio(profile.getBio())
                .favoriteQuote(profile.getFavoriteQuote())
                .relationshipId(profile.getRelationship() != null ? profile.getRelationship().getId() : null)
                .build();
    }

    /**
     * Convert a list of Profile entities to a list of ProfileDtos
     * 
     * @param profiles List of Profile entities
     * @return List of ProfileDtos
     */
    @Override
    public List<ProfileDto> toDtoList(List<Profile> profiles) {
        if (profiles == null) {
            return List.of();
        }

        return profiles.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    /**
     * Convert ProfileRequestDto to Profile entity
     * 
     * @param requestDto ProfileRequestDto
     * @param relationship Relationship entity
     * @return Profile entity
     */
    @Override
    public Profile toEntity(ProfileRequestDto requestDto, Relationship relationship) {
        if (requestDto == null) {
            return null;
        }

        Profile profile = new Profile();
        profile.setName(requestDto.getName());
        profile.setBirthday(requestDto.getBirthday());
        profile.setAvatarUrl(requestDto.getAvatarUrl());
        profile.setBio(requestDto.getBio());
        profile.setFavoriteQuote(requestDto.getFavoriteQuote());
        profile.setRelationship(relationship);

        return profile;
    }

    /**
     * Update Profile entity with ProfileRequestDto
     * 
     * @param profile Existing Profile entity
     * @param requestDto ProfileRequestDto with updated values
     * @param relationship Relationship entity
     * @return Updated Profile entity
     */
    @Override
    public Profile updateEntity(Profile profile, ProfileRequestDto requestDto, Relationship relationship) {
        if (profile == null || requestDto == null) {
            return profile;
        }

        profile.setName(requestDto.getName());
        profile.setBirthday(requestDto.getBirthday());
        profile.setAvatarUrl(requestDto.getAvatarUrl());
        profile.setBio(requestDto.getBio());
        profile.setFavoriteQuote(requestDto.getFavoriteQuote());
        profile.setRelationship(relationship);

        return profile;
    }
}
