package com.starbank.services;

import com.starbank.DTO.UserDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final UserService userService;

    public AuthService(UserService userService) {
        this.userService = userService;
    };

    private Optional<UserDTO> validateUser(String email) {
        return userService.findByEmail(email);
    };

    public ResponseEntity<Void> login(UserDTO credentials) {
        Optional<UserDTO> userOpt = validateUser(credentials.getEmail());
        if (userOpt.isEmpty()) return ResponseEntity.status(HttpStatus.NOT_FOUND).build();

        UserDTO user = userOpt.get();
        if (!user.getPassword().equals(credentials.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        };

        user.setLogged(true);
        return ResponseEntity.ok().build();
    };

    public ResponseEntity<Void> changePassword(UserDTO credentials, String newPassword) {
        Optional<UserDTO> userOpt = validateUser(credentials.getEmail());
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        UserDTO user = userOpt.get();

        if (user.getPassword().equals(newPassword)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }

        user.setPassword(newPassword);
        return ResponseEntity.ok().build();
    }

    public ResponseEntity<Void> logout(String email) {
        Optional<UserDTO> userOpt = validateUser(email);
        if (userOpt.isPresent() && userOpt.get().isLogged()) {
            userOpt.get().setLogged(false);
            return ResponseEntity.ok().build();
        };
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    };
};