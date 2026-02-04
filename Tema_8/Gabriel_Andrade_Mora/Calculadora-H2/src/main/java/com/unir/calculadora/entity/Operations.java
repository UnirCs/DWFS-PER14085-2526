package com.unir.calculadora.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.unir.calculadora.utils.Consts;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Operations {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = Consts.ID)
    private Long id;
    @Column(name = Consts.TYPE, nullable = false)
    private String type;
    @Column(name = Consts.ARGUMENTS, nullable = false)
    private String arguments;
    @Column(name = Consts.RESULT)
    private Integer result;

    // constructor sin id
    public Operations(String type, String arguments) {
        this.type = type;
        this.arguments = arguments;
    }

}
