package com.api.calculator.dto;

import com.api.calculator.model.TipoOperacion;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.util.List;

/**
 *
 * @author Ryan-
 */
public record OperacionCreateRequest(
        @Schema(example = "SUMA", description = "Tipo de operación")
        TipoOperacion tipo,
        @Schema(example = "[2,2,2]", description = "Entradas numéricas")
        List<BigDecimal> entradas,
        @Schema(description = "Parámetros extra (RAIZ y POTENCIA)")
        Parametros parametros
        ) {

}
