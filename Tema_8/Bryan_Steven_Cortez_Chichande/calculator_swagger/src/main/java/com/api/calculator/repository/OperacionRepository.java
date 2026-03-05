package com.api.calculator.repository;

import com.api.calculator.model.Operacion;
import java.util.Optional;

/**
 *
 * @author Ryan-
 */
public interface OperacionRepository {
    Operacion save(Operacion op);
    Optional<Operacion> findById(String id);
}
