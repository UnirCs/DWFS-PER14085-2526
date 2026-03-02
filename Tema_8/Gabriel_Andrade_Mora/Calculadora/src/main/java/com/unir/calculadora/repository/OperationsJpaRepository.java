package com.unir.calculadora.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.unir.calculadora.entity.Operations;

public interface OperationsJpaRepository extends JpaRepository<Operations, Long> {

}
