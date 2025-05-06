package com.starbank.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;

public class StockDTO {
    private String name;
    private double value;
    private int quantity;

    @JsonProperty("DY")
    private double DY;

    public StockDTO() {};

    public String getName() { return name; };
    public void setName(String name) { this.name = name; };

    public double getValue() { return value; };
    public void setValue(double value) { this.value = value; };

    public int getQuantity() { return quantity; };
    public void setQuantity(int quantity) { this.quantity = quantity; };

    public double getDY() { return DY; };
    public void setDY(double DY) { this.DY = DY; };
};
