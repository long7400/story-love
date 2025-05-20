package com.lovestory.api.service;

import com.lovestory.api.converter.CountdownConverter;
import com.lovestory.api.dto.request.CountdownRequestDto;
import com.lovestory.api.dto.response.CountdownDto;
import com.lovestory.api.model.Countdown;
import com.lovestory.api.model.Relationship;
import com.lovestory.api.repository.CountdownRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

/**
 * Service for Countdown related operations
 */
@Service
public class CountdownService {
    private final CountdownRepository countdownRepository;
    private final CountdownConverter countdownConverter;
    private final RelationshipService relationshipService;

    @Autowired
    public CountdownService(CountdownRepository countdownRepository,
                           CountdownConverter countdownConverter,
                           RelationshipService relationshipService) {
        this.countdownRepository = countdownRepository;
        this.countdownConverter = countdownConverter;
        this.relationshipService = relationshipService;
    }

    /**
     * Get all countdowns
     * 
     * @return List of CountdownDto
     */
    public List<CountdownDto> getAllCountdowns() {
        List<Countdown> countdowns = countdownRepository.findAll();
        return countdownConverter.toDtoList(countdowns);
    }

    /**
     * Get countdown by ID
     * 
     * @param id Countdown ID
     * @return CountdownDto or null if not found
     */
    public CountdownDto getCountdownById(Long id) {
        Optional<Countdown> countdownOpt = countdownRepository.findById(id);
        return countdownOpt.map(countdownConverter::toDto).orElse(null);
    }

    /**
     * Get countdowns by relationship
     * 
     * @param relationship Relationship entity
     * @return List of CountdownDto
     */
    public List<CountdownDto> getCountdownsByRelationship(Relationship relationship) {
        List<Countdown> countdowns = countdownRepository.findByRelationship(relationship);
        return countdownConverter.toDtoList(countdowns);
    }

    /**
     * Get countdowns by relationship ID
     * 
     * @param relationshipId Relationship ID
     * @return List of CountdownDto
     */
    public List<CountdownDto> getCountdownsByRelationshipId(Long relationshipId) {
        Relationship relationship = relationshipService.getRelationshipEntityById(relationshipId);
        if (relationship == null) {
            return List.of();
        }
        return getCountdownsByRelationship(relationship);
    }

    /**
     * Get future countdowns
     * 
     * @return List of CountdownDto
     */
    public List<CountdownDto> getFutureCountdowns() {
        List<Countdown> countdowns = countdownRepository.findByTargetDateAfter(LocalDateTime.now());
        return countdownConverter.toDtoList(countdowns);
    }

    /**
     * Get past countdowns
     * 
     * @return List of CountdownDto
     */
    public List<CountdownDto> getPastCountdowns() {
        List<Countdown> countdowns = countdownRepository.findByTargetDateBefore(LocalDateTime.now());
        return countdownConverter.toDtoList(countdowns);
    }

    /**
     * Search countdowns
     * 
     * @param searchTerm Search term
     * @return List of CountdownDto
     */
    public List<CountdownDto> searchCountdowns(String searchTerm) {
        List<Countdown> countdowns = countdownRepository.findByTitleContaining(searchTerm);
        return countdownConverter.toDtoList(countdowns);
    }

    /**
     * Create a new countdown
     * 
     * @param requestDto CountdownRequestDto
     * @return CountdownDto
     */
    @Transactional
    public CountdownDto createCountdown(CountdownRequestDto requestDto) {
        Relationship relationship = null;
        if (requestDto.getRelationshipId() != null) {
            relationship = relationshipService.getRelationshipEntityById(requestDto.getRelationshipId());
        }

        Countdown countdown = countdownConverter.toEntity(requestDto, relationship);
        Countdown savedCountdown = countdownRepository.save(countdown);
        return countdownConverter.toDto(savedCountdown);
    }

    /**
     * Update an existing countdown
     * 
     * @param id Countdown ID
     * @param requestDto CountdownRequestDto with updated values
     * @return CountdownDto or null if not found
     */
    @Transactional
    public CountdownDto updateCountdown(Long id, CountdownRequestDto requestDto) {
        Optional<Countdown> countdownOpt = countdownRepository.findById(id);
        if (countdownOpt.isEmpty()) {
            return null;
        }

        Relationship relationship = null;
        if (requestDto.getRelationshipId() != null) {
            relationship = relationshipService.getRelationshipEntityById(requestDto.getRelationshipId());
        }

        Countdown countdown = countdownOpt.get();
        countdown = countdownConverter.updateEntity(countdown, requestDto, relationship);
        Countdown updatedCountdown = countdownRepository.save(countdown);
        return countdownConverter.toDto(updatedCountdown);
    }

    /**
     * Delete a countdown
     * 
     * @param id Countdown ID
     * @return true if deleted, false if not found
     */
    @Transactional
    public boolean deleteCountdown(Long id) {
        Optional<Countdown> countdownOpt = countdownRepository.findById(id);
        if (countdownOpt.isEmpty()) {
            return false;
        }

        countdownRepository.delete(countdownOpt.get());
        return true;
    }

    /**
     * Get countdown entity by ID (for internal use)
     * 
     * @param id Countdown ID
     * @return Countdown entity or null if not found
     */
    protected Countdown getCountdownEntityById(Long id) {
        return countdownRepository.findById(id).orElse(null);
    }
}
