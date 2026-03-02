package com.api.calculator.controller;

import com.api.calculator.dto.OperacionCreateRequest;
import com.api.calculator.dto.OperacionResponse;
import com.api.calculator.model.Operacion;
import com.api.calculator.service.OperacionService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Ryan-
 */

@RestController
@RequestMapping("/v1/operaciones")
public class OperacionController {
    private final OperacionService service;

    public OperacionController(OperacionService service) {
        this.service = service;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public OperacionResponse crear(@Valid @RequestBody OperacionCreateRequest request) {
        Operacion op = service.crear(request);
        return toResponse(op);
    }

    @GetMapping("/{id}")
    public OperacionResponse obtener(@PathVariable String id) {
        Operacion op = service.obtener(id);
        return toResponse(op);
    }

    private OperacionResponse toResponse(Operacion op) {
        return new OperacionResponse(
                op.id(),
                op.tipo(),
                op.entradas(),
                op.parametros(),
                op.resultado(),
                op.creadoEn()
        );
    }
}
