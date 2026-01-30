package com.example.calculadora.controller;

import com.example.calculadora.dto.CreateOperationRequest;
import com.example.calculadora.model.Operacion;
import com.example.calculadora.service.CalculadoraService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/operations")
public class OperationController {

    private final CalculadoraService calculadoraService;

    public OperationController(CalculadoraService calculadoraService) {
        this.calculadoraService = calculadoraService;
    }

    
    @PostMapping
    public ResponseEntity<Operacion> crearOperacion(
            @RequestBody CreateOperationRequest request) {

        double resultado;

        switch (request.getTipo().toUpperCase()) {
            case "SUMA":
                resultado = calculadoraService.sumar(
                        request.getOperando1(),
                        request.getOperando2()
                );
                break;

            case "RESTA":
                resultado = calculadoraService.restar(
                        List.of(request.getOperando1(), request.getOperando2())
                );
                break;

            case "MULTIPLICACION":
                resultado = calculadoraService.multiplicar(
                        request.getOperando1(),
                        request.getOperando2()
                );
                break;

            case "DIVISION":
                resultado = calculadoraService.dividir(
                        request.getOperando1(),
                        request.getOperando2()
                );
                break;

            case "POTENCIA":
                resultado = calculadoraService.potencia(
                        request.getOperando1(),
                        request.getOperando2()
                );
                break;

            case "RAIZ":
                resultado = calculadoraService.raiz(
                        request.getOperando1(),
                        request.getOperando2()
                );
                break;

            default:
                return ResponseEntity.badRequest().build();
        }

        Operacion operacion = new Operacion();
        operacion.setTipo(request.getTipo());
        operacion.setOperando1(request.getOperando1());
        operacion.setOperando2(request.getOperando2());
        operacion.setResultado(resultado);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(calculadoraService.guardarOperacion(operacion));
    }


    @GetMapping("/{id}")
    public ResponseEntity<Operacion> obtenerOperacionPorId(@PathVariable Long id) {
        return calculadoraService.obtenerOperacionPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
