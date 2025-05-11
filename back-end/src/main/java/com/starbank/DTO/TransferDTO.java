package com.starbank.DTO;

import java.sql.Timestamp;

public class TransferDTO {
    private double amount;
    private String sender;
    private String recipient;
    private String password;
    private String message;
    private Timestamp date;

    public TransferDTO() {};

    public TransferDTO(double amount, String sender, String recipient, String message) {
        this.amount = amount;
        this.sender = sender;
        this.recipient = recipient;
        this.message = message;
        this.date = new Timestamp(System.currentTimeMillis());
    };

    public double getAmount() { return amount; };
    public void setAmount(double amount) { this.amount = amount; };

    public String getSender() { return sender; };
    public void setSender(String sender) { this.sender = sender; };

    public String getRecipient() { return recipient; };
    public void setRecipient(String recipient) { this.recipient = recipient; };

    public String getPassword() { return password; };
    public void setPassword(String password) { this.password = password; };

    public String getMessage() { return message; };
    public void setMessage(String message) { this.message = message; };

    public Timestamp getDate() { return date; };
    public void setDate(Timestamp date) { this.date = date; };
};