package com.lovestory.api.repository;

import com.lovestory.api.model.Photo;
import com.lovestory.api.model.Relationship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface PhotoRepository extends JpaRepository<Photo, Long> {
    List<Photo> findByRelationship(Relationship relationship);
    List<Photo> findByRelationshipOrderByDateDesc(Relationship relationship);
    List<Photo> findByDateBetween(LocalDate startDate, LocalDate endDate);
    List<Photo> findByTitleContainingOrDescriptionContaining(String titleTerm, String descriptionTerm);
}