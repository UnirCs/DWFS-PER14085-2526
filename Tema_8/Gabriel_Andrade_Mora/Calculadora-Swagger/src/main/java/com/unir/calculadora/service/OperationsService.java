package com.unir.calculadora.service;

import com.unir.calculadora.dto.*;
import java.util.List;

public interface OperationsService {

    public List<OperationsResponseDTO> getAll();

    public OperationsResponseDTO getById(Long id);

    public OperationsResponseDTO create(OperationsRequestDTO operationsDto);

}
