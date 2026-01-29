package com.unir.calculadora.dto;

import java.util.List;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OperationsResponseDTO {
    private Long id;
    private String type;
    private List<Integer> arguments;
    private Integer result;
}
