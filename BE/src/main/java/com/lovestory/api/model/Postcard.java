package com.lovestory.api.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "postcards")
public class Postcard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "serial")
    private Long id;

    @NotBlank
    private String title;
    
    @Column(columnDefinition = "TEXT")
    private String message;
    
    private String imageUrl;
    
    private String backgroundColor;
    private String fontFamily;
    
    // Sender and receiver information
    private String fromName;
    private String toName;
    
    // Creation and delivery dates
    private LocalDateTime createdAt;
    private LocalDateTime deliveredAt;
    
    // Optional HTML support
    private Boolean htmlEnabled = false;
    
    // References the relationship this postcard belongs to
    @ManyToOne
    @JoinColumn(name = "relationship_id")
    private Relationship relationship;
    
    // References the user who created this postcard
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User creator;
}