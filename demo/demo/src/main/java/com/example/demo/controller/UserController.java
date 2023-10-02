package com.example.demo.controller;

import com.example.demo.model.Journal;
import com.example.demo.model.User;
import com.example.demo.service.JournalService;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user")
//@CrossOrigin("*")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody Map<String, String> credentials){
        return ResponseEntity.ok(userService.login(credentials.get("username"), credentials.get("password")));
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {
        // Perform any necessary validation on newUser here

        User registeredUser = userService.register(user);
        return ResponseEntity.ok(registeredUser);
    }

}
