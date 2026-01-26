package com.example.calculadora.repository;

import com.example.calculadora.model.Operacion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OperacionRepository extends JpaRepository<Operacion, Long> {
}

