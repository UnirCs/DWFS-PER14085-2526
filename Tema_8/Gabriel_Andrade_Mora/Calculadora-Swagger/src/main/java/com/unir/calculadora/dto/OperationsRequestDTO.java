package com.unir.calculadora.dto;

import lombok.*;
import java.util.List;
import io.swagger.v3.oas.annotations.media.Schema;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OperationsRequestDTO {
    @Schema(description = "Tipo de operación matemática", example = "SUM", allowableValues = { "SUM", "SUB", "MUL",
            "DIV", "POW", "ROOT" })
    private String type;
    @Schema(description = "Lista de números para la operación", example = "[10, 5, 2]")
    private List<Integer> arguments;
}
