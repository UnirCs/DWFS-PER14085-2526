package com.api.calculator.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;

/**
 *
 * @author Ryan-
 */
public record Parametros(
        @Schema(example = "3", description = "Grado de la raíz (RAIZ). Ejemplo: 2 (cuadrada), 3 (cúbica)")
        Integer grado,
        @Schema(example = "3", description = "Exponente (POTENCIA). Ejemplo: 2, 3, 4")
        Integer exponente
        ) {

}
