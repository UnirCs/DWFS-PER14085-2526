package com.unir.calculadora.service;

import com.unir.calculadora.dto.*;
import com.unir.calculadora.repository.OperationsRepository;
import com.unir.calculadora.entity.Operations;
import lombok.RequiredArgsConstructor;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OperationsServiceImpl implements OperationsService {

    private final OperationsRepository repository;

    // GET /operations
    @Override
    public List<OperationsResponseDTO> getAll() {
        return repository.getAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    // GET /operations/{id}
    @Override
    public OperationsResponseDTO getById(Long id) {
        Operations operation = repository.getById(id);
        if (operation == null) {
            return null; // El Controller maneja el 404
        }
        return toDTO(operation);
    }

    // POST /operations
    @Override
    public OperationsResponseDTO create(OperationsRequestDTO dto) {
        // calcula el resultado
        Integer result = calculate(dto.getType(), dto.getArguments());

        // convierte a entity y asigna resultado
        Operations operation = toEntity(dto);
        operation.setResult(result);

        // guarda y retorna dto
        return toDTO(repository.create(operation));
    }

    // METODOS DE CONVERSION
    // convierte Operations a OperationsResponseDTO
    private OperationsResponseDTO toDTO(Operations operation) {
        // convierte la cadena de argumentos a una lista de enteros
        List<Integer> arguments = Arrays.stream(operation.getArguments().split(","))
                .map(Integer::parseInt) // convierte cada elemento a Integer
                .collect(Collectors.toList()); // recopila los elementos en una lista
        return new OperationsResponseDTO(operation.getId(),
                operation.getType(),
                arguments,
                operation.getResult());
    }

    // convierte OperationsRequestDTO a Operations
    private Operations toEntity(OperationsRequestDTO dto) {
        // convierte la lista de argumentos a una cadena separada por comas
        String argumentsString = dto.getArguments().stream()
                .map(String::valueOf) // convierte cada elemento a String
                .collect(Collectors.joining(",")); // recopila los elementos en una cadena separada por comas
        return new Operations(dto.getType(), argumentsString);
    }

    // METODO PARA CALCULAR
    private Integer calculate(String type, List<Integer> arguments) {
        return switch (type.toUpperCase()) {
            case "SUM" -> arguments.stream().mapToInt(Integer::intValue).sum();
            case "SUB" -> arguments.stream().reduce((a, b) -> a - b).orElse(0);
            case "MUL" -> arguments.get(0) * arguments.get(1);
            case "DIV" -> arguments.get(0) / arguments.get(1);
            case "POW" -> (int) Math.pow(arguments.get(0), arguments.get(1));
            case "ROOT" -> (int) Math.pow(arguments.get(0), 1.0 / arguments.get(1));
            default -> throw new IllegalArgumentException("Tipo de operación no válido: " + type);
        };
    }

}
