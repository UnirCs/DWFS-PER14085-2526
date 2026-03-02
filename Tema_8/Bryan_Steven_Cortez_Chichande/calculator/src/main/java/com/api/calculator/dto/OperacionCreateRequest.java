package com.api.calculator.dto;

import com.api.calculator.model.TipoOperacion;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
        @NotNull TipoOperacion tipo,
        @NotEmpty List<@NotNull BigDecimal> entradas,
        @Valid @JsonIgnoreProperties(ignoreUnknown = true) Parametros parametros
        ) {

}
