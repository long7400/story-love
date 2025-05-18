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
@Table(name = "profiles")
public class Profile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String name;
    
    private LocalDate birthday;

    // Optional fields for enhanced profiles
    private String avatarUrl;
    private String bio;
    private String favoriteQuote;
    
    // Many profiles can belong to the same relationship
    @ManyToOne
    @JoinColumn(name = "relationship_id")
    private Relationship relationship;
}