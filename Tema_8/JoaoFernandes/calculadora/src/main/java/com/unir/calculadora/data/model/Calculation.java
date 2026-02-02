// java
package com.unir.calculadora.data.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "calculations")
public class Calculation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String tipo; // ex: suma, resta, multiplicacion, division, raiz, potencia

    @ElementCollection
    @CollectionTable(name = "calculation_numbers", joinColumns = @JoinColumn(name = "calculation_id"))
    @Column(name = "number")
    private List<Double> numeros = new ArrayList<>();

    private Double result;

    private LocalDateTime createdAt = LocalDateTime.now();

    public Calculation() {}

    public Calculation(String tipo, List<Double> numeros, Double result) {
        this.tipo = tipo;
        this.numeros = numeros;
        this.result = result;
    }

    public Long getId() { return id; }

    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }

    public List<Double> getNumeros() { return numeros; }
    public void setNumeros(List<Double> numeros) { this.numeros = numeros; }

    public Double getResult() { return result; }
    public void setResult(Double result) { this.result = result; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
