package com.lovestory.api.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "relationships")
public class Relationship {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private LocalDate startDate;
    
    // Additional fields for enhanced relationship details
    private String title;
    private String description;
    private String anniversaryMessage;
    
    // One relationship can have many profiles
    @OneToMany(mappedBy = "relationship", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Profile> profiles;
    
    // One relationship can have many events
    @OneToMany(mappedBy = "relationship", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Event> events;
    
    // One relationship can have many photos
    @OneToMany(mappedBy = "relationship", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Photo> photos;
}