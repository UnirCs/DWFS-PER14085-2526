package com.apiactivemq.publisher.service;

import com.apiactivemq.publisher.dto.MensajeRequest;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;

/**
 *
 * @author Ryan-
 */

@Service
public class PublisherService {
    private final JmsTemplate queueJmsTemplate;
    private final JmsTemplate topicJmsTemplate;
    private final ObjectMapper objectMapper;

    public PublisherService(JmsTemplate queueJmsTemplate, JmsTemplate topicJmsTemplate,
                            ObjectMapper objectMapper) {
        this.queueJmsTemplate = queueJmsTemplate;
        this.topicJmsTemplate = topicJmsTemplate;
        this.objectMapper = objectMapper;
    }

    public void publicarEnForo(String tema, MensajeRequest msg) {
        String destination = "foro." + normalizar(tema);
        topicJmsTemplate.convertAndSend(destination, toJson(msg));
    }

    public void enviarPrivado(String alumnoId, MensajeRequest msg) {
        String destination = "privado." + normalizar(alumnoId);
        queueJmsTemplate.convertAndSend(destination, toJson(msg));
    }
    
    private String toJson(MensajeRequest msg) {
        try {
            return objectMapper.writeValueAsString(msg);
        } catch (JsonProcessingException e) {
            throw new IllegalArgumentException("No se pudo serializar el mensaje a JSON", e);
        }
    }

    private String normalizar(String s) {
        return s == null ? "" : s.trim().toLowerCase();
    }
}
