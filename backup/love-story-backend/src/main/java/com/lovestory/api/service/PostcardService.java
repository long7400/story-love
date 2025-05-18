package com.lovestory.api.service;

import com.lovestory.api.model.Postcard;
import com.lovestory.api.model.Relationship;
import com.lovestory.api.model.User;
import com.lovestory.api.repository.PostcardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class PostcardService {
    @Autowired
    private PostcardRepository postcardRepository;
    
    /**
     * Get all postcards
     */
    public List<Postcard> getAllPostcards() {
        return postcardRepository.findAll();
    }
    
    /**
     * Get postcard by ID
     */
    public Postcard getPostcardById(Long id) {
        Optional<Postcard> postcard = postcardRepository.findById(id);
        return postcard.orElse(null);
    }
    
    /**
     * Get postcards by relationship
     */
    public List<Postcard> getPostcardsByRelationship(Relationship relationship) {
        return postcardRepository.findByRelationship(relationship);
    }
    
    /**
     * Get postcards by creator
     */
    public List<Postcard> getPostcardsByCreator(User creator) {
        return postcardRepository.findByCreator(creator);
    }
    
    /**
     * Get postcards by sender name
     */
    public List<Postcard> getPostcardsBySender(String fromName) {
        return postcardRepository.findByFromName(fromName);
    }
    
    /**
     * Get postcards by recipient name
     */
    public List<Postcard> getPostcardsByRecipient(String toName) {
        return postcardRepository.findByToName(toName);
    }
    
    /**
     * Get all undelivered postcards
     */
    public List<Postcard> getUndeliveredPostcards() {
        return postcardRepository.findByDeliveredAtIsNull();
    }
    
    /**
     * Create a new postcard
     */
    @Transactional
    public Postcard createPostcard(Postcard postcard) {
        postcard.setCreatedAt(LocalDateTime.now());
        return postcardRepository.save(postcard);
    }
    
    /**
     * Update an existing postcard
     */
    @Transactional
    public Postcard updatePostcard(Long id, Postcard postcardDetails) {
        Postcard postcard = getPostcardById(id);
        if (postcard == null) {
            return null;
        }
        
        postcard.setTitle(postcardDetails.getTitle());
        postcard.setMessage(postcardDetails.getMessage());
        postcard.setImageUrl(postcardDetails.getImageUrl());
        postcard.setBackgroundColor(postcardDetails.getBackgroundColor());
        postcard.setFontFamily(postcardDetails.getFontFamily());
        postcard.setFromName(postcardDetails.getFromName());
        postcard.setToName(postcardDetails.getToName());
        postcard.setDeliveredAt(postcardDetails.getDeliveredAt());
        postcard.setHtmlEnabled(postcardDetails.getHtmlEnabled());
        
        return postcardRepository.save(postcard);
    }
    
    /**
     * Mark a postcard as delivered
     */
    @Transactional
    public Postcard markAsDelivered(Long id) {
        Postcard postcard = getPostcardById(id);
        if (postcard == null) {
            return null;
        }
        
        postcard.setDeliveredAt(LocalDateTime.now());
        return postcardRepository.save(postcard);
    }
    
    /**
     * Delete a postcard
     */
    @Transactional
    public boolean deletePostcard(Long id) {
        Postcard postcard = getPostcardById(id);
        if (postcard == null) {
            return false;
        }
        
        postcardRepository.delete(postcard);
        return true;
    }
}