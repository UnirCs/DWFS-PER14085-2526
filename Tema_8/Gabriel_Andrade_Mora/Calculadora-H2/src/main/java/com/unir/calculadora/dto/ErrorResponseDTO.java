package com.unir.calculadora.dto;

import java.time.LocalDateTime;

import lombok.*;

@Getter
public class ErrorResponseDTO {
    private int code;
    private String message;
    private LocalDateTime timestamp;

    // costructor personalizado
    public ErrorResponseDTO(int code, String message) {
        this.code = code;
        this.message = message;
        this.timestamp = LocalDateTime.now();
    }
}
