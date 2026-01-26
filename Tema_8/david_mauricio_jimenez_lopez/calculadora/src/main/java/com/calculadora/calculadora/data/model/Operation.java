package com.calculadora.calculadora.data.model;

import com.calculadora.calculadora.controller.model.OperationDto;
import com.calculadora.calculadora.data.utils.Consts;

import java.util.List;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "operations")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString

public class Operation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = Consts.OPERANDS, nullable = false, columnDefinition = "json")
    private List<Integer> operands;

    @Column(name = Consts.OPERATION, nullable = false, length = 4)
    private String operation;

    @Column(name = Consts.RESULT, nullable = false)
    private Double result;

    public void update(OperationDto operationDto) {
        this.operands = operationDto.getOperands();
        this.operation = operationDto.getOperation();
        this.result = operationDto.getResult();
    }
}
