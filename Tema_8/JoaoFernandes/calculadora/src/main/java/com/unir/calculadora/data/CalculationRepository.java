// java
package com.unir.calculadora.data;

import org.springframework.data.jpa.repository.JpaRepository;
import com.unir.calculadora.data.model.Calculation;
import java.util.List;

public interface CalculationRepository extends JpaRepository<Calculation, Long> {
    List<Calculation> findByTipoIgnoreCase(String tipo);
}
