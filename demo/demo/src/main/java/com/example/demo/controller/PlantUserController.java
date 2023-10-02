package com.example.demo.controller;

import com.example.demo.model.Plant;
import com.example.demo.model.PlantUser;
import com.example.demo.model.User;
import com.example.demo.service.JournalService;
import com.example.demo.service.PlantUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/plant-user")
//@CrossOrigin("*")
//@CrossOrigin("**")
//@CrossOrigin(origins = "http://localhost:4200")
@CrossOrigin(origins = "*")
public class PlantUserController {
    private final PlantUserService plantUserService;

    //@Autowired
    private JournalService journalService;

    public PlantUserController(PlantUserService plantUserService) {
        this.plantUserService = plantUserService;
    }

    @PostMapping("/save")
    public PlantUser saveUserPlant(@RequestParam Long userId, @RequestParam Long plantId,
                                   @RequestParam String alias, @RequestParam boolean isTerracotta) {
        return plantUserService.insertPlantForUser(userId, plantId, alias, isTerracotta);
    }

    @GetMapping("/{id}")
    public List<PlantUser> getUserPlant(@PathVariable Long id) {
        return plantUserService.getAllPlantsByUserId(id);
    }

    @DeleteMapping("/delete-plant-user/{id}")
    public ResponseEntity<?> deletePlantUser(@PathVariable Long id) {
        plantUserService.deletePlantFromUser(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/update/{id}")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<PlantUser> updatePlantUser(@RequestBody PlantUser plantUser) throws ParseException {
        return ResponseEntity.ok(plantUserService.updatePlantUser(plantUser));
    }
}
