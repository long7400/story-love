package com.lovestory.api.controller;

import com.lovestory.api.dto.response.LoveStoryDataResponseDto;
import com.lovestory.api.service.LoveStoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoveStoryDataController {

    private final LoveStoryService loveStoryService;

    @Autowired
    public LoveStoryDataController(LoveStoryService loveStoryService) {
        this.loveStoryService = loveStoryService;
    }

    @GetMapping("/love-story-data")
    public ResponseEntity<?> getLoveStoryData() {
        LoveStoryDataResponseDto response = loveStoryService.getLoveStoryData();
        if (response == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(response);
    }
}
