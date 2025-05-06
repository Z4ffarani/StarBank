package com.starbank.controller;

import com.starbank.DTO.UserDTO;
import com.starbank.services.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    };

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserDTO user) {
        return authService.login(user);
    };

    @PutMapping("/changePassword")
    public ResponseEntity<?> changePassword(@RequestBody UserDTO user, @RequestParam String newPassword) {
        return authService.changePassword(user, newPassword);
    };

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestBody UserDTO user) {
        return authService.logout(user.getEmail());
    };
};
