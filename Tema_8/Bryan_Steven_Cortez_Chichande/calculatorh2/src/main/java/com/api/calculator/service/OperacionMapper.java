package com.api.calculator.service;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 *
 * @author Ryan-
 */
public class OperacionMapper {
    public static String toCsv(List<BigDecimal> entradas) {
        return entradas.stream().map(BigDecimal::toPlainString).collect(Collectors.joining(","));
    }

    public static List<BigDecimal> fromCsv(String csv) {
        if (csv == null || csv.isBlank()) return List.of();
        return Arrays.stream(csv.split(","))
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .map(BigDecimal::new)
                .toList();
    }

    public static String toJson(Map<String, Object> params) {
        if (params == null || params.isEmpty()) return "{}";
        String body = params.entrySet().stream()
                .map(e -> "\"" + e.getKey() + "\":" + e.getValue())
                .collect(Collectors.joining(","));
        return "{" + body + "}";
    }

    public static Map<String, Object> fromJson(String json) {
        if (json == null || json.isBlank() || json.equals("{}")) return Map.of();
        String t = json.trim();
        t = t.substring(1, t.length() - 1).trim();
        if (t.isBlank()) return Map.of();

        Map<String, Object> map = new HashMap<>();
        for (String part : t.split(",")) {
            String[] kv = part.split(":");
            String key = kv[0].trim().replace("\"", "");
            String val = kv[1].trim();
            map.put(key, Integer.parseInt(val));
        }
        return map;
    }

    private OperacionMapper() {}
}
