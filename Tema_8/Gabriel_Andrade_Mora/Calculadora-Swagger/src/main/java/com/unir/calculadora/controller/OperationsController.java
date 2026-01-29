package com.unir.calculadora.controller;

import com.unir.calculadora.dto.*;
import java.util.List;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import com.unir.calculadora.service.OperationsService;
import lombok.RequiredArgsConstructor;
import io.swagger.v3.oas.annotations.*;
import io.swagger.v3.oas.annotations.responses.*;
import io.swagger.v3.oas.annotations.media.*;
import io.swagger.v3.oas.annotations.tags.*;

@Tag(name = "Operations", description = "API de operaciones matematicas de la calculadora")
@RestController
@RequestMapping("/operations")
@RequiredArgsConstructor
public class OperationsController {

    private final OperationsService service;

    // GET /operations
    @Operation(summary = "Obtener todas las operaciones", description = "Devuelve la lista completa de operaciones realizadas en la calculadora")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Lista de operaciones obtenida exitosamente", content = @Content(mediaType = "application/json", schema = @Schema(implementation = OperationsResponseDTO.class)))
    })
    @GetMapping
    public ResponseEntity<List<OperationsResponseDTO>> getAll() {
        return ResponseEntity.ok(service.getAll()); // 200
    }

    // GET /operations/{id}
    @Operation(summary = "Obtener operacion por ID", description = "Busca y retorna una operacion especifica por su identificador")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Operacion encontrada", content = @Content(mediaType = "application/json", schema = @Schema(implementation = OperationsResponseDTO.class))),
            @ApiResponse(responseCode = "404", description = "Operacion no encontrada", content = @Content)
    })
    @GetMapping("/{id}")
    public ResponseEntity<OperationsResponseDTO> getById(@PathVariable Long id) {
        OperationsResponseDTO operation = service.getById(id);
        if (operation == null) {
            return ResponseEntity.notFound().build(); // 404
        } else {
            return ResponseEntity.ok(operation); // 200
        }
    }

    // POST /operations
    @Operation(summary = "Crear nueva operacion", description = "Realiza un calculo matematico (SUM, SUB, MUL, DIV, POW, ROOT) y guarda el resultado", requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Datos de la operacion a realizar", required = true, content = @Content(mediaType = "application/json", schema = @Schema(implementation = OperationsRequestDTO.class))))
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Operacion creada exitosamente", content = @Content(mediaType = "application/json", schema = @Schema(implementation = OperationsResponseDTO.class))),
            @ApiResponse(responseCode = "400", description = "Datos invalidos (argumentos vacios, division por cero, etc.)", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponseDTO.class)))
    })
    @PostMapping
    public ResponseEntity<?> create(@RequestBody OperationsRequestDTO dto) {
        // validacion que existan argumentos
        if (dto.getArguments() == null || dto.getArguments().isEmpty()) {
            return ResponseEntity.badRequest().body(new ErrorResponseDTO(400, "Los argumentos no pueden estar vacios")); // 400
        }
        // validacion minimo 2 argumentos
        if (dto.getArguments().size() < 2) {
            return ResponseEntity.badRequest().body(new ErrorResponseDTO(400, "Se requieren al menos 2 argumentos")); // 400
        }
        // validacion MUL, DIV, POW, ROOT tengan 2 argumentos
        String type = dto.getType().toUpperCase();
        if ((type.equals("MUL") || type.equals("DIV") || type.equals("POW") || type.equals("ROOT"))
                && dto.getArguments().size() != 2) {
            return ResponseEntity.badRequest()
                    .body(new ErrorResponseDTO(400, "Se requieren 2 argumentos para la operacion " + type)); // 400
        }
        // validacion division por 0
        if (type.equals("DIV") && dto.getArguments().get(1) == 0) {
            return ResponseEntity.badRequest().body(new ErrorResponseDTO(400, "No se puede dividir por 0")); // 400
        }
        return ResponseEntity.status(201).body(service.create(dto)); // 201
    }
}
