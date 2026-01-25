package com.calculadora.calculadora.controller;

import java.util.List;
import java.util.Map;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import com.calculadora.calculadora.service.OperationService;
import com.calculadora.calculadora.controller.model.CreateOperationRequest;
import com.calculadora.calculadora.controller.model.ErrorResponse;
import com.calculadora.calculadora.service.OperationResponse;

@RestController
@RequiredArgsConstructor
@Slf4j // Clase de log
@Tag(name = "Calculadora Controller", description = "Microservicio encargado de exponer operaciones CRUD sobre operaciones matematicas alojadas en una base de datos en memoria.")
@RequestMapping("/api/v1")
public class CalculadoraController {

    private final OperationService operationService;

    @GetMapping("/operations")
    @Operation(operationId = "Obtener operaciones", description = "Operacion de lectura", summary = "Se devuelve una lista de todos los productos almacenados en la base de datos.")
    @ApiResponse(responseCode = "200", content = @Content(mediaType = "application/json", schema = @Schema(implementation = com.calculadora.calculadora.data.model.Operation.class)))

    public ResponseEntity<List<com.calculadora.calculadora.data.model.Operation>> getOperations(
            @RequestHeader Map<String, String> headers,
            @Parameter(name = "operation", description = "Nombre de la operacion. Soporta los valores sum, sub, mul, div", example = "sum", required = false)

            @RequestParam(required = false) String operation

    ) {
        log.info("Request received for getting operations with filter: {}", operation);

        // Determinar qué lista obtener según el parámetro
        List<com.calculadora.calculadora.data.model.Operation> operations;

        if (operation == null || operation.trim().isEmpty()) {
            operations = operationService.getAllOperations();
        } else {
            operations = operationService.getOperations(operation);
        }

        return ResponseEntity.ok(operations);
    }

    @GetMapping("/operations/{id}")
    @Operation(operationId = "Obtener operacion por id", description = "Operacion de lectura", summary = "Se devuelve una operacion almacenada en la base de datos.")
    @ApiResponse(responseCode = "200", content = @Content(mediaType = "application/json", schema = @Schema(implementation = com.calculadora.calculadora.data.model.Operation.class)))
    public ResponseEntity<com.calculadora.calculadora.data.model.Operation> getOperationById(
            @RequestHeader Map<String, String> headers,
            @PathVariable Long id) {
        log.info("Request received for getting operation by id: {}", id);
        com.calculadora.calculadora.data.model.Operation operation = operationService.getById(id);
        if (operation == null) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(operation);
        }
    }

    @PostMapping("/operations")
    @Operation(operationId = "Crear operacion", description = "Operacion de creacion", summary = "Se crea una operacion en la base de datos.", requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Datos de la operacion a crear.", required = true, content = @Content(mediaType = "application/json", schema = @Schema(implementation = CreateOperationRequest.class))))
    @ApiResponse(responseCode = "201", content = @Content(mediaType = "application/json", schema = @Schema(implementation = com.calculadora.calculadora.data.model.Operation.class)))
    @ApiResponse(responseCode = "400", content = @Content(mediaType = "application/json", schema = @Schema(implementation = com.calculadora.calculadora.controller.model.ErrorResponse.class)), description = "Datos incorrectos o error de validación.")

    public ResponseEntity<?> createOperation(@RequestBody CreateOperationRequest request) {

        OperationResponse response = operationService.create(request);

        if (response.isSuccess()) {
            return ResponseEntity.status(HttpStatus.CREATED).body(response.getOperation());
        } else {
            ErrorResponse errorResponse = ErrorResponse.error(response.getErrorMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
}
