package com.lovestory.api.controller;

import com.lovestory.api.model.*;
import com.lovestory.api.payload.response.LoveStoryDataResponse;
import com.lovestory.api.service.EventService;
import com.lovestory.api.service.PhotoService;
import com.lovestory.api.service.ProfileService;
import com.lovestory.api.service.RelationshipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class LoveStoryController {
    @Autowired
    private ProfileService profileService;

    @Autowired
    private RelationshipService relationshipService;

    @Autowired
    private EventService eventService;

    @Autowired
    private PhotoService photoService;

    private final DateTimeFormatter dateFormatter = DateTimeFormatter.ISO_DATE;

    @GetMapping("/love-story-data")
    public ResponseEntity<?> getLoveStoryData() {
        // Retrieve relationship data
        Relationship relationship = relationshipService.getActiveRelationship();
        if (relationship == null) {
            return ResponseEntity.noContent().build();
        }
        
        // Get profiles in this relationship
        List<Profile> profiles = profileService.getProfilesByRelationship(relationship);
        if (profiles.size() < 2) {
            return ResponseEntity.noContent().build();
        }
        
        // Get events for this relationship
        List<Event> events = eventService.getEventsByRelationship(relationship);
        
        // Get photos for this relationship
        List<Photo> photos = photoService.getPhotosByRelationship(relationship);
        
        // Format the response according to frontend expectations
        LoveStoryDataResponse response = new LoveStoryDataResponse();
        
        // Set profiles data
        Map<String, Object> profile1Map = new HashMap<>();
        profile1Map.put("name", profiles.get(0).getName());
        profile1Map.put("birthday", profiles.get(0).getBirthday().format(dateFormatter));
        
        Map<String, Object> profile2Map = new HashMap<>();
        profile2Map.put("name", profiles.get(1).getName());
        profile2Map.put("birthday", profiles.get(1).getBirthday().format(dateFormatter));
        
        Map<String, Object> profilesMap = new HashMap<>();
        profilesMap.put("profile1", profile1Map);
        profilesMap.put("profile2", profile2Map);
        response.setProfiles(profilesMap);
        
        // Set relationship data
        Map<String, Object> relationshipMap = new HashMap<>();
        relationshipMap.put("startDate", relationship.getStartDate().format(dateFormatter));
        response.setRelationship(relationshipMap);
        
        // Set events data
        List<Map<String, Object>> eventsList = events.stream().map(event -> {
            Map<String, Object> eventMap = new HashMap<>();
            eventMap.put("id", event.getId());
            eventMap.put("title", event.getTitle());
            eventMap.put("date", event.getDate().format(dateFormatter));
            eventMap.put("shortDescription", event.getShortDescription());
            eventMap.put("fullDescription", event.getFullDescription());
            eventMap.put("imageUrl", event.getImageUrl());
            return eventMap;
        }).collect(Collectors.toList());
        response.setEvents(eventsList);
        
        // Set photos data
        List<Map<String, Object>> photosList = photos.stream().map(photo -> {
            Map<String, Object> photoMap = new HashMap<>();
            photoMap.put("id", photo.getId());
            photoMap.put("title", photo.getTitle());
            photoMap.put("date", photo.getDate().format(dateFormatter));
            photoMap.put("description", photo.getDescription());
            photoMap.put("imageUrl", photo.getImageUrl());
            return photoMap;
        }).collect(Collectors.toList());
        response.setPhotos(photosList);
        
        return ResponseEntity.ok(response);
    }
}