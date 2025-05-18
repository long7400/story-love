package com.lovestory.api.repository;

import com.lovestory.api.model.LocationMarker;
import com.lovestory.api.model.Relationship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LocationMarkerRepository extends JpaRepository<LocationMarker, Long> {
    List<LocationMarker> findByRelationship(Relationship relationship);
    List<LocationMarker> findByRelationshipAndIsSpecial(Relationship relationship, Boolean isSpecial);
    List<LocationMarker> findByNameContainingOrDescriptionContaining(String nameTerm, String descriptionTerm);
}