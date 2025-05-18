package com.lovestory.api.service;

import com.lovestory.api.model.Event;
import com.lovestory.api.model.Relationship;
import com.lovestory.api.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class EventService {
    @Autowired
    private EventRepository eventRepository;
    
    /**
     * Get all events
     */
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }
    
    /**
     * Get event by ID
     */
    public Event getEventById(Long id) {
        Optional<Event> event = eventRepository.findById(id);
        return event.orElse(null);
    }
    
    /**
     * Get events by relationship
     */
    public List<Event> getEventsByRelationship(Relationship relationship) {
        return eventRepository.findByRelationshipOrderByDateDesc(relationship);
    }
    
    /**
     * Get events between two dates
     */
    public List<Event> getEventsBetweenDates(LocalDate startDate, LocalDate endDate) {
        return eventRepository.findByDateBetween(startDate, endDate);
    }
    
    /**
     * Create a new event
     */
    @Transactional
    public Event createEvent(Event event) {
        return eventRepository.save(event);
    }
    
    /**
     * Update an existing event
     */
    @Transactional
    public Event updateEvent(Long id, Event eventDetails) {
        Event event = getEventById(id);
        if (event == null) {
            return null;
        }
        
        event.setTitle(eventDetails.getTitle());
        event.setDate(eventDetails.getDate());
        event.setShortDescription(eventDetails.getShortDescription());
        event.setFullDescription(eventDetails.getFullDescription());
        event.setImageUrl(eventDetails.getImageUrl());
        event.setHtmlEnabled(eventDetails.getHtmlEnabled());
        event.setRelationship(eventDetails.getRelationship());
        
        return eventRepository.save(event);
    }
    
    /**
     * Delete an event
     */
    @Transactional
    public boolean deleteEvent(Long id) {
        Event event = getEventById(id);
        if (event == null) {
            return false;
        }
        
        eventRepository.delete(event);
        return true;
    }
}