package com.calculadora.calculadora.service.calculator;

import java.util.List;

import org.springframework.stereotype.Component;

@Component
public class OperationCalculator {

    public CalculationResult calculateResult(String operation, List<Integer> operands) {
        if (operation == null || operands == null || operands.isEmpty()) {
            return CalculationResult.error("Parámetros inválidos para el cálculo");
        }

        String normalizedOperation = operation.trim().toUpperCase();

        try {
            switch (normalizedOperation) {
                case "SUM":
                    return calculateSum(operands);
                case "SUB":
                    return calculateSubtraction(operands);
                case "MUL":
                    return calculateMultiplication(operands);
                case "DIV":
                    return calculateDivision(operands);
                case "POW":
                    return calculatePower(operands);
                case "SQRT":
                    return calculateSquareRoot(operands);
                default:
                    return CalculationResult.error("Tipo de operación desconocido: " + operation);
            }
        } catch (Exception e) {
            return CalculationResult.error("Error al calcular " + operation + ": " + e.getMessage());
        }
    }

    private CalculationResult calculateSum(List<Integer> operands) {
        double result = operands.stream()
                .mapToDouble(Integer::doubleValue)
                .sum();
        return CalculationResult.success(result);
    }

    private CalculationResult calculateSubtraction(List<Integer> operands) {
        double result = operands.get(0).doubleValue();
        for (int i = 1; i < operands.size(); i++) {
            result -= operands.get(i);
        }
        return CalculationResult.success(result);
    }

    private CalculationResult calculateMultiplication(List<Integer> operands) {
        double result = operands.stream()
                .mapToDouble(Integer::doubleValue)
                .reduce(1.0, (a, b) -> a * b);
        return CalculationResult.success(result);
    }

    private CalculationResult calculateDivision(List<Integer> operands) {
        double result = operands.get(0).doubleValue();
        for (int i = 1; i < operands.size(); i++) {
            result /= operands.get(i);
        }
        return CalculationResult.success(result);
    }

    private CalculationResult calculatePower(List<Integer> operands) {
        if (operands.size() != 2) {
            return CalculationResult.error("POW requiere exactamente 2 operandos");
        }
        double base = operands.get(0).doubleValue();
        double exponent = operands.get(1).doubleValue();
        double result = Math.pow(base, exponent);
        return CalculationResult.success(result);
    }

    private CalculationResult calculateSquareRoot(List<Integer> operands) {
        if (operands.size() != 1) {
            return CalculationResult.error("SQRT requiere exactamente 1 operando");
        }
        double value = operands.get(0).doubleValue();
        if (value < 0) {
            return CalculationResult.error("SQRT requiere un operando no negativo");
        }
        double result = Math.sqrt(value);
        return CalculationResult.success(result);
    }
}
