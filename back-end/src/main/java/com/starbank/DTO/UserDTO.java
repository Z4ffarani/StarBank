package com.starbank.DTO;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public class UserDTO {
    @Email @NotBlank private String email;
    @NotBlank private String password;

    private double balance = 0.0;
    private boolean logged = false;
    private double loan = 0.0;
    private LoanDTO loanInfo;

    public UserDTO() {};

    public UserDTO(String email, String password) {
        this.email = email;
        this.password = password;
    };

    public String getEmail() { return email; };
    public void setEmail(String email) { this.email = email; };

    public String getPassword() { return password; };
    public void setPassword(String password) { this.password = password; };

    public double getBalance() { return balance; };
    public void setBalance(double balance) { this.balance = balance; };

    public boolean isLogged() { return logged; };
    public void setLogged(boolean logged) { this.logged = logged; };

    public double getLoan() { return loan; };
    public void setLoan(double loan) { this.loan = loan; };

    public LoanDTO getLoanInfo() { return loanInfo; };
    public void setLoanInfo(LoanDTO loanInfo) { this.loanInfo = loanInfo; };
};
