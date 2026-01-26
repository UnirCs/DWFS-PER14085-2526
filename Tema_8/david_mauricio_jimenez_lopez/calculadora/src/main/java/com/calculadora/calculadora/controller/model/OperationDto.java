package com.calculadora.calculadora.controller.model;

import java.util.List;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class OperationDto {
    private Long id;
    private List<Integer> operands;
    private String operation;
    private Double result;
}
