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
public class ForoListeners {
    private final ObjectMapper objectMapper;

    public ForoListeners(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }
    
    @JmsListener(destination = "foro.programacion", containerFactory = "topicFactory")
    public void onProgramacion(String json) {
        try {
            MensajeRequest msg = objectMapper.readValue(json, MensajeRequest.class);
            System.out.println("FORO[programacion] -> " + msg.autor() + ": " + msg.contenido());
        } catch (Exception e) {
            System.out.println("Error FORO[programacion] parseando JSON: " + e.getMessage() + " | payload=" + json);
        }
    }

    @JmsListener(destination = "foro.anuncios", containerFactory = "topicFactory")
    public void onAnuncios(String json) {
        try {
            MensajeRequest msg = objectMapper.readValue(json, MensajeRequest.class);
            System.out.println("FORO[anuncios] -> " + msg.autor() + ": " + msg.contenido());
        } catch (Exception e) {
            System.out.println("Error FORO[anuncios] parseando JSON: " + e.getMessage() + " | payload=" + json);
        }
    }
}
