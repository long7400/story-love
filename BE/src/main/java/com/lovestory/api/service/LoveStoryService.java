package com.lovestory.api.service;

import com.lovestory.api.dto.response.EventResponseDto;
import com.lovestory.api.dto.response.LoveStoryDataResponseDto;
import com.lovestory.api.dto.response.PhotoDto;
import com.lovestory.api.dto.response.ProfileDto;
import com.lovestory.api.dto.response.RelationshipDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Map;

/**
 * Service for Love Story related operations
 */
@Service
public class LoveStoryService {

    private final RelationshipService relationshipService;
    private final ProfileService profileService;
    private final EventService eventService;
    private final PhotoService photoService;

    @Autowired
    public LoveStoryService(RelationshipService relationshipService,
                           ProfileService profileService,
                           EventService eventService,
                           PhotoService photoService) {
        this.relationshipService = relationshipService;
        this.profileService = profileService;
        this.eventService = eventService;
        this.photoService = photoService;
    }

    /**
     * Get all data for a love story
     * 
     * @return LoveStoryDataResponseDto containing all love story data
     */
    public LoveStoryDataResponseDto getLoveStoryData() {
        RelationshipDto relationshipDto = relationshipService.getActiveRelationship();
        if (relationshipDto == null) {
            return null;
        }

        List<ProfileDto> profileDtos = profileService.getProfilesByRelationshipId(relationshipDto.getId());
        if (profileDtos.size() < 2) {
            return null;
        }
        profileDtos.sort(Comparator.comparingLong(ProfileDto::getId));

        Map<String, ProfileDto> profiles = Map.of(
                "profile1", profileDtos.get(0),
                "profile2", profileDtos.get(1)
        );

        List<EventResponseDto> eventDtos = eventService.getEventsByRelationshipId(relationshipDto.getId());

        List<PhotoDto> photoDtos = photoService.getPhotosByRelationshipId(relationshipDto.getId());

        return LoveStoryDataResponseDto.builder()
                .profiles(profiles)
                .relationship(relationshipDto)
                .events(eventDtos)
                .photos(photoDtos)
                .build();
    }
}
