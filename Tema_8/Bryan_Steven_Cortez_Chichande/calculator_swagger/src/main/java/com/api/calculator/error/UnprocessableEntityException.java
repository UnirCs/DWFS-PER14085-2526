package com.api.calculator.error;

/**
 *
 * @author Ryan-
 */
public class UnprocessableEntityException extends RuntimeException {
    public UnprocessableEntityException(String message) { super(message); }
}
