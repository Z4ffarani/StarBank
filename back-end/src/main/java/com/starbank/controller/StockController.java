package com.starbank.controller;

import com.starbank.DTO.StockDTO;
import com.starbank.services.StockService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/stock")
public class StockController {

    private final StockService stockService;

    public StockController(StockService stockService) {
        this.stockService = stockService;
    };

    @PostMapping("/buy")
    public ResponseEntity<?> buyStocks(@RequestBody StockDTO stock) {
        return stockService.buyStock(stock);
    };

    @PostMapping("/sell")
    public ResponseEntity<?> sellStocks(@RequestBody StockDTO stock) {
        return stockService.sellStock(stock);
    };

    @PutMapping("/DY")
    public ResponseEntity<?> dividendYield(@RequestBody StockDTO stock) {
        return stockService.dividendYield(stock);
    };
};
