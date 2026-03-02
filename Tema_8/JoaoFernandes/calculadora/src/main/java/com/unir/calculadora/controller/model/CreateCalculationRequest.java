// Java
package com.unir.calculadora.controller.model;

import java.util.List;

public class CreateCalculationRequest {
    private String tipo; // ex: suma, resta, multiplicacion, division, raiz, potencia
    private List<Double> numeros;

    public CreateCalculationRequest() {}

    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }

    public List<Double> getNumeros() { return numeros; }
    public void setNumeros(List<Double> numeros) { this.numeros = numeros; }
}
