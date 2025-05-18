package com.lovestory.api.service;

import com.lovestory.api.model.Countdown;
import com.lovestory.api.model.Relationship;
import com.lovestory.api.repository.CountdownRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class CountdownService {
    @Autowired
    private CountdownRepository countdownRepository;
    
    /**
     * Get all countdowns
     */
    public List<Countdown> getAllCountdowns() {
        return countdownRepository.findAll();
    }
    
    /**
     * Get countdown by ID
     */
    public Countdown getCountdownById(Long id) {
        Optional<Countdown> countdown = countdownRepository.findById(id);
        return countdown.orElse(null);
    }
    
    /**
     * Get countdowns by relationship
     */
    public List<Countdown> getCountdownsByRelationship(Relationship relationship) {
        return countdownRepository.findByRelationship(relationship);
    }
    
    /**
     * Get future countdowns
     */
    public List<Countdown> getFutureCountdowns() {
        return countdownRepository.findByTargetDateAfter(LocalDateTime.now());
    }
    
    /**
     * Get past countdowns
     */
    public List<Countdown> getPastCountdowns() {
        return countdownRepository.findByTargetDateBefore(LocalDateTime.now());
    }
    
    /**
     * Search countdowns
     */
    public List<Countdown> searchCountdowns(String searchTerm) {
        return countdownRepository.findByTitleContaining(searchTerm);
    }
    
    /**
     * Create a new countdown
     */
    @Transactional
    public Countdown createCountdown(Countdown countdown) {
        return countdownRepository.save(countdown);
    }
    
    /**
     * Update an existing countdown
     */
    @Transactional
    public Countdown updateCountdown(Long id, Countdown countdownDetails) {
        Countdown countdown = getCountdownById(id);
        if (countdown == null) {
            return null;
        }
        
        countdown.setTitle(countdownDetails.getTitle());
        countdown.setTargetDate(countdownDetails.getTargetDate());
        countdown.setDescription(countdownDetails.getDescription());
        countdown.setImageUrl(countdownDetails.getImageUrl());
        countdown.setBackgroundColor(countdownDetails.getBackgroundColor());
        countdown.setFontColor(countdownDetails.getFontColor());
        countdown.setRelationship(countdownDetails.getRelationship());
        
        return countdownRepository.save(countdown);
    }
    
    /**
     * Delete a countdown
     */
    @Transactional
    public boolean deleteCountdown(Long id) {
        Countdown countdown = getCountdownById(id);
        if (countdown == null) {
            return false;
        }
        
        countdownRepository.delete(countdown);
        return true;
    }
}