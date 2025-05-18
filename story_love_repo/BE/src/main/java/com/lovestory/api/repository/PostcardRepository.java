package com.lovestory.api.repository;

import com.lovestory.api.model.Postcard;
import com.lovestory.api.model.Relationship;
import com.lovestory.api.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface PostcardRepository extends JpaRepository<Postcard, Long> {
    List<Postcard> findByRelationship(Relationship relationship);
    List<Postcard> findByCreator(User creator);
    List<Postcard> findByFromName(String fromName);
    List<Postcard> findByToName(String toName);
    List<Postcard> findByCreatedAtAfter(LocalDateTime date);
    List<Postcard> findByDeliveredAtIsNull();
}