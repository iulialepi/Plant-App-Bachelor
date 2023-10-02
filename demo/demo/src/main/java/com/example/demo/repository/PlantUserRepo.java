package com.example.demo.repository;

import com.example.demo.model.Plant;
import com.example.demo.model.PlantUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlantUserRepo extends JpaRepository<PlantUser, Long> {
    List<PlantUser> findAllByUser_Id(Long id);
    void deleteById(Long id);
}
