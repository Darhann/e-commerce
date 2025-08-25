package com.example.ecommerce.controllers;

import com.example.ecommerce.models.Order;
import com.example.ecommerce.models.User;
import com.example.ecommerce.services.OrderService;
import com.example.ecommerce.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor // Используем Lombok для конструктора
public class OrderController {

    private final OrderService orderService;
    private final UserService userService;

    @GetMapping
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
        return orderService.getOrderById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Order createOrder(@RequestBody Order order) {
        return orderService.createOrder(order);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Order> updateOrderStatus(@PathVariable Long id, @RequestBody String status) {
        try {
            return ResponseEntity.ok(orderService.updateOrderStatus(id, status));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // ЭТОТ МЕТОД ТЕПЕРЬ ИМЕЕТ URL /api/orders/cart
    @GetMapping("/cart")
    public ResponseEntity<Order> getUserCart(Principal principal) {
        User currentUser = userService.findByEmail(principal.getName())
                .orElseThrow(() -> new RuntimeException("Невозможно найти пользователя"));

        Order cart = orderService.getOrCreateCartForUser(currentUser);
        return ResponseEntity.ok(cart);
    }

    @PostMapping("/cart/checkout")
    public ResponseEntity<?> checkoutCart(Principal principal) {
        User currentUser = userService.findByEmail(principal.getName()).orElseThrow(() -> new RuntimeException("Невозможно найти пользователя"));
        try {
            Order processedOrder = orderService.checkout(currentUser);
            return ResponseEntity.ok(processedOrder);
        } catch (IllegalStateException e) {
            // Возвращаем осмысленную ошибку
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}