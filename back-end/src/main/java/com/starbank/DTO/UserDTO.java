package com.starbank.DTO;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public class UserDTO {
    @Email
    @NotBlank(message = "E-mail is mandatory")
    private String email;

    @NotBlank(message = "Password is mandatory")
    private String password;

    private double balance;

    public UserDTO(String email, String password, double balance) {
        this.email = email;
        this.password = password;
        this.balance = balance;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }
}