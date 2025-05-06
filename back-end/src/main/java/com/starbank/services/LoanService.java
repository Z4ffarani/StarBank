package com.starbank.services;

import com.starbank.DTO.LoanDTO;
import com.starbank.DTO.UserDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

@Service
public class LoanService {

    private final UserService userService;

    public LoanService(UserService userService) {
        this.userService = userService;
    };

    private Optional<UserDTO> validateUser() {
        return userService.getLoggedUserRaw();
    };

    public ResponseEntity<Map<String, Double>> requestLoan(LoanDTO loanDTO) {
        Optional<UserDTO> optionalUser = validateUser();
        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        };

        UserDTO user = optionalUser.get();

        double totalLoan = loanDTO.getValue() + (loanDTO.getValue() * (loanDTO.getIr() / 100));
        double monthlyInstallment = totalLoan / loanDTO.getMonths();

        user.setBalance(user.getBalance() + loanDTO.getValue());
        user.setLoan(user.getLoan() + totalLoan);

        loanDTO.setRemainingMonths(loanDTO.getMonths());
        user.setLoanInfo(loanDTO);

        return ResponseEntity.ok(Map.of("monthlyInstallment", monthlyInstallment));
    };

    public ResponseEntity<Void> repayLoan(double installment) {
        Optional<UserDTO> optionalUser = validateUser();
        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        };

        UserDTO user = optionalUser.get();

        if (installment <= 0 || user.getLoan() <= 0 || user.getLoanInfo() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        };

        LoanDTO loanDTO = user.getLoanInfo();
        double totalLoan = loanDTO.getValue() + (loanDTO.getValue() * (loanDTO.getIr() / 100));
        double monthlyInstallment = totalLoan / loanDTO.getMonths();

        if (installment + 0.01 < monthlyInstallment) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        };

        if (user.getLoan() <= monthlyInstallment) {
            user.setBalance(user.getBalance() - user.getLoan());
            user.setLoan(0);
            loanDTO.setRemainingMonths(0);
        } else {
            user.setBalance(user.getBalance() - monthlyInstallment);
            user.setLoan(user.getLoan() - monthlyInstallment);
            loanDTO.setRemainingMonths(loanDTO.getRemainingMonths() - 1);
        };

        return ResponseEntity.ok().build();
    };
};