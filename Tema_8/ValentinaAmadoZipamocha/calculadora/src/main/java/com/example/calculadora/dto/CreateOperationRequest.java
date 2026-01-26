package com.example.calculadora.dto;

public class CreateOperationRequest {

    private String tipo;
    private Double operando1;
    private Double operando2;

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public Double getOperando1() {
        return operando1;
    }

    public void setOperando1(Double operando1) {
        this.operando1 = operando1;
    }

    public Double getOperando2() {
        return operando2;
    }

    public void setOperando2(Double operando2) {
        this.operando2 = operando2;
    }
}
