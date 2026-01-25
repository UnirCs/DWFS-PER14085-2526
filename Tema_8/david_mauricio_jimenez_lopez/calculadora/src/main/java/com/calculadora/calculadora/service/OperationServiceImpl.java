package com.calculadora.calculadora.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import lombok.extern.slf4j.Slf4j;

import com.calculadora.calculadora.data.OperationRepository;
import com.calculadora.calculadora.controller.model.CreateOperationRequest;
import com.calculadora.calculadora.data.model.Operation;
import com.calculadora.calculadora.service.validator.OperationValidator;
import com.calculadora.calculadora.service.validator.ValidationResult;
import com.calculadora.calculadora.service.calculator.OperationCalculator;
import com.calculadora.calculadora.service.calculator.CalculationResult;

/**
 * Implementación del servicio de operaciones.
 * Orquesta la lógica de negocio delegando validaciones y cálculos a componentes
 * especializados.
 */
@Service
@Slf4j
public class OperationServiceImpl implements OperationService {

    @Autowired
    private OperationRepository operationRepository;

    @Autowired
    private OperationValidator operationValidator;

    @Autowired
    private OperationCalculator operationCalculator;

    @Override
    public List<Operation> getOperations(String operation) {
        return operationRepository.getByOperation(operation);
    }

    @Override
    public List<Operation> getAllOperations() {
        return operationRepository.getOperations();
    }

    @Override
    public Operation getById(Long id) {
        return operationRepository.getById(id);
    }

    @Override
    public OperationResponse create(CreateOperationRequest request) {

        // Validaciónes de entrada de datos
        if (request == null) {
            return OperationResponse.error("El request no puede ser nulo");
        }

        if (request.getOperation() == null || request.getOperation().trim().isEmpty()) {
            return OperationResponse.error("El tipo de operación no puede ser nulo o vacío");
        }

        if (request.getOperands() == null || request.getOperands().isEmpty()) {
            return OperationResponse.error("La lista de operandos no puede ser nula o vacía");
        }

        // Validaciónes matematicaSusando
        ValidationResult operationValidation = operationValidator.isValidOperation(request.getOperation());
        if (operationValidation.hasError()) {
            log.error("Mensaje de error capturado a devolver en la api ", operationValidation.getMessage());
            return OperationResponse.error(operationValidation.getMessage());
        }

        String operationType = request.getOperation().trim().toUpperCase();
        List<Integer> operands = request.getOperands();

        ValidationResult operandsValidation = operationValidator.validateOperands(operationType, operands);
        if (operandsValidation.hasError()) {
            log.error("Mensaje de error capturado a devolver en la api ", operationValidation.getMessage());
            return OperationResponse.error(operandsValidation.getMessage());
        }

        // Validar división por cero si es necesario
        if ("DIV".equals(operationType)) {
            ValidationResult divisionValidation = operationValidator.validateDivisionByZero(operands);
            if (divisionValidation.hasError()) {
                log.error("Mensaje de error capturado a devolver en la api ", divisionValidation.getMessage());
                return OperationResponse.error(divisionValidation.getMessage());
            }
        }

        // Se calculan los reusltados en CalculationReuslt
        CalculationResult calculationResult = operationCalculator.calculateResult(operationType, operands);
        if (calculationResult.hasError()) {
            log.error("Calculation error: {}", calculationResult.getMessage());
            return OperationResponse.error(calculationResult.getMessage());
        }

        log.info("El resultado es", calculationResult.getResult());

        Operation operation = Operation.builder()
                .operands(operands)
                .operation(operationType)
                .result(calculationResult.getResult())
                .build();

        Operation savedOperation = operationRepository.save(operation);
        log.info("Todo bien", savedOperation.getId());

        return OperationResponse.success(savedOperation);
    }
}
