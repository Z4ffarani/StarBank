package com.starbank.controller;

import com.starbank.DTO.UserDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private List<UserDTO> users = new ArrayList<>();
    
    @PostMapping
    public ResponseEntity<?> registerUser(@RequestBody UserDTO user) {
        for (UserDTO userDTO : users) {
            if (user.getEmail() != null && user.getEmail().equals(userDTO.getEmail())) {
                return ResponseEntity.status(409).body("E-mail already registered.");
            }
        }
    
        System.out.println("registerUser()");
        user.setBalance(1000);
        users.add(user);
        return ResponseEntity.ok("User registered.");
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody UserDTO loginRequest) {
        System.out.println("loginUser()");
        for (UserDTO user : users) {
            if (user.getEmail().equals(loginRequest.getEmail())) {
                if (user.getPassword().equals(loginRequest.getPassword())) {
                    return ResponseEntity.ok("User logged.");
                } else {
                    return ResponseEntity.status(401).body("Wrong password.");
                }
            }
        }
        return ResponseEntity.status(404).body("User not found.");
    }

    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        System.out.println("getAllUsers()");
        return ResponseEntity.ok(users);
    }
}
