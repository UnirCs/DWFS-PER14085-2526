package com.calculadora.calculadora.controller.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ErrorResponse {
    private boolean status;
    private String message;

    public static ErrorResponse error(String message) {
        return new ErrorResponse(false, message);
    }
}
