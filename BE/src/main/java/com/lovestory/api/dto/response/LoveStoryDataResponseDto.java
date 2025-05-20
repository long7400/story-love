package com.lovestory.api.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoveStoryDataResponseDto {
    private Map<String, ProfileDto> profiles; // profiles sẽ có profile1 và profile2
    private RelationshipDto relationship;
    private List<EventResponseDto> events;
    private List<PhotoDto> photos;
}