package com.example.demo.controller;

import com.example.demo.model.Plant;
import com.example.demo.service.PlantService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/plant")
//@CrossOrigin("*")
@CrossOrigin(origins = "http://localhost:4200")
public class PlantController {
    private final PlantService plantService;

    public PlantController(PlantService plantService) {
        this.plantService = plantService;
    }

    @GetMapping
    public ResponseEntity<List<Plant>> getAllPlants(){
        List<Plant> plants = plantService.findAllPlants();
        return new ResponseEntity<>(plants, HttpStatus.OK);
    }

//    @GetMapping("/{id}")
//    public ResponseEntity<Plant> getPlantById(@PathVariable("id") Long id){
//        Plant plant = plantService.findPlantById(id);
//        return new ResponseEntity<>(plant, HttpStatus.OK);
//    }

    @PostMapping
    public ResponseEntity<Plant> addPlant(@RequestBody Plant plant){
        Plant newPlant = plantService.addPlant(plant);
        return new ResponseEntity<>(newPlant, HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<Plant> updatePlant(@RequestBody Plant plant){
        Plant updatePlant = plantService.updatePlant(plant);
        return new ResponseEntity<>(updatePlant, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePlant(@PathVariable("id") Long id){
        plantService.deletePlant(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
