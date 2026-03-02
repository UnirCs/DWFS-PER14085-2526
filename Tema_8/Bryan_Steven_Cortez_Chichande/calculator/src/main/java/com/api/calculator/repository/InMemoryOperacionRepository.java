package com.api.calculator.repository;

import com.api.calculator.model.Operacion;
import org.springframework.stereotype.Repository;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

/**
 *
 * @author Ryan-
 */

@Repository
public class InMemoryOperacionRepository implements OperacionRepository{
    private final Map<String, Operacion> store = new ConcurrentHashMap<>();

    @Override
    public Operacion save(Operacion op) {
        store.put(op.id(), op);
        return op;
    }

    @Override
    public Optional<Operacion> findById(String id) {
        return Optional.ofNullable(store.get(id));
    }
}
