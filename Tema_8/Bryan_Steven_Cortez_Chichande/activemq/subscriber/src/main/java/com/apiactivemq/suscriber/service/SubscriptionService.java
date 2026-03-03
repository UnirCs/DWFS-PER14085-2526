package com.apiactivemq.suscriber.service;

import com.apiactivemq.suscriber.dto.MensajeRequest;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.jms.Message;
import jakarta.jms.TextMessage;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.beans.factory.DisposableBean;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jms.config.JmsListenerContainerFactory;
import org.springframework.jms.config.SimpleJmsListenerEndpoint;
import org.springframework.jms.listener.MessageListenerContainer;
import org.springframework.stereotype.Service;

/**
 *
 * @author Ryan-
 */

@Service
public class SubscriptionService {
    private final JmsListenerContainerFactory<?> topicFactory;
    private final Map<String, MessageListenerContainer> topicContainers = new ConcurrentHashMap<>();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public SubscriptionService(@Qualifier("topicFactory") JmsListenerContainerFactory<?> topicFactory) {
        this.topicFactory = topicFactory;
    }

    public void subscribe(String tema) {
        String t = normalizar(tema);
        if (t.isBlank()) return;

        if (topicContainers.containsKey(t)) return;

        String destination = "foro." + t;

        SimpleJmsListenerEndpoint endpoint = new SimpleJmsListenerEndpoint();
        endpoint.setId("foro-" + t);
        endpoint.setDestination(destination);
        endpoint.setMessageListener(message -> imprimirForo(t, message));

        MessageListenerContainer container = topicFactory.createListenerContainer(endpoint);
        container.start();

        topicContainers.put(t, container);
    }

    public void unsubscribe(String tema) {
        String t = normalizar(tema);
        MessageListenerContainer container = topicContainers.remove(t);
        if (container == null) return;

        container.stop();

        if (container instanceof DisposableBean disposable) {
            try {
                disposable.destroy();
            } catch (Exception ignored) {}
        }
    }

    public Map<String, String> list() {
        Map<String, String> out = new ConcurrentHashMap<>();
        topicContainers.forEach((tema, c) -> out.put(tema, "foro." + tema));
        return out;
    }

    private String normalizar(String s) {
        return s == null ? "" : s.trim().toLowerCase();
    }

    private void imprimirForo(String tema, Message message) {
    try {

        if (message instanceof TextMessage tm) {

            String json = tm.getText();

            MensajeRequest msg =
                    objectMapper.readValue(json, MensajeRequest.class);

            System.out.println(
                    "FORO[" + tema + "] -> " +
                    msg.autor() +
                    ": " +
                    msg.contenido()
            );
        }

    } catch (Exception e) {

        System.out.println(
                "Error leyendo mensaje del foro[" + tema + "]: "
                        + e.getMessage()
        );
    }
}
}
