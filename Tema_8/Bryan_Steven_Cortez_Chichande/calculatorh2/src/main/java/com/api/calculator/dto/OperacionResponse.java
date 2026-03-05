package com.api.calculator.dto;

import com.api.calculator.model.TipoOperacion;
import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.Map;

/**
 *
 * @author Ryan-
 */
public record OperacionResponse(
        String id,
        TipoOperacion tipo,
        List<BigDecimal> entradas,
        Map<String, Object> parametros,
        BigDecimal resultado,
        OffsetDateTime creadoEn
        ) {

}
