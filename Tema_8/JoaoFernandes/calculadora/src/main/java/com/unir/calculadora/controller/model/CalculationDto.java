// Java
package com.unir.calculadora.controller.model;

import java.time.LocalDateTime;
import java.util.List;

public class CalculationDto {
    private Long id;
    private String tipo;
    private List<Double> numeros;
    private Double result;
    private LocalDateTime createdAt;

    public CalculationDto() {}

    public CalculationDto(Long id, String tipo, List<Double> numeros, Double result, LocalDateTime createdAt) {
        this.id = id;
        this.tipo = tipo;
        this.numeros = numeros;
        this.result = result;
        this.createdAt = createdAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }

    public List<Double> getNumeros() { return numeros; }
    public void setNumeros(List<Double> numeros) { this.numeros = numeros; }

    public Double getResult() { return result; }
    public void setResult(Double result) { this.result = result; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
