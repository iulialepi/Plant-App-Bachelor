package com.example.demo.repository;

import com.example.demo.model.Plant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PlantRepo extends JpaRepository<Plant, Long> {
    void deletePlantById(Long id);
    Optional<Plant> findPlantById(Long id);
    //Optional<PlantModel> findPlantByName(String name);
}
