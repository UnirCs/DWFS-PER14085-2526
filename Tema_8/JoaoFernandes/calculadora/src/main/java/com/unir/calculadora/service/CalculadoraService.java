package com.unir.calculadora.service;

import com.unir.calculadora.controller.model.CreateCalculationRequest;
import com.unir.calculadora.data.model.Calculation;
import java.util.List;

public interface CalculadoraService {
    List<Calculation> getCalculations(String operation);
    Calculation getCalculation(String id);
    Calculation createCalculation(CreateCalculationRequest request);
    Boolean removeCalculation(String id);
}
