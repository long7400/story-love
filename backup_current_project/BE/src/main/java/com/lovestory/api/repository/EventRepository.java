package com.lovestory.api.repository;

import com.lovestory.api.model.Event;
import com.lovestory.api.model.Relationship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findByRelationship(Relationship relationship);
    List<Event> findByRelationshipOrderByDateDesc(Relationship relationship);
    List<Event> findByDateBetween(LocalDate startDate, LocalDate endDate);
}