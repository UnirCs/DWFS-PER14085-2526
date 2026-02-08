package com.calculadora.calculadora.service.calculator;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CalculationResult {
    private boolean success;
    private Double result;
    private String message;

    public static CalculationResult success(Double result) {
        return new CalculationResult(true, result, null);
    }

    public static CalculationResult error(String message) {
        return new CalculationResult(false, null, message);
    }

    public boolean isSuccess() {
        return success;
    }

    public boolean hasError() {
        return !success;
    }
}
