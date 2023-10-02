package com.example.demo.service;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepo;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class UserService {
    private final UserRepo userRepo;


    public UserService(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    public User login(String username, String password) {
        User user = userRepo.findByUsername(username);

        if (user != null) {
            if (user.getPassword().equals(password)) {
                return user;
            }
        }
        return null;
    }

    public User findById(Long id) {
        return userRepo.findAllById(id);
    }

    public User register(User user) {
        // Checking if the username is already taken
        if (userRepo.existsByUsername(user.getUsername())) {
            throw new IllegalArgumentException("Username is already taken");
        }

        return userRepo.save(user);
    }
}
