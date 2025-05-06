package com.starbank.controller;

import com.starbank.DTO.UserDTO;
import com.starbank.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    };

    @PostMapping
    public ResponseEntity<?> register(@RequestBody UserDTO user) {
        return userService.register(user);
    };

    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    };

    @GetMapping("/me")
    public ResponseEntity<?> getLoggedUser() {
        return userService.getLoggedUser();
    };

    @PutMapping("/emailChange")
    public ResponseEntity<?> changeEmail(@RequestBody UserDTO user) {
        return userService.changeEmail(user);
    };

    @PutMapping("/resetWallet")
    public ResponseEntity<?> resetWallet(@RequestBody UserDTO user) {
        return userService.resetWallet(user);
    };

    @DeleteMapping("/deleteAccount")
    public ResponseEntity<?> deleteAccount() {
        return userService.deleteAccount();
    };
};
