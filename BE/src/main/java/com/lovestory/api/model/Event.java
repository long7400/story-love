package com.lovestory.api.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "events")
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String title;
    
    private LocalDate date;
    
    @Column(length = 1000)
    private String shortDescription;
    
    @Column(columnDefinition = "TEXT")
    private String fullDescription;
    
    private String imageUrl;
    
    // Flag for whether HTML is allowed in descriptions
    private Boolean htmlEnabled = false;
    
    // References the relationship this event belongs to
    @ManyToOne
    @JoinColumn(name = "relationship_id")
    private Relationship relationship;
}