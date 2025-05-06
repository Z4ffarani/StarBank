package com.starbank.controller;

import com.starbank.DTO.LoanDTO;
import com.starbank.services.LoanService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/loan")
public class LoanController {
    
    private final LoanService loanService;

    public LoanController(LoanService loanService) {
        this.loanService = loanService;
    };

    @PostMapping("/request")
    public ResponseEntity<?> requestLoan(@RequestBody LoanDTO dto) {
        return loanService.requestLoan(dto);
    };

    @PutMapping("/repay")
    public ResponseEntity<?> repayLoan(@RequestParam double installment) {
        return loanService.repayLoan(installment);
    };
};
