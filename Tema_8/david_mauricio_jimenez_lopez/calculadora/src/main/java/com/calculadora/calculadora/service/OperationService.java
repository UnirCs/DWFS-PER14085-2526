package com.calculadora.calculadora.service;

import java.util.List;

import com.calculadora.calculadora.data.model.Operation;
import com.calculadora.calculadora.controller.model.CreateOperationRequest;

public interface OperationService {

    List<Operation> getOperations(String operation);

    List<Operation> getAllOperations();

    Operation getById(Long id);

    OperationResponse create(CreateOperationRequest operation);

}
