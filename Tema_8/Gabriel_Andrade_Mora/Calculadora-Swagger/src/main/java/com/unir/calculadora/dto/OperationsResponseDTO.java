package com.unir.calculadora.dto;

import java.util.List;
import lombok.*;
import io.swagger.v3.oas.annotations.media.Schema;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OperationsResponseDTO {
    @Schema(description = "ID único de la operación", example = "1")
    private Long id;
    @Schema(description = "Tipo de operación realizada", example = "SUM")
    private String type;
    @Schema(description = "Argumentos utilizados", example = "[10, 5, 2]")
    private List<Integer> arguments;
    @Schema(description = "Resultado del cálculo", example = "17")
    private Integer result;
}
