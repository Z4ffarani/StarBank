package com.starbank.services;

import com.starbank.DTO.StockDTO;
import com.starbank.DTO.UserDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class StockService {

    private final UserService userService;

    public StockService(UserService userService) {
        this.userService = userService;
    };

    private Optional<UserDTO> validateUser() {
        return userService.getLoggedUserRaw();
    };

    public ResponseEntity<Void> buyStock(StockDTO stock) {
        Optional<UserDTO> userOpt = validateUser();
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        };

        UserDTO user = userOpt.get();
        double totalCost = stock.getValue() * stock.getQuantity();

        if (user.getBalance() < totalCost) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        };

        user.setBalance(user.getBalance() - totalCost);
        return ResponseEntity.ok().build();
    };

    public ResponseEntity<Void> sellStock(StockDTO stock) {
        Optional<UserDTO> userOpt = validateUser();
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        };

        UserDTO user = userOpt.get();
        double totalCost = stock.getValue() * stock.getQuantity();

        user.setBalance(user.getBalance() + totalCost);
        return ResponseEntity.ok().build();
    };

    public ResponseEntity<Void> dividendYield(StockDTO stock) {
        Optional<UserDTO> userOpt = validateUser();
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    
        UserDTO user = userOpt.get();
        double dividendYield = (stock.getValue() * stock.getQuantity()) * stock.getDY();
        user.setBalance(user.getBalance() + dividendYield);
    
        return ResponseEntity.ok().build();
    }
};