package com.lovestory.api.controller;

import com.lovestory.api.model.Event;
import com.lovestory.api.model.Photo;
import com.lovestory.api.model.Profile;
import com.lovestory.api.model.Relationship;
import com.lovestory.api.service.EventService;
import com.lovestory.api.service.PhotoService;
import com.lovestory.api.service.ProfileService;
import com.lovestory.api.service.RelationshipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class LoveStoryDataController {

    private final ProfileService profileService;
    private final RelationshipService relationshipService;
    private final EventService eventService;
    private final PhotoService photoService;

    @Autowired
    public LoveStoryDataController(
            ProfileService profileService,
            RelationshipService relationshipService,
            EventService eventService,
            PhotoService photoService
    ) {
        this.profileService = profileService;
        this.relationshipService = relationshipService;
        this.eventService = eventService;
        this.photoService = photoService;
    }

    @GetMapping("/love-story-data")
    public ResponseEntity<Map<String, Object>> getLoveStoryData() {
        Map<String, Object> response = new HashMap<>();
        
        List<Profile> profiles = profileService.getAllProfiles();
        List<Relationship> relationships = relationshipService.getAllRelationships();
        List<Event> events = eventService.getAllEvents();
        List<Photo> photos = photoService.getAllPhotos();
        
        Map<String, Object> profilesMap = new HashMap<>();
        if (profiles.size() >= 2) {
            profilesMap.put("profile1", profiles.get(0));
            profilesMap.put("profile2", profiles.get(1));
        } else if (profiles.size() == 1) {
            profilesMap.put("profile1", profiles.get(0));
            profilesMap.put("profile2", new HashMap<String, String>() {{
                put("name", "Partner");
                put("birthday", "");
            }});
        } else {
            profilesMap.put("profile1", new HashMap<String, String>() {{
                put("name", "Partner 1");
                put("birthday", "");
            }});
            profilesMap.put("profile2", new HashMap<String, String>() {{
                put("name", "Partner 2");
                put("birthday", "");
            }});
        }
        
        response.put("profiles", profilesMap);
        response.put("relationship", relationships.isEmpty() ? 
                new HashMap<String, String>() {{ put("startDate", ""); }} : relationships.get(0));
        response.put("events", events);
        response.put("photos", photos);
        
        return ResponseEntity.ok(response);
    }
}