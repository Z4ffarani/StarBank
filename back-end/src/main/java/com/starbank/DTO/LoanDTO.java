package com.starbank.DTO;

public class LoanDTO {
    private double value;
    private double ir;
    private int months;
    private int remainingMonths;

    public LoanDTO() {};

    public double getValue() { return value; };
    public void setValue(double value) { this.value = value; };

    public double getIr() { return ir; };
    public void setIr(double ir) { this.ir = ir; };

    public int getMonths() { return months; };
    public void setMonths(int months) { this.months = months; this.remainingMonths = months; };

    public int getRemainingMonths() { return remainingMonths; };
    public void setRemainingMonths(int remainingMonths) { this.remainingMonths = remainingMonths; };
};
