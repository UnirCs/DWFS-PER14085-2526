package com.api.calculator.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.context.annotation.Configuration;

/**
 *
 * @author Ryan-
 */
@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "Calculadora Online API",
                version = "v1",
                description = "API REST de calculadora con operaciones y memoria consultable por ID"
        )
)
public class OpenApiConfig {

}
