package com.api.calculator.error;

import java.time.OffsetDateTime;
import java.util.Map;

/**
 *
 * @author Ryan-
 */
public record ApiError(
        OffsetDateTime timestamp,
        int status,
        String error,
        String message,
        String path,
        Map<String, Object> details
        ) {

}
