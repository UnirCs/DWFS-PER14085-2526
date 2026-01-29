package com.unir.calculadora.dto;

import lombok.*;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OperationsRequestDTO {
    private String type;
    private List<Integer> arguments;
}
