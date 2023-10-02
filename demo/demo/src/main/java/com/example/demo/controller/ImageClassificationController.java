package com.example.demo.controller;

import com.example.demo.service.ImageClassificationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/image-classification")
@CrossOrigin(origins = "*")
public class ImageClassificationController {
    private final ImageClassificationService imageClassificationService;

    public ImageClassificationController(ImageClassificationService imageClassificationService) {
        this.imageClassificationService = imageClassificationService;
    }

    @PostMapping("/classify")
    public ResponseEntity<String> classifyImage(@RequestParam("image") MultipartFile image) {
        try {
            String result = imageClassificationService.classifyImage(image);
            return ResponseEntity.ok(result);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing image.");
        }
    }
}
