package com.lovestory.api.service;

import com.lovestory.api.model.Event;
import com.lovestory.api.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventService {

    private final EventRepository eventRepository;

    @Autowired
    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public Optional<Event> getEventById(Long id) {
        return eventRepository.findById(id);
    }

    public Event createEvent(Event event) {
        return eventRepository.save(event);
    }

    public Optional<Event> updateEvent(Long id, Event eventDetails) {
        return eventRepository.findById(id)
                .map(existingEvent -> {
                    existingEvent.setTitle(eventDetails.getTitle());
                    existingEvent.setDate(eventDetails.getDate());
                    existingEvent.setShortDescription(eventDetails.getShortDescription());
                    existingEvent.setFullDescription(eventDetails.getFullDescription());
                    existingEvent.setImageUrl(eventDetails.getImageUrl());
                    return eventRepository.save(existingEvent);
                });
    }

    public boolean deleteEvent(Long id) {
        return eventRepository.findById(id)
                .map(event -> {
                    eventRepository.delete(event);
                    return true;
                })
                .orElse(false);
    }
}