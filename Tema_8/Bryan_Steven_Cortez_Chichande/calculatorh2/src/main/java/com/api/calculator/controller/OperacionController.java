package com.api.calculator.controller;

import com.api.calculator.dto.OperacionCreateRequest;
import com.api.calculator.dto.OperacionResponse;
import com.api.calculator.model.OperacionJPA;
import com.api.calculator.service.OperacionMapper;
import com.api.calculator.service.OperacionService;
import jakarta.validation.Valid;
import java.math.BigDecimal;
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
        OperacionJPA op = service.crear(request);
        return toResponse(op);
    }

    @GetMapping("/{id}")
    public OperacionResponse obtener(@PathVariable String id) {
        OperacionJPA op = service.obtener(id);
        return toResponse(op);
    }

    private OperacionResponse toResponse(OperacionJPA op) {
        return new OperacionResponse(
                op.getId(),
                op.getTipo(),
                OperacionMapper.fromCsv(op.getEntradasCsv()),
                OperacionMapper.fromJson(op.getParametrosJson()),
                normalize(op.getResultado()),
                op.getCreadoEn()
        );
    }

    private BigDecimal normalize(BigDecimal value) {
        if (value == null) {
            return null;
        }
        BigDecimal n = value.stripTrailingZeros();
        if (n.scale() < 0) {
            n = n.setScale(0);
        }
        return n;
    }
}
