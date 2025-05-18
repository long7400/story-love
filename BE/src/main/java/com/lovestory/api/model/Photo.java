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
@Table(name = "photos")
public class Photo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String title;
    
    private LocalDate date;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @NotBlank
    private String imageUrl;
    
    // Optional fields for enhanced photo details
    private String location;
    private String tags;
    
    // Flag for whether HTML is allowed in descriptions
    private Boolean htmlEnabled = false;
    
    // References the relationship this photo belongs to
    @ManyToOne
    @JoinColumn(name = "relationship_id")
    private Relationship relationship;
}