package com.calculadora.calculadora.service.validator;

import java.util.List;

import org.springframework.stereotype.Component;

@Component
public class OperationValidator {

    private static final String[] VALID_OPERATIONS = { "SUM", "SUB", "MUL", "DIV", "POW", "SQRT" };

    public ValidationResult isValidOperation(String operation) {
        if (operation == null || operation.trim().isEmpty()) {
            return ValidationResult.error("El tipo de operación no puede ser nulo o vacío");
        }

        String normalizedOperation = operation.trim().toUpperCase();
        for (String validOp : VALID_OPERATIONS) {
            if (validOp.equals(normalizedOperation)) {
                return ValidationResult.success();
            }
        }

        return ValidationResult.error(
                "Ni idea sumerce que quiere hacer con '" + operation
                        + "'. Las operaciones validas son: SUM, SUB, MUL, DIV, POW, SQRT");
    }

    public ValidationResult validateOperands(String operation, List<Integer> operands) {
        if (operands == null || operands.isEmpty()) {
            return ValidationResult.error("Que vas a operar si no pones nada");
        }

        String normalizedOperation = operation.trim().toUpperCase();

        switch (normalizedOperation) {
            case "SQRT":
                return validateSqrtOperands(operands);
            case "POW":
                return validatePowOperands(operands);
            case "SUM":
            case "SUB":
            case "MUL":
            case "DIV":
                return validateBasicOperationOperands(normalizedOperation, operands);
            default:
                return ValidationResult.error("Ni idea sumerce que quiere hacer: " + operation);
        }
    }

    private ValidationResult validateSqrtOperands(List<Integer> operands) {
        if (operands.size() != 1) {
            return ValidationResult.error(
                    "SQRT raiz cuadrada de  " + operands.size() + " operandos? estas demente?");
        }
        if (operands.get(0) < 0) {
            return ValidationResult.error(
                    "raiz d eun negativo? estas a lo bien?!!! se recibió: " + operands.get(0));
        }
        return ValidationResult.success();
    }

    private ValidationResult validatePowOperands(List<Integer> operands) {
        if (operands.size() != 2) {
            return ValidationResult.error(
                    "Por si no sabia la potencia solo necesita 2 números!! base y exponente, pero se recibieron "
                            + operands.size() + " números avispado");
        }
        return ValidationResult.success();
    }

    private ValidationResult validateBasicOperationOperands(String operation, List<Integer> operands) {
        if (operands.size() < 2) {
            return ValidationResult.error(
                    operation + " requiere al menos 2 operandos, pero se recibieron " + operands.size());
        }
        return ValidationResult.success();
    }

    public ValidationResult validateDivisionByZero(List<Integer> operands) {
        if (operands == null || operands.size() < 2) {
            return ValidationResult.success();
        }

        for (int i = 1; i < operands.size(); i++) {
            if (operands.get(i) == 0) {
                return ValidationResult.error(
                        "Tambien quiere que llueva para arriba? División por cero detectada en la posición " + i
                                + ". El divisor no puede ser 0");
            }
        }
        return ValidationResult.success();
    }
}
