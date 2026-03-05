package com.api.calculator.error;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.HashMap;
import java.util.Map;

/**
 *
 * @author Ryan-
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiError> handleValidation(MethodArgumentNotValidException ex, HttpServletRequest req) {
        Map<String, Object> details = new HashMap<>();
        Map<String, String> fields = new HashMap<>();
        for (FieldError fe : ex.getBindingResult().getFieldErrors()) {
            fields.put(fe.getField(), fe.getDefaultMessage());
        }
        details.put("fields", fields);

        ApiError body = new ApiError(
                OffsetDateTime.now(ZoneOffset.ofHours(-5)),
                HttpStatus.BAD_REQUEST.value(),
                "Bad Request",
                "Validación fallida",
                req.getRequestURI(),
                details
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(body);
    }

    @ExceptionHandler(UnprocessableEntityException.class)
    public ResponseEntity<ApiError> handle422(UnprocessableEntityException ex, HttpServletRequest req) {
        ApiError body = new ApiError(
                OffsetDateTime.now(ZoneOffset.ofHours(-5)),
                422,
                "Unprocessable Entity",
                ex.getMessage(),
                req.getRequestURI(),
                Map.of()
        );
        return ResponseEntity.status(422).body(body);
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ApiError> handle404(NotFoundException ex, HttpServletRequest req) {
        ApiError body = new ApiError(
                OffsetDateTime.now(ZoneOffset.ofHours(-5)),
                HttpStatus.NOT_FOUND.value(),
                "Not Found",
                ex.getMessage(),
                req.getRequestURI(),
                Map.of()
        );
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(body);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiError> handle500(Exception ex, HttpServletRequest req) {
        ApiError body = new ApiError(
                OffsetDateTime.now(ZoneOffset.ofHours(-5)),
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                "Internal Server Error",
                "Ocurrió un error inesperado.",
                req.getRequestURI(),
                Map.of("exception", ex.getClass().getSimpleName())
        );
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(body);
    }
}
