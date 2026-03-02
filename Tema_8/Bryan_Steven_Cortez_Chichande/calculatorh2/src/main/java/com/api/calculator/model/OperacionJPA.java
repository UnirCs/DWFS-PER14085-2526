package com.api.calculator.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.OffsetDateTime;

/**
 *
 * @author Ryan-
 */

@Entity
@Table(name = "operaciones")
public class OperacionJPA {
    @Id
    @Column(name = "id", length = 20, nullable = false, updatable = false)
    private String id;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo", length = 30, nullable = false)
    private TipoOperacion tipo;

    @Column(name = "entradas_csv", nullable = false, length = 500)
    private String entradasCsv;

    @Column(name = "parametros_json", nullable = false, length = 500)
    private String parametrosJson;

    @Column(name = "resultado", precision = 30, scale = 10, nullable = false)
    private BigDecimal resultado;

    @Column(name = "creado_en", nullable = false)
    private OffsetDateTime creadoEn;

    public OperacionJPA() {}

    public OperacionJPA(String id, TipoOperacion tipo, String entradasCsv, String parametrosJson,
                           BigDecimal resultado, OffsetDateTime creadoEn) {
        this.id = id;
        this.tipo = tipo;
        this.entradasCsv = entradasCsv;
        this.parametrosJson = parametrosJson;
        this.resultado = resultado;
        this.creadoEn = creadoEn;
    }

    public String getId() { return id; }
    public TipoOperacion getTipo() { return tipo; }
    public String getEntradasCsv() { return entradasCsv; }
    public String getParametrosJson() { return parametrosJson; }
    public BigDecimal getResultado() { return resultado; }
    public OffsetDateTime getCreadoEn() { return creadoEn; }

    public void setId(String id) { this.id = id; }
    public void setTipo(TipoOperacion tipo) { this.tipo = tipo; }
    public void setEntradasCsv(String entradasCsv) { this.entradasCsv = entradasCsv; }
    public void setParametrosJson(String parametrosJson) { this.parametrosJson = parametrosJson; }
    public void setResultado(BigDecimal resultado) { this.resultado = resultado; }
    public void setCreadoEn(OffsetDateTime creadoEn) { this.creadoEn = creadoEn; }
}
