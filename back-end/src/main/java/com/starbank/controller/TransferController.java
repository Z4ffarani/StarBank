package com.starbank.controller;

import com.starbank.DTO.TransferDTO;
import com.starbank.services.TransferService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/transfer")
public class TransferController {

    private final TransferService transferService;

    public TransferController(TransferService transferService) {
        this.transferService = transferService;
    };

    @PutMapping
    public ResponseEntity<?> transfer(@RequestBody TransferDTO transfer) {
        return transferService.transfer(transfer);
    };

    @PostMapping("/loan")
    public ResponseEntity<?> transferLoan(@RequestBody TransferDTO transfer) {
        return transferService.transferLoan(transfer);
    };

    @GetMapping
    public ResponseEntity<?> getTransfers() {
        return ResponseEntity.ok(transferService.getAllTransfers());
    };
};
