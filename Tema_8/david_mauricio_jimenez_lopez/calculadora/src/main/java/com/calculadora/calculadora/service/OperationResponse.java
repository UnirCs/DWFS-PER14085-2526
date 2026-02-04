package com.calculadora.calculadora.service;

import com.calculadora.calculadora.data.model.Operation;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OperationResponse {
    private boolean success;
    private Operation operation;
    private String errorMessage;

    public static OperationResponse success(Operation operation) {
        return new OperationResponse(true, operation, null);
    }

    public static OperationResponse error(String errorMessage) {
        return new OperationResponse(false, null, errorMessage);
    }

    public boolean isSuccess() {
        return success;
    }

    public boolean hasError() {
        return !success;
    }
}
