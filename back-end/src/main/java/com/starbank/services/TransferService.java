package com.starbank.services;

import com.starbank.DTO.TransferDTO;
import com.starbank.DTO.UserDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.*;

@Service
public class TransferService {

    private final UserService userService;
    private final List<TransferDTO> transfers = new ArrayList<>();

    public TransferService(UserService userService) {
        this.userService = userService;
    };

    private Optional<UserDTO> validateUser() {
        return userService.getLoggedUserRaw();
    };

    public ResponseEntity<Void> transfer(TransferDTO transfer) {
        Optional<UserDTO> senderOpt = validateUser();
        if (senderOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        };

        UserDTO sender = senderOpt.get();
        Optional<UserDTO> recipientOpt = userService.findByEmail(transfer.getRecipient());
        if (recipientOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        };

        UserDTO recipient = recipientOpt.get();
        if (sender.getBalance() < transfer.getAmount()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        };

        if (sender.getEmail().equals(transfer.getRecipient()) || recipient.getEmail().equals(transfer.getSender())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        };

        transfer.setSender(sender.getEmail());
        sender.setBalance(sender.getBalance() - transfer.getAmount());
        recipient.setBalance(recipient.getBalance() + transfer.getAmount());
        transfer.setDate(new Timestamp(System.currentTimeMillis()));
        transfers.add(transfer);
        return ResponseEntity.ok().build();
    };

    public ResponseEntity<Void> transferLoan(TransferDTO transfer) {
        Optional<UserDTO> senderOpt = validateUser();
        if (senderOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        };

        transfer.setRecipient(senderOpt.get().getEmail());
        transfer.setDate(new Timestamp(System.currentTimeMillis()));
        transfers.add(transfer);
        return ResponseEntity.ok().build();
    };

    public ResponseEntity<Void> transferStock(TransferDTO transfer) {
        Optional<UserDTO> senderOpt = validateUser();
        if (senderOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        };

        transfer.setDate(new Timestamp(System.currentTimeMillis()));
        transfers.add(transfer);
        return ResponseEntity.ok().build();
    };

    public List<TransferDTO> getAllTransfers() {
        return transfers.stream()
                .sorted(Comparator.comparing(TransferDTO::getDate).reversed())
                .toList();
    };
};