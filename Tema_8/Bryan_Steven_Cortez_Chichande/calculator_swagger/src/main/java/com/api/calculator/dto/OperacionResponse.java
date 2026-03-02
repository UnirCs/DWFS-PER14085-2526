package com.api.calculator.dto;

import com.api.calculator.model.TipoOperacion;
import io.swagger.v3.oas.annotations.media.Schema;
import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.Map;

/**
 *
 * @author Ryan-
 */
public record OperacionResponse(
        @Schema(example = "op_000001")
        String id,
        @Schema(example = "SUMA")
        TipoOperacion tipo,
        @Schema(example = "[2,2,2]")
        List<BigDecimal> entradas,
        @Schema(example = "{}")
        Map<String, Object> parametros,
        @Schema(example = "6")
        BigDecimal resultado,
        @Schema(example = "2026-02-27T22:01:39.720139-05:00")
        OffsetDateTime creadoEn
        ) {

}
