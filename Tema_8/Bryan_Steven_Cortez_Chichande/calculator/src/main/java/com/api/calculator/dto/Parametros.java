package com.api.calculator.dto;

import jakarta.validation.constraints.Min;

/**
 *
 * @author Ryan-
 */
public record Parametros(
        @Min(1)
        Integer grado,
        Integer exponente
        ) {

}
