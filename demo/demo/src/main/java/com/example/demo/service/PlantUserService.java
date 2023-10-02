package com.example.demo.service;

import com.example.demo.model.Plant;
import com.example.demo.model.PlantUser;
import com.example.demo.model.User;
import com.example.demo.repository.PlantUserRepo;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.Comparator;
import java.util.Date;
import java.util.List;

@Service
@Transactional
public class PlantUserService {
    private final PlantService plantService;
    private final UserService userService;

    private final PlantUserRepo plantUserRepo;

    public PlantUserService(PlantUserRepo plantUserRepo, PlantService plantService, UserService userService) {
        this.plantUserRepo = plantUserRepo;
        this.plantService = plantService;
        this.userService = userService;
    }

    public PlantUser insertPlantForUser(Long userId, Long plantId, String alias, boolean isTerracotta) {
        PlantUser plantUser = new PlantUser();
        Plant plant = plantService.findPlantById(plantId);
        User user = userService.findById(userId);

        plantUser.setUser(user);
        plantUser.setPlant(plant);
        plantUser.setPlantAlias(alias);
        plantUser.setTerracotta(isTerracotta);
        plantUser.setLastWatered(Date.from(Instant.now()));

        if (!isTerracotta) {
            plantUser.setActualWater(plant.getWater() + 2);
        } else {
            plantUser.setActualWater(plant.getWater() - 2);
        }

        plantUser.setDaysLeft(plantUser.getActualWater());

        return plantUserRepo.save(plantUser);
    }

    public List<PlantUser> getAllPlantsByUserId(Long id) {
        List<PlantUser> plantUserList = plantUserRepo.findAllByUser_Id(id);
        Comparator<PlantUser> compareByWaterDays = Comparator.comparing(PlantUser::getDaysLeft);
        plantUserList.sort(compareByWaterDays);
        return plantUserList;
    }

    public void deletePlantFromUser(Long plantUserId) {
        plantUserRepo.deleteById(plantUserId);
    }

    public PlantUser updatePlantUser(PlantUser plantUser) throws ParseException {
        PlantUser plantUserToUpdate = plantUserRepo.findById(plantUser.getId()).orElseThrow();

        System.out.println(plantUser);

        plantUserToUpdate.setPlantAlias(plantUser.getPlantAlias());
        plantUserToUpdate.setLastWatered(plantUser.getLastWatered());

        plantUserToUpdate.setDaysLeft(this.waterDaysForPlantId2(plantUser.getLastWatered(), plantUser.getActualWater()));

        return plantUserRepo.save(plantUserToUpdate);
    }

    public int waterDaysForPlantId(Long id) {
        PlantUser plantUser = plantUserRepo.findById(id).orElseThrow();

        LocalDate d1 = LocalDate.parse(plantUser.getLastWatered().toString(), DateTimeFormatter.ISO_LOCAL_DATE);
        LocalDate d2 = LocalDate.parse(LocalDate.now().toString(), DateTimeFormatter.ISO_LOCAL_DATE);
        Duration diff = Duration.between(d1.atStartOfDay(), d2.atStartOfDay());
        int diffDays = (int) diff.toDays();

        return plantUser.getActualWater() - diffDays;
    }
    public int waterDaysForPlantId2(Date lastWatered, int actualWater) {
        long lastWateredTime = lastWatered.getTime();
        long currentTime = new Date().getTime();

        long timeDifferenceMillis = currentTime - lastWateredTime;
        int diffDays = (int) (timeDifferenceMillis / (1000 * 60 * 60 * 24));

        return actualWater - diffDays;
    }
}
