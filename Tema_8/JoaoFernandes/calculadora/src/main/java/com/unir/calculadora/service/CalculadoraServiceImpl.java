// java
package com.unir.calculadora.service;

import com.unir.calculadora.controller.model.CreateCalculationRequest;
import com.unir.calculadora.data.CalculationRepository;
import com.unir.calculadora.data.model.Calculation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;

@Service
public class CalculadoraServiceImpl implements CalculadoraService {

    @Autowired
    private CalculationRepository repository;

    @Override
    public List<Calculation> getCalculations(String operation) {
        if (StringUtils.hasLength(operation)) {
            return repository.findByTipoIgnoreCase(operation);
        }
        List<Calculation> list = repository.findAll();
        return list.isEmpty() ? null : list;
    }

    @Override
    public Calculation getCalculation(String id) {
        return repository.findById(Long.valueOf(id)).orElse(null);
    }

    @Override
    public Calculation createCalculation(CreateCalculationRequest request) {
        if (request == null || !StringUtils.hasLength(request.getTipo()) || request.getNumeros() == null || request.getNumeros().isEmpty()) {
            return null;
        }

        String tipo = request.getTipo().toLowerCase();
        List<Double> nums = request.getNumeros();

        Double result;

        switch (tipo) {
            case "suma":
            case "soma":
                result = 0.0;
                for (Double n : nums) result += n;
                break;

            case "resta":
            case "sub":
            case "restar":
                if (nums.isEmpty()) return null;
                result = nums.get(0);
                for (int i = 1; i < nums.size(); i++) result -= nums.get(i);
                break;

            case "multiplicacion":
            case "multiplicacao":
            case "mul":
                if (nums.size() != 2) return null;
                result = nums.get(0) * nums.get(1);
                break;

            case "division":
            case "div":
            case "dividir":
                if (nums.size() < 2) return null;
                if (nums.get(1) == 0) return null;
                result = nums.get(0) / nums.get(1);
                break;

            case "raiz":
            case "sqrt":
                if (nums.isEmpty()) return null;
                double a = nums.get(0);
                if (nums.size() == 1) {
                    if (a < 0) return null;
                    result = Math.sqrt(a);
                } else {
                    double n = nums.get(1);
                    if (n == 0) return null;
                    if (a < 0) {
                        double nRounded = Math.rint(n);
                        if (Math.abs(n - nRounded) < 1e-9 && ((long) nRounded) % 2 == 0) {
                            return null;
                        }
                    }
                    result = Math.pow(a, 1.0 / n);
                }
                break;

            case "potencia":
            case "pow":
                if (nums.size() < 2) return null;
                result = Math.pow(nums.get(0), nums.get(1));
                break;

            default:
                return null;
        }

        Calculation calc = new Calculation(tipo, nums, result);
        return repository.save(calc);
    }

    @Override
    public Boolean removeCalculation(String id) {
        Calculation calc = repository.findById(Long.valueOf(id)).orElse(null);
        if (calc != null) {
            repository.delete(calc);
            return Boolean.TRUE;
        }
        return Boolean.FALSE;
    }
}
