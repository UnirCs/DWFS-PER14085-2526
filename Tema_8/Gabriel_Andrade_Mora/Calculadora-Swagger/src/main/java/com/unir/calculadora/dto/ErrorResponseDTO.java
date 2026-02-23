package com.unir.calculadora.dto;

import java.time.LocalDateTime;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Getter
public class ErrorResponseDTO {
    @Schema(description = "Código de error HTTP", example = "400")
    private int code;
    @Schema(description = "Mensaje descriptivo del error", example = "Los argumentos no pueden estar vacíos")
    private String message;
    @Schema(description = "Fecha y hora del error", example = "2026-01-18T18:30:00")
    private LocalDateTime timestamp;

    // costructor personalizado
    public ErrorResponseDTO(int code, String message) {
        this.code = code;
        this.message = message;
        this.timestamp = LocalDateTime.now();
    }
}
