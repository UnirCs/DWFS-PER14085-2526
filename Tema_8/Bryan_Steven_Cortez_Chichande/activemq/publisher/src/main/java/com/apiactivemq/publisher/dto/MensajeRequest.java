package com.apiactivemq.publisher.dto;

import jakarta.validation.constraints.NotBlank;

/**
 *
 * @author Ryan-
 */
public record MensajeRequest(
        @NotBlank
        String autor,
        @NotBlank
        String contenido
        ) {

}
