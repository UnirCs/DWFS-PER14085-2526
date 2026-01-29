package com.unir.calculadora.controller;

import com.unir.calculadora.dto.*;
import java.util.List;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import com.unir.calculadora.service.OperationsService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/operations")
@RequiredArgsConstructor
public class OperationsController {

    private final OperationsService service;

    // GET /operations
    @GetMapping
    public ResponseEntity<List<OperationsResponseDTO>> getAll() {
        return ResponseEntity.ok(service.getAll()); // 200
    }

    // GET /operations/{id}
    @GetMapping("/{id}")
    public ResponseEntity<OperationsResponseDTO> getById(@PathVariable Long id) {
        OperationsResponseDTO operation = service.getById(id);
        if (operation == null) {
            return ResponseEntity.notFound().build(); // 404
        } else {
            return ResponseEntity.ok(operation); // 200
        }
    }

    // POST /operations
    @PostMapping
    public ResponseEntity<?> create(@RequestBody OperationsRequestDTO dto) {
        // validacion que existan argumentos
        if (dto.getArguments() == null || dto.getArguments().isEmpty()) {
            return ResponseEntity.badRequest().body(new ErrorResponseDTO(400, "Los argumentos no pueden estar vacios")); // 400
        }
        // validacion minimo 2 argumentos
        if (dto.getArguments().size() < 2) {
            return ResponseEntity.badRequest().body(new ErrorResponseDTO(400, "Se requieren al menos 2 argumentos")); // 400
        }
        // validacion MUL, DIV, POW, ROOT tengan 2 argumentos
        String type = dto.getType().toUpperCase();
        if ((type.equals("MUL") || type.equals("DIV") || type.equals("POW") || type.equals("ROOT"))
                && dto.getArguments().size() != 2) {
            return ResponseEntity.badRequest()
                    .body(new ErrorResponseDTO(400, "Se requieren 2 argumentos para la operacion " + type)); // 400
        }
        // validacion division por 0
        if (type.equals("DIV") && dto.getArguments().get(1) == 0) {
            return ResponseEntity.badRequest().body(new ErrorResponseDTO(400, "No se puede dividir por 0")); // 400
        }
        return ResponseEntity.status(201).body(service.create(dto)); // 201
    }
}
