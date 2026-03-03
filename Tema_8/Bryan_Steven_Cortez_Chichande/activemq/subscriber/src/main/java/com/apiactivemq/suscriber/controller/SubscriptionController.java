package com.apiactivemq.suscriber.controller;

import com.apiactivemq.suscriber.service.SubscriptionService;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Ryan-
 */

@RestController
@RequestMapping("/api/subscriptions")
public class SubscriptionController {
    private final SubscriptionService subscriptionService;

    public SubscriptionController(SubscriptionService subscriptionService) {
        this.subscriptionService = subscriptionService;
    }

    @PostMapping("/{tema}")
    public ResponseEntity<Void> subscribe(@PathVariable String tema) {
        subscriptionService.subscribe(tema);
        return ResponseEntity.accepted().build();
    }

    @DeleteMapping("/{tema}")
    public ResponseEntity<Void> unsubscribe(@PathVariable String tema) {
        subscriptionService.unsubscribe(tema);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<Map<String, String>> list() {
        return ResponseEntity.ok(subscriptionService.list());
    }
}
