package com.example.demo.model;

import com.example.demo.model.enums.LightEnum;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
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
public class Light {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false, updatable = false)
    Long id;

    @Column
    LightEnum name;

    @ManyToMany(mappedBy = "lights")
    @JsonIgnore
    private List<Plant> plants;
}
