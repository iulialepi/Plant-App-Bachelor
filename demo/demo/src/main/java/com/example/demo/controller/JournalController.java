package com.example.demo.controller;

import com.example.demo.model.Journal;
import com.example.demo.repository.JournalRepo;
import com.example.demo.service.JournalService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/journal")
@CrossOrigin(origins = "*")
//@CrossOrigin(origins = "http://localhost:4200")
public class JournalController {
//    private final JournalRepo journalRepo;
    private final JournalService journalService;

    public JournalController(JournalService journalService) {
//        this.journalRepo = journalRepo;
        this.journalService = journalService;
    }

    @PostMapping("/add")
    public ResponseEntity<Journal> addJournalEntry(@RequestBody Journal journal) {

        Journal savedEntry = journalService.save(journal);
//        String imageUrl = savedEntry.getImageUrl();
//        savedEntry.setImageUrl(imageUrl);
        return ResponseEntity.ok(savedEntry);
    }

    @GetMapping("/plant-user/{userId}")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<List<Journal>> getUserJournalEntries(@PathVariable Long userId) {
        List<Journal> entries = journalService.getAllEntriesByUserId(userId);
        return ResponseEntity.ok(entries);
    }

}
