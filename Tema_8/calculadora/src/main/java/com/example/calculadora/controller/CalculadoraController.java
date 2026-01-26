package com.example.calculadora.controller;

import com.example.calculadora.model.Operacion;
import com.example.calculadora.service.CalculadoraService;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;

import java.util.List;

@RestController
@RequestMapping("/api/calculadora")
public class CalculadoraController {

    private final CalculadoraService service;

    public CalculadoraController(CalculadoraService service) {
        this.service = service;
    }

    // SUMA
    @GetMapping("/sumar")
    @Operation(
        operationId = "Sumar dos números",
        summary = "Suma de dos operandos",
        description = "Realiza la suma de dos números y guarda la operación en la base de datos."
    )
    @ApiResponse(
        responseCode = "200",
        description = "Operación realizada correctamente",
        content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = Operacion.class)
        )
    )
    public Operacion sumar(
        @RequestParam double a,
        @RequestParam double b) {

        return service.sumar(a, b);
    }


    // RESTA
    @GetMapping("/restar")
    @Operation(
            operationId = "Restar N elementos",
            summary = "Resta múltiples números",
            description = "Resta una lista de números (por ejemplo: 10 - 3 - 2) y guarda la operación."
    )
    @ApiResponse(
            responseCode = "200",
            description = "Resta realizada correctamente",
            content = @Content(
                    mediaType = "application/json",
                    schema = @Schema(implementation = Operacion.class)
            )
    )
    public Operacion restar(@RequestParam List<Double> valores) {
        return service.restar(valores);
    }


    // MULTIPLICAR
    @GetMapping("/multiplicar")
    @Operation(
            operationId = "Multiplicar dos números",
            summary = "Multiplicación",
            description = "Multiplica dos números y guarda la operación."
    )
    @ApiResponse(
            responseCode = "200",
            description = "Multiplicación realizada correctamente",
            content = @Content(
                    mediaType = "application/json",
                    schema = @Schema(implementation = Operacion.class)
            )
    )
    public Operacion multiplicar(@RequestParam double a, @RequestParam double b) {
        return service.multiplicar(a, b);
    }


    // DIVIDIR
    @GetMapping("/dividir")
    @Operation(
            operationId = "Dividir dos números",
            summary = "División",
            description = "Divide dos números y guarda la operación."
    )
    @ApiResponse(
            responseCode = "200",
            description = "División realizada correctamente",
            content = @Content(
                    mediaType = "application/json",
                    schema = @Schema(implementation = Operacion.class)
            )
    )
    public Operacion dividir(@RequestParam double a, @RequestParam double b) {
        return service.dividir(a, b);
    }


    // RAÍZ N-ÉSIMA
    @GetMapping("/raiz")
    @Operation(
            operationId = "Raíz N-ésima",
            summary = "Cálculo de raíz",
            description = "Calcula la raíz N-ésima de un número (por ejemplo, raíz cúbica de 8)."
    )
    @ApiResponse(
            responseCode = "200",
            description = "Raíz calculada correctamente",
            content = @Content(
                    mediaType = "application/json",
                    schema = @Schema(implementation = Operacion.class)
            )
    )
    public Operacion raiz(
            @RequestParam double numero,
            @RequestParam double indice) {

        return service.raiz(numero, indice);
    }


    // POTENCIA
    @GetMapping("/potencia")
    @Operation(
            operationId = "Potencia N-ésima",
            summary = "Cálculo de potencia",
            description = "Calcula la potencia N-ésima de un número (por ejemplo, 3 elevado a 3)."
    )
    @ApiResponse(
            responseCode = "200",
            description = "Potencia calculada correctamente",
            content = @Content(
                    mediaType = "application/json",
                    schema = @Schema(implementation = Operacion.class)
            )
    )
    public Operacion potencia(
            @RequestParam double base,
            @RequestParam double exponente) {

        return service.potencia(base, exponente);
    }

}
