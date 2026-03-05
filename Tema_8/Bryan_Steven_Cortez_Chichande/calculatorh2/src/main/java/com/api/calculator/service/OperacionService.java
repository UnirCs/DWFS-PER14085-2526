package com.api.calculator.service;

import com.api.calculator.dto.OperacionCreateRequest;
import com.api.calculator.dto.Parametros;
import com.api.calculator.error.NotFoundException;
import com.api.calculator.error.UnprocessableEntityException;
import com.api.calculator.model.OperacionJPA;
import com.api.calculator.model.TipoOperacion;
import com.api.calculator.repository.OperacionJpaRepository;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.math.MathContext;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 *
 * @author Ryan-
 */

@Service
public class OperacionService {
    private final OperacionJpaRepository repo;
    private final OperacionIdGenerator idGenerator;

    private static final MathContext MC = new MathContext(20);

    public OperacionService(OperacionJpaRepository repo, OperacionIdGenerator idGenerator) {
        this.repo = repo;
        this.idGenerator = idGenerator;
    }

    public OperacionJPA crear(OperacionCreateRequest req) {
        validarReglas(req.tipo(), req.entradas(), req.parametros());
        BigDecimal resultado = calcular(req.tipo(), req.entradas(), req.parametros());

        String id = idGenerator.nextId();
        OffsetDateTime creadoEn = OffsetDateTime.now(ZoneOffset.ofHours(-5));

        Map<String, Object> params = normalizarParametros(req.tipo(), req.parametros());

        OperacionJPA entity = new OperacionJPA(
                id,
                req.tipo(),
                OperacionMapper.toCsv(req.entradas()),
                OperacionMapper.toJson(params),
                resultado,
                creadoEn
        );

        return repo.save(entity);
    }

    public OperacionJPA obtener(String id) {
        return repo.findById(id)
                .orElseThrow(() -> new NotFoundException("Operación no encontrada: " + id));
    }

    private void validarReglas(TipoOperacion tipo, List<BigDecimal> entradas, Parametros parametros) {
        if (tipo == null) throw new UnprocessableEntityException("El campo 'tipo' es obligatorio.");
        if (entradas == null || entradas.isEmpty()) throw new UnprocessableEntityException("El campo 'entradas' no puede estar vacío.");

        switch (tipo) {
            case SUMA, RESTA -> {
                if (entradas.size() < 2) throw new UnprocessableEntityException(tipo + " requiere mínimo 2 entradas.");
            }
            case MULTIPLICACION, DIVISION -> {
                if (entradas.size() != 2) throw new UnprocessableEntityException(tipo + " requiere exactamente 2 entradas.");
                if (tipo == TipoOperacion.DIVISION && entradas.get(1).compareTo(BigDecimal.ZERO) == 0) {
                    throw new UnprocessableEntityException("DIVISION no permite divisor 0.");
                }
            }
            case RAIZ -> {
                if (entradas.size() != 1) throw new UnprocessableEntityException("RAIZ requiere exactamente 1 entrada.");
                int grado = (parametros != null && parametros.grado() != null) ? parametros.grado() : -1;
                if (grado < 1) throw new UnprocessableEntityException("RAIZ requiere parametros.grado >= 1.");
                if (grado % 2 == 0 && entradas.get(0).compareTo(BigDecimal.ZERO) < 0) {
                    throw new UnprocessableEntityException("RAIZ de grado par no permite entrada negativa (en números reales).");
                }
            }
            case POTENCIA -> {
                if (entradas.size() != 1) throw new UnprocessableEntityException("POTENCIA requiere exactamente 1 entrada.");
                if (parametros == null || parametros.exponente() == null) {
                    throw new UnprocessableEntityException("POTENCIA requiere parametros.exponente.");
                }
            }
        }
    }

    private Map<String, Object> normalizarParametros(TipoOperacion tipo, Parametros parametros) {
        Map<String, Object> map = new HashMap<>();
        if (tipo == TipoOperacion.RAIZ) map.put("grado", parametros != null ? parametros.grado() : null);
        else if (tipo == TipoOperacion.POTENCIA) map.put("exponente", parametros != null ? parametros.exponente() : null);
        return map;
    }

    private BigDecimal calcular(TipoOperacion tipo, List<BigDecimal> entradas, Parametros parametros) {
        return switch (tipo) {
            case SUMA -> entradas.stream().reduce(BigDecimal.ZERO, BigDecimal::add);
            case RESTA -> {
                BigDecimal acc = entradas.get(0);
                for (int i = 1; i < entradas.size(); i++) acc = acc.subtract(entradas.get(i));
                yield acc;
            }
            case MULTIPLICACION -> entradas.get(0).multiply(entradas.get(1), MC);
            case DIVISION -> entradas.get(0).divide(entradas.get(1), MC);
            case POTENCIA -> pow(entradas.get(0), parametros.exponente());
            case RAIZ -> nthRoot(entradas.get(0), parametros.grado());
        };
    }

    private BigDecimal pow(BigDecimal base, int exp) {
        if (exp == 0) return BigDecimal.ONE;
        if (exp > 0) return base.pow(exp, MC);
        if (base.compareTo(BigDecimal.ZERO) == 0) {
            throw new UnprocessableEntityException("POTENCIA con exponente negativo no permite base 0.");
        }
        BigDecimal pos = base.pow(Math.abs(exp), MC);
        return BigDecimal.ONE.divide(pos, MC);
    }

    private BigDecimal nthRoot(BigDecimal a, int n) {
        double value = a.doubleValue();
        double r = Math.pow(value, 1.0 / n);
        return new BigDecimal(r, MC);
    }
}
