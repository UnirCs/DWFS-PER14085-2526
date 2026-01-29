package com.unir.forum.subscriber.config;

import jakarta.jms.ConnectionFactory;
import org.apache.activemq.ActiveMQConnectionFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.jms.autoconfigure.DefaultJmsListenerContainerFactoryConfigurer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jms.annotation.EnableJms;
import org.springframework.jms.config.DefaultJmsListenerContainerFactory;
import org.springframework.jms.config.JmsListenerContainerFactory;
import org.springframework.jms.core.JmsTemplate;

@Configuration
@EnableJms
public class JmsConfig {

    @Value("${spring.activemq.broker-url}")
    private String brokerUrl;

    @Value("${spring.activemq.user}")
    private String user;

    @Value("${spring.activemq.password}")
    private String password;

    @Value("${forum.userId}")
    private String userId;

    /**
     * Conexión con el broker ActiveMQ.
     */
    @Bean
    public ConnectionFactory connectionFactory() {
        ActiveMQConnectionFactory factory = new ActiveMQConnectionFactory();
        factory.setBrokerURL(brokerUrl);
        factory.setUserName(user);
        factory.setPassword(password);
        return factory;
    }

    /**
     * JmsTemplate para enviar mensajes a COLAS (responder al profesor).
     */
    @Bean(name = "queueJmsTemplate")
    public JmsTemplate queueJmsTemplate() {
        JmsTemplate jmsTemplate = new JmsTemplate();
        jmsTemplate.setConnectionFactory(connectionFactory());
        return jmsTemplate;
    }

    /**
     * Factory para recibir mensajes de TOPICS (broadcast del profesor).
     * setPubSubDomain(true) = modo publicación/suscripción.
     */
    @Bean(name = "jmsFactoryTopic")
    public JmsListenerContainerFactory<?> jmsFactoryTopic(
            ConnectionFactory connectionFactory,
            DefaultJmsListenerContainerFactoryConfigurer configurer) {
        DefaultJmsListenerContainerFactory factory = new DefaultJmsListenerContainerFactory();
        configurer.configure(factory, connectionFactory);
        factory.setPubSubDomain(true); // Para TOPICS
        return factory;
    }

    /**
     * Factory para recibir mensajes de COLAS (mensajes directos).
     */
    @Bean(name = "jmsFactoryQueue")
    public JmsListenerContainerFactory<?> jmsFactoryQueue(
            ConnectionFactory connectionFactory,
            DefaultJmsListenerContainerFactoryConfigurer configurer) {
        DefaultJmsListenerContainerFactory factory = new DefaultJmsListenerContainerFactory();
        configurer.configure(factory, connectionFactory);
        factory.setClientId(userId + "-queue");
        return factory;
    }
}