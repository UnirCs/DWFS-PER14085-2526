package com.apiactivemq.suscriber.messaging;

import com.apiactivemq.suscriber.dto.MensajeRequest;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.stereotype.Component;

/**
 *
 * @author Ryan-
 */
@Component
public class PrivadoListener {
    private final ObjectMapper objectMapper;
    
    public PrivadoListener(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @JmsListener(
            destination = "privado.#{@environment.getProperty('app.alumno.id')}",
            containerFactory = "queueFactory"
    )
    public void onPrivado(String json) {
        try {
            MensajeRequest msg = objectMapper.readValue(json, MensajeRequest.class);

            System.out.println(
                    "PRIVADO -> " +
                    msg.autor() +
                    ": " +
                    msg.contenido()
            );

        } catch (Exception e) {
            System.out.println("Error leyendo mensaje privado: " + e.getMessage());
        }
    }
}
