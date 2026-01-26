package com.example.calculadora.service;

import com.example.calculadora.model.Operacion;
import com.example.calculadora.repository.OperacionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CalculadoraService {

    private final OperacionRepository repository;

    public CalculadoraService(OperacionRepository repository) {
        this.repository = repository;
    }

    // SUMAR N ELEMENTOS
    public Operacion sumar(double a, double b) {
        return guardar("SUMA", a, b, a + b);
    }

    // RESTAR N ELEMENTOS
    public Operacion restar(List<Double> valores) {
        double resultado = valores.get(0);
        for (int i = 1; i < valores.size(); i++) {
            resultado -= valores.get(i);
        }
        return guardar("RESTA_N", valores.get(0), valores.size(), resultado);
    }

    // MULTIPLICAR 2 ELEMENTOS
    public Operacion multiplicar(double a, double b) {
        return guardar("MULTIPLICACION", a, b, a * b);
    }

    // DIVIDIR 2 ELEMENTOS
    public Operacion dividir(double a, double b) {
        if (b == 0) {
            throw new IllegalArgumentException("No se puede dividir entre cero");
        }
        return guardar("DIVISION", a, b, a / b);
    }

    // RAÍZ N-ÉSIMA
    public Operacion raiz(double numero, double indice) {
        double resultado = Math.pow(numero, 1 / indice);
        return guardar("RAIZ_" + indice, numero, indice, resultado);
    }

    // POTENCIA N-ÉSIMA
    public Operacion potencia(double base, double exponente) {
        double resultado = Math.pow(base, exponente);
        return guardar("POTENCIA", base, exponente, resultado);
    }

    // MÉTODO COMÚN
    private Operacion guardar(String tipo, double a, double b, double resultado) {
        Operacion op = new Operacion();
        op.setTipo(tipo);
        op.setOperando1(a);
        op.setOperando2(b);
        op.setResultado(resultado);
        return repository.save(op);
    }
}
