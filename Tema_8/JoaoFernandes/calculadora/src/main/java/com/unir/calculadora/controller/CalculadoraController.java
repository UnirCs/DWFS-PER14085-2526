
package com.unir.calculadora.controller;

import com.unir.calculadora.controller.model.CreateCalculationRequest;
import com.unir.calculadora.controller.model.CalculationDto;
import com.unir.calculadora.data.model.Calculation;
import com.unir.calculadora.service.CalculadoraService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/operaciones")
@Tag(name = "Calculadora", description = "Operaciones de cálculo")
public class CalculadoraController {

    @Autowired
    private CalculadoraService service;

    @Operation(
            summary = "Listar cálculos",
            description = "Devuelve la lista de cálculos. Puede filtrar por tipo.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Lista devuelta",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = CalculationDto.class)))
            }
    )
    @GetMapping
    public ResponseEntity<List<CalculationDto>> list(
            @Parameter(description = "Tipo de operación para filtrar (ej: suma, resta, multiplicacion, division)", required = false)
            @RequestParam(required = false) String tipo) {
        List<Calculation> list = service.getCalculations(tipo);
        if (list == null) return ResponseEntity.ok().body(null);
        List<CalculationDto> dto = list.stream()
                .map(c -> new CalculationDto(c.getId(), c.getTipo(), c.getNumeros(), c.getResult(), c.getCreatedAt()))
                .collect(Collectors.toList());
        return ResponseEntity.ok(dto);
    }

    @Operation(
            summary = "Obtener cálculo por id",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Cálculo encontrado",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = CalculationDto.class))),
                    @ApiResponse(responseCode = "404", description = "No encontrado", content = @Content)
            }
    )
    @GetMapping("/{id}")
    public ResponseEntity<CalculationDto> get(
            @Parameter(description = "ID del cálculo", required = true) @PathVariable String id) {
        Calculation c = service.getCalculation(id);
        if (c == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(new CalculationDto(c.getId(), c.getTipo(), c.getNumeros(), c.getResult(), c.getCreatedAt()));
    }

    @Operation(
            summary = "Crear un nuevo cálculo",
            description = "Crea un cálculo a partir de los datos proporcionados.",
            responses = {
                    @ApiResponse(responseCode = "201", description = "Cálculo creado",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = CalculationDto.class))),
                    @ApiResponse(responseCode = "400", description = "Solicitud inválida", content = @Content)
            }
    )
    @io.swagger.v3.oas.annotations.parameters.RequestBody(
            description = "Datos para crear el cálculo",
            required = true,
            content = @Content(schema = @Schema(implementation = CreateCalculationRequest.class))
    )
    @PostMapping
    public ResponseEntity<CalculationDto> create(@RequestBody CreateCalculationRequest request) {
        Calculation c = service.createCalculation(request);
        if (c == null) return ResponseEntity.badRequest().build();
        return ResponseEntity.status(201).body(new CalculationDto(c.getId(), c.getTipo(), c.getNumeros(), c.getResult(), c.getCreatedAt()));
    }

    @Operation(
            summary = "Eliminar cálculo por id",
            responses = {
                    @ApiResponse(responseCode = "204", description = "Eliminado"),
                    @ApiResponse(responseCode = "404", description = "No encontrado", content = @Content)
            }
    )
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @Parameter(description = "ID del cálculo a eliminar", required = true) @PathVariable String id) {
        Boolean removed = service.removeCalculation(id);
        return removed ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
