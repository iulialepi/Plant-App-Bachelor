package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Plant {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false, updatable = false)
    private Long id;

    @Column
    private String name;

    @Column
    private String commonName;

    @ManyToMany
    @JoinTable(
            name="plant_light",
            joinColumns = @JoinColumn(name="plant_id"),
            inverseJoinColumns = @JoinColumn(name="light_id")
    )
    @JsonIgnore
    private List<Light> lights;

    @Column
    private int water;

    @Column
    private int fertilize;

    @Column
    private String description;

    @OneToMany(mappedBy = "plant")
    @JsonIgnore
    List<PlantUser> owners;
}
