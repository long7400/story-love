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
@Table(name = "countdowns")
public class Countdown {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String title;
    
    private LocalDateTime targetDate;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    // Optional image for the countdown
    private String imageUrl;
    
    // Optional styling options
    private String backgroundColor;
    private String fontColor;
    
    // References the relationship this countdown belongs to
    @ManyToOne
    @JoinColumn(name = "relationship_id")
    private Relationship relationship;
}