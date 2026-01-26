package com.example.calculadora.service;

import com.example.calculadora.model.Operacion;
import com.example.calculadora.repository.OperacionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CalculadoraService {

    private final OperacionRepository operacionRepository;

    public CalculadoraService(OperacionRepository operacionRepository) {
        this.operacionRepository = operacionRepository;
    }

    public double sumar(Double a, Double b) {
        return a + b;
    }

    public double restar(List<Double> numeros) {
        return numeros.stream().reduce(0.0, (a, b) -> a - b);
    }

    public double multiplicar(Double a, Double b) {
        return a * b;
    }

    public double dividir(Double a, Double b) {
        if (b == 0) {
            throw new IllegalArgumentException("No se puede dividir por cero");
        }
        return a / b;
    }

    public double potencia(Double a, Double b) {
        return Math.pow(a, b);
    }

    public double raiz(Double a, Double b) {
        if (b == 0) {
            throw new IllegalArgumentException("Índice no puede ser cero");
        }
        return Math.pow(a, 1 / b);
    }

    public Optional<Operacion> obtenerOperacionPorId(Long id) {
        return operacionRepository.findById(id);
    }

    public Operacion guardarOperacion(Operacion operacion) {
        return operacionRepository.save(operacion);
    }
}
