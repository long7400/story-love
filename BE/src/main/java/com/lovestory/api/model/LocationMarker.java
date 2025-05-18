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
@Table(name = "location_markers")
public class LocationMarker {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "serial")
    private Long id;

    @NotBlank
    private String name;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    private LocalDate date;
    
    // Coordinates
    private Double latitude;
    private Double longitude;
    
    // For special locations (like first date, proposal, etc.)
    private Boolean isSpecial = false;
    
    // Optional image
    private String imageUrl;
    
    // References the relationship this location belongs to
    @ManyToOne
    @JoinColumn(name = "relationship_id")
    private Relationship relationship;
}