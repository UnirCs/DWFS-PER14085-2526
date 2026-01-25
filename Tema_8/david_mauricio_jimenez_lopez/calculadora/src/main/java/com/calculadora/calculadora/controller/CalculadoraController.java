package com.calculadora.calculadora.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequiredArgsConstructor
@Slf4j // Clase de log
@Tag(name = "Calculadora Controller", description = "Microservicio encargado de exponer operaciones CRUD sobre operaciones matematicas alojadas en una base de datos en memoria.")
@RequestMapping("/api/v1")
public class CalculadoraController {

    @GetMapping("/operations")
    @Operation(operationId = "Obtener operaciones", description = "Operacion de lectura", summary = "Se devuelve una lista de todos los productos almacenados en la base de datos.")
    @ApiResponse(responseCode = "200", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Operation.class)))
    public String suma() {
        return "Suma";
    }
}
