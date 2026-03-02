package com.api.calculator.service;

import org.springframework.stereotype.Component;
import java.util.concurrent.atomic.AtomicLong;

/**
 *
 * @author Ryan-
 */

@Component
public class OperacionIdGenerator {
    private final AtomicLong seq = new AtomicLong(6);

    public String nextId() {
        long n = seq.incrementAndGet();
        return "op_%06d".formatted(n);
    }
}
