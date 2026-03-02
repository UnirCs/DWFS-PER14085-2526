package com.calculadora.calculadora.data;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.calculadora.calculadora.data.model.Operation;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface OperationJpaRepository extends JpaRepository<Operation, Long>, JpaSpecificationExecutor<Operation> {
    List<Operation> findByOperation(String operation);
}
