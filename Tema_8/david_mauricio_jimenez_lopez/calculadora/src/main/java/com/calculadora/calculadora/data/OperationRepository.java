package com.calculadora.calculadora.data;

import com.calculadora.calculadora.data.model.Operation;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class OperationRepository {
    private final OperationJpaRepository repository;

    public List<Operation> getOperations() {
        return repository.findAll();
    }

    public Operation getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Operation save(Operation operation) {
        return repository.save(operation);
    }

    public void delete(Operation operation) {
        repository.delete(operation);
    }

    public List<Operation> getByOperation(String operation) {
        return repository.findByOperation(operation);
    }

}
