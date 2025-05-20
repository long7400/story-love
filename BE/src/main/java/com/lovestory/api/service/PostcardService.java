package com.lovestory.api.service;

import com.lovestory.api.converter.PostcardConverter;
import com.lovestory.api.dto.request.PostcardRequestDto;
import com.lovestory.api.dto.response.PostcardDto;
import com.lovestory.api.model.Postcard;
import com.lovestory.api.model.Relationship;
import com.lovestory.api.model.User;
import com.lovestory.api.repository.PostcardRepository;
import com.lovestory.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

/**
 * Service for Postcard related operations
 */
@Service
public class PostcardService {
    private final PostcardRepository postcardRepository;
    private final PostcardConverter postcardConverter;
    private final RelationshipService relationshipService;
    private final UserRepository userRepository;

    @Autowired
    public PostcardService(PostcardRepository postcardRepository,
                          PostcardConverter postcardConverter,
                          RelationshipService relationshipService,
                          UserRepository userRepository) {
        this.postcardRepository = postcardRepository;
        this.postcardConverter = postcardConverter;
        this.relationshipService = relationshipService;
        this.userRepository = userRepository;
    }

    /**
     * Get all postcards
     * 
     * @return List of PostcardDto
     */
    public List<PostcardDto> getAllPostcards() {
        List<Postcard> postcards = postcardRepository.findAll();
        return postcardConverter.toDtoList(postcards);
    }

    /**
     * Get postcard by ID
     * 
     * @param id Postcard ID
     * @return PostcardDto or null if not found
     */
    public PostcardDto getPostcardById(Long id) {
        Optional<Postcard> postcardOpt = postcardRepository.findById(id);
        return postcardOpt.map(postcardConverter::toDto).orElse(null);
    }

    /**
     * Get postcards by relationship ID
     * 
     * @param relationshipId Relationship ID
     * @return List of PostcardDto
     */
    public List<PostcardDto> getPostcardsByRelationshipId(Long relationshipId) {
        Relationship relationship = relationshipService.getRelationshipEntityById(relationshipId);
        if (relationship == null) {
            return List.of();
        }
        List<Postcard> postcards = postcardRepository.findByRelationship(relationship);
        return postcardConverter.toDtoList(postcards);
    }

    /**
     * Get postcards by creator ID
     * 
     * @param creatorId Creator ID
     * @return List of PostcardDto
     */
    public List<PostcardDto> getPostcardsByCreatorId(Long creatorId) {
        Optional<User> creatorOpt = userRepository.findById(creatorId);
        if (creatorOpt.isEmpty()) {
            return List.of();
        }
        List<Postcard> postcards = postcardRepository.findByCreator(creatorOpt.get());
        return postcardConverter.toDtoList(postcards);
    }

    /**
     * Get postcards by sender name
     * 
     * @param fromName Sender name
     * @return List of PostcardDto
     */
    public List<PostcardDto> getPostcardsBySender(String fromName) {
        List<Postcard> postcards = postcardRepository.findByFromName(fromName);
        return postcardConverter.toDtoList(postcards);
    }

    /**
     * Get postcards by recipient name
     * 
     * @param toName Recipient name
     * @return List of PostcardDto
     */
    public List<PostcardDto> getPostcardsByRecipient(String toName) {
        List<Postcard> postcards = postcardRepository.findByToName(toName);
        return postcardConverter.toDtoList(postcards);
    }

    /**
     * Get all undelivered postcards
     * 
     * @return List of PostcardDto
     */
    public List<PostcardDto> getUndeliveredPostcards() {
        List<Postcard> postcards = postcardRepository.findByDeliveredAtIsNull();
        return postcardConverter.toDtoList(postcards);
    }

    /**
     * Create a new postcard
     * 
     * @param requestDto PostcardRequestDto
     * @return PostcardDto
     */
    @Transactional
    public PostcardDto createPostcard(PostcardRequestDto requestDto) {
        // Get the current authenticated user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = userRepository.findByUsername(username).orElse(null);

        Relationship relationship = null;
        if (requestDto.getRelationshipId() != null) {
            relationship = relationshipService.getRelationshipEntityById(requestDto.getRelationshipId());
        }

        Postcard postcard = postcardConverter.toEntity(requestDto, relationship, user);
        Postcard savedPostcard = postcardRepository.save(postcard);
        return postcardConverter.toDto(savedPostcard);
    }

    /**
     * Update an existing postcard
     * 
     * @param id Postcard ID
     * @param requestDto PostcardRequestDto with updated values
     * @return PostcardDto or null if not found
     */
    @Transactional
    public PostcardDto updatePostcard(Long id, PostcardRequestDto requestDto) {
        Optional<Postcard> postcardOpt = postcardRepository.findById(id);
        if (postcardOpt.isEmpty()) {
            return null;
        }

        Relationship relationship = null;
        if (requestDto.getRelationshipId() != null) {
            relationship = relationshipService.getRelationshipEntityById(requestDto.getRelationshipId());
        }

        Postcard postcard = postcardOpt.get();
        postcard = postcardConverter.updateEntity(postcard, requestDto, relationship);
        Postcard updatedPostcard = postcardRepository.save(postcard);
        return postcardConverter.toDto(updatedPostcard);
    }

    /**
     * Mark a postcard as delivered
     * 
     * @param id Postcard ID
     * @return PostcardDto or null if not found
     */
    @Transactional
    public PostcardDto markAsDelivered(Long id) {
        Optional<Postcard> postcardOpt = postcardRepository.findById(id);
        if (postcardOpt.isEmpty()) {
            return null;
        }

        Postcard postcard = postcardOpt.get();
        postcard.setDeliveredAt(LocalDateTime.now());
        Postcard deliveredPostcard = postcardRepository.save(postcard);
        return postcardConverter.toDto(deliveredPostcard);
    }

    /**
     * Delete a postcard
     * 
     * @param id Postcard ID
     * @return true if deleted, false if not found
     */
    @Transactional
    public boolean deletePostcard(Long id) {
        Optional<Postcard> postcardOpt = postcardRepository.findById(id);
        if (postcardOpt.isEmpty()) {
            return false;
        }

        postcardRepository.delete(postcardOpt.get());
        return true;
    }

    /**
     * Get postcard entity by ID (for internal use)
     * 
     * @param id Postcard ID
     * @return Postcard entity or null if not found
     */
    protected Postcard getPostcardEntityById(Long id) {
        return postcardRepository.findById(id).orElse(null);
    }
}
