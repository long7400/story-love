package com.lovestory.api.repository;

import com.lovestory.api.model.Profile;
import com.lovestory.api.model.Relationship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProfileRepository extends JpaRepository<Profile, Long> {
    List<Profile> findByRelationship(Relationship relationship);
    Optional<Profile> findByNameAndRelationship(String name, Relationship relationship);
}