package com.example.demo.service;

import com.example.demo.model.Journal;
import com.example.demo.model.PlantUser;
import com.example.demo.repository.JournalRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
@Transactional
public class JournalService {

    private final JournalRepo journalRepo;

    private final UserService userService;

    @Autowired
    public JournalService(JournalRepo journalRepo, UserService userService) {
        this.journalRepo = journalRepo;
        this.userService = userService;
    }

    public Journal save(Journal journal) {
        return journalRepo.save(journal);
    }

    public List<Journal> findByUser(Long userId) {
        return journalRepo.findByUserId(userId);
    }

    public List<Journal> getAllEntriesByUserId(Long id) {
        List<Journal> journalList = journalRepo.findByUserId(id);
        return journalList;
    }
}
