package com.unir.calculadora.repository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import com.unir.calculadora.entity.Operations;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class OperationsRepository {

    private final OperationsJpaRepository jpaRepository;

    // Get all
    public List<Operations> getAll() {
        return jpaRepository.findAll();
    }

    // Get by id
    public Operations getById(Long id) {
        return jpaRepository.findById(id).orElse(null);
    }

    // Create
    public Operations create(Operations operation) {
        return jpaRepository.save(operation);
    }

}
