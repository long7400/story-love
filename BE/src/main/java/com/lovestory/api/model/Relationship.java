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
    @Column(columnDefinition = "serial")
    private Long id;
    
    private LocalDate startDate;
    
    private String title;
    private String description;
    private String anniversaryMessage;
    
    @OneToMany(mappedBy = "relationship", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Profile> profiles;
    
    @OneToMany(mappedBy = "relationship", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Event> events;
    
    @OneToMany(mappedBy = "relationship", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Photo> photos;
}