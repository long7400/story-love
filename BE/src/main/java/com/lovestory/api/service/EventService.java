package com.lovestory.api.service;

import com.lovestory.api.converter.EventConverter;
import com.lovestory.api.dto.request.EventRequestDto;
import com.lovestory.api.dto.response.EventResponseDto;
import com.lovestory.api.model.Event;
import com.lovestory.api.model.Relationship;
import com.lovestory.api.repository.EventRepository;
import jakarta.annotation.Resource;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EventService {

    @Resource
    private EventRepository eventRepository;

    @Resource
    private EventConverter eventConverter;

    @Resource
    private RelationshipService relationshipService;

    /**
     * Get all events
     *
     * @return List of EventResponseDto
     */
    public List<EventResponseDto> getAllEvents() {
        List<Event> events = eventRepository.findAll();
        return events.stream()
                .map(eventConverter::toDto)
                .collect(Collectors.toList());
    }

    /**
     * Get event by ID
     *
     * @param id Event ID
     * @return EventResponseDto or null if not found
     */
    public EventResponseDto getEventById(Long id) {
        Optional<Event> eventOpt = eventRepository.findById(id);
        return eventOpt.map(eventConverter::toDto).orElse(null);
    }

    /**
     * Get events by relationship ID
     *
     * @param relationshipId Relationship ID
     * @return List of EventResponseDto
     */
    public List<EventResponseDto> getEventsByRelationshipId(Long relationshipId) {
        Relationship relationship = relationshipService.getRelationshipEntityById(relationshipId);
        if (relationship == null) {
            return List.of();
        }
        List<Event> events = eventRepository.findByRelationshipOrderByDateDesc(relationship);
        return events.stream()
                .map(eventConverter::toDto)
                .collect(Collectors.toList());
    }

    /**
     * Get events between two dates
     *
     * @param startDate Start date
     * @param endDate   End date
     * @return List of EventResponseDto
     */
    public List<EventResponseDto> getEventsBetweenDates(LocalDate startDate, LocalDate endDate) {
        List<Event> events = eventRepository.findByDateBetween(startDate, endDate);
        return events.stream()
                .map(eventConverter::toDto)
                .collect(Collectors.toList());
    }

    /**
     * Create a new event
     *
     * @param requestDto EventRequestDto
     * @return EventResponseDto
     */
    @Transactional
    public EventResponseDto createEvent(EventRequestDto requestDto) {
        try {
            Relationship relationship = null;
            if (requestDto.getRelationshipId() != null) {
                relationship = relationshipService.getRelationshipEntityById(requestDto.getRelationshipId());
            }

            Event event = eventConverter.toEntity(requestDto, relationship);
            Event savedEvent = eventRepository.save(event);

            return eventConverter.toDto(savedEvent);
        } catch (DataIntegrityViolationException ex) {
            // Log error
            String errorMessage = "Failed to create event. Duplicate primary key or constraint violation.";
            System.err.println(errorMessage);
            throw new RuntimeException(errorMessage, ex); // hoặc custom exception
        }
    }


    /**
     * Update an existing event
     *
     * @param id         Event ID
     * @param requestDto EventRequestDto with updated values
     * @return EventResponseDto or null if not found
     */
    @Transactional
    public EventResponseDto updateEvent(Long id, EventRequestDto requestDto) {
        Optional<Event> eventOpt = eventRepository.findById(id);
        if (eventOpt.isEmpty()) {
            return null;
        }

        Relationship relationship = null;
        if (requestDto.getRelationshipId() != null) {
            relationship = relationshipService.getRelationshipEntityById(requestDto.getRelationshipId());
        }

        Event event = eventOpt.get();
        event = eventConverter.updateEntity(event, requestDto, relationship);
        Event updatedEvent = eventRepository.save(event);
        return eventConverter.toDto(updatedEvent);
    }

    /**
     * Delete an event
     *
     * @param id Event ID
     * @return true if deleted, false if not found
     */
    @Transactional
    public boolean deleteEvent(Long id) {
        Optional<Event> eventOpt = eventRepository.findById(id);
        if (eventOpt.isEmpty()) {
            return false;
        }

        eventRepository.delete(eventOpt.get());
        return true;
    }

    /**
     * Get event entity by ID (for internal use)
     *
     * @param id Event ID
     * @return Event entity or null if not found
     */
    protected Event getEventEntityById(Long id) {
        return eventRepository.findById(id).orElse(null);
    }
}
