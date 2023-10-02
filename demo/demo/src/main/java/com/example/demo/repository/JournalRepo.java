package com.example.demo.repository;

import com.example.demo.model.Journal;
import com.example.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface JournalRepo extends JpaRepository<Journal, Long> {
    List<Journal> findByUserId(Long userId);


}