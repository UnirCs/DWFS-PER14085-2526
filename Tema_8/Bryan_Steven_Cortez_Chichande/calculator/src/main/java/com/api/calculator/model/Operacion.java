package com.api.calculator.model;

import java.util.List;
import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.Map;

/**
 *
 * @author Ryan-
 */
public record Operacion(
        String id,
        TipoOperacion tipo,
        List<BigDecimal> entradas,
        Map<String, Object> parametros,
        BigDecimal resultado,
        OffsetDateTime creadoEn
        ) {

}
