package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Entity
@Table
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PlantUser {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false, updatable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "plant_id")
    Plant plant;

    @ManyToOne
    @JoinColumn(name = "user_id")
    User user;

    @Column
    String plantAlias;

    @Column
    boolean isTerracotta;

    @Column
    int actualWater;

    @Column
    private Date lastWatered;

    @Column
    private int daysLeft;
}
