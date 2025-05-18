package com.lovestory.api.repository;

import com.lovestory.api.model.Countdown;
import com.lovestory.api.model.Relationship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface CountdownRepository extends JpaRepository<Countdown, Long> {
    List<Countdown> findByRelationship(Relationship relationship);
    List<Countdown> findByTargetDateAfter(LocalDateTime date);
    List<Countdown> findByTargetDateBefore(LocalDateTime date);
    List<Countdown> findByTitleContaining(String titleTerm);
}