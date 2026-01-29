package com.unir.forum.subscriber.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class SubscriberService {

    private final JmsTemplate queueJmsTemplate;

    @Value("${forum.userId}")
    private String userId;

    // LISTENERS PARA TOPICS
    @JmsListener(destination = "tema1", containerFactory = "jmsFactoryTopic")
    public void listenTema1(String message) {
        log.info("[{}] Mensaje en tema1: {}", userId, message);
    }

    @JmsListener(destination = "tema2", containerFactory = "jmsFactoryTopic")
    public void listenTema2(String message) {
        log.info("[{}] Mensaje en tema2: {}", userId, message);
    }

    @JmsListener(destination = "tema3", containerFactory = "jmsFactoryTopic")
    public void listenTema3(String message) {
        log.info("[{}] Mensaje en tema3: {}", userId, message);
    }

    @JmsListener(destination = "tema4", containerFactory = "jmsFactoryTopic")
    public void listenTema4(String message) {
        log.info("[{}] Mensaje en tema4: {}", userId, message);
    }

    // LISTENER PARA COLA (mensajes directos)
    @JmsListener(destination = "${forum.userId}", containerFactory = "jmsFactoryQueue")
    public void listenDirectMessage(String message) {
        log.info("[{}] Mensaje directo: {}", userId, message);
    }

    // RESPONDER AL PROFESOR
    public void replyToProfesor(String message) {
        String formatted = String.format("[%s] responde: %s", userId, message);
        queueJmsTemplate.convertAndSend("profesor", formatted);
        log.info("Respuesta enviada: {}", formatted);
    }
}