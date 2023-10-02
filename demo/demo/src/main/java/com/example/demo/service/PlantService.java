package com.example.demo.service;


import com.example.demo.model.Plant;
import com.example.demo.repository.PlantRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class PlantService {
    private final PlantRepo plantRepo;


    @Autowired
    public PlantService(PlantRepo plantRepo){
        this.plantRepo = plantRepo;
    }

    public Plant addPlant(Plant plant){
        return plantRepo.save(plant);
    }

    public List<Plant> findAllPlants(){
        return plantRepo.findAll();
    }

    public Plant updatePlant(Plant plant){
        return plantRepo.save(plant);
    }

    public Plant findPlantById(Long id){
        return plantRepo.findPlantById(id).orElseThrow();
    }
    public void deletePlant(Long id){
        plantRepo.deletePlantById(id);
    }
    //Optional<PlantModel> findPlantByName(String name);
}
