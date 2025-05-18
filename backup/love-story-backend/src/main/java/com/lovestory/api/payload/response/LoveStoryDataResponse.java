package com.lovestory.api.payload.response;

import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class LoveStoryDataResponse {
    private Map<String, Object> profiles;
    private Map<String, Object> relationship;
    private List<Map<String, Object>> events;
    private List<Map<String, Object>> photos;
}