package com.starbank.services;

import com.starbank.DTO.UserDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserService {

    private final List<UserDTO> users = new ArrayList<>();

    public List<UserDTO> getAllUsers() {
        return users;
    };

    public Optional<UserDTO> findByEmail(String email) {
        return users.stream().filter(u -> u.getEmail().equals(email)).findFirst();
    };

    public Optional<UserDTO> getLoggedUserRaw() {
        return users.stream().filter(UserDTO::isLogged).findFirst();
    };

    private ResponseEntity<UserDTO> validateUser() {
        return getLoggedUserRaw()
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
    };

    public ResponseEntity<UserDTO> getLoggedUser() {
        return validateUser();
    };

    public ResponseEntity<Void> register(UserDTO user) {
        if (findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        };

        user.setBalance(1000);
        user.setLogged(false);
        users.add(user);
        return ResponseEntity.ok().build();
    };

    public ResponseEntity<Void> changeEmail(UserDTO user) {
        if (findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        };

        ResponseEntity<UserDTO> validationResponse = validateUser();
        if (!validationResponse.getStatusCode().is2xxSuccessful()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        };

        UserDTO loggedUser = validationResponse.getBody();
        if (loggedUser != null) {
            loggedUser.setEmail(user.getEmail());
            loggedUser.setLogged(false);
        };
        return ResponseEntity.ok().build();
    };

    public ResponseEntity<Void> resetWallet(UserDTO user) {
        ResponseEntity<UserDTO> validationResponse = validateUser();
        if (!validationResponse.getStatusCode().is2xxSuccessful()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        };

        UserDTO loggedUser = validationResponse.getBody();
        if (loggedUser != null) {
            loggedUser.setBalance(user.getBalance());
        };
        return ResponseEntity.ok().build();
    };

    public ResponseEntity<Void> deleteAccount() {
        ResponseEntity<UserDTO> validationResponse = validateUser();
        if (!validationResponse.getStatusCode().is2xxSuccessful()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        };

        UserDTO loggedUser = validationResponse.getBody();
        if (loggedUser != null) {
            users.remove(loggedUser);
        };
        return ResponseEntity.ok().build();
    };
};