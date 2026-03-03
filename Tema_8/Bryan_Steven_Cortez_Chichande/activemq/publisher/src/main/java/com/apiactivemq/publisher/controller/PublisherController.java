package com.apiactivemq.publisher.controller;

import com.apiactivemq.publisher.dto.MensajeRequest;
import com.apiactivemq.publisher.service.PublisherService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Ryan-
 */

@RestController
@RequestMapping("/api")
public class PublisherController {
    private final PublisherService publisherService;

    public PublisherController(PublisherService publisherService) {
        this.publisherService = publisherService;
    }

    @PostMapping("/foro/{tema}/publicar")
    public ResponseEntity<Void> publicar(@PathVariable String tema, @Valid @RequestBody MensajeRequest body) {
        publisherService.publicarEnForo(tema, body);
        return ResponseEntity.accepted().build();
    }

    @PostMapping("/privado/{alumnoId}/enviar")
    public ResponseEntity<Void> privado(@PathVariable String alumnoId, @Valid @RequestBody MensajeRequest body) {
        publisherService.enviarPrivado(alumnoId, body);
        return ResponseEntity.accepted().build();
    }
}
