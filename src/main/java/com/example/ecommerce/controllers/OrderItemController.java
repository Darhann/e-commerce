package com.example.ecommerce.controllers;

import com.example.ecommerce.models.Order;
import com.example.ecommerce.models.OrderItem;
import com.example.ecommerce.models.User;
import com.example.ecommerce.services.OrderItemService;
import com.example.ecommerce.services.OrderService;
import com.example.ecommerce.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;

@RestController
@RequestMapping("/api/cart") // ПРАВИЛЬНЫЙ БАЗОВЫЙ URL ДЛЯ РАБОТЫ С КОРЗИНОЙ
@RequiredArgsConstructor
public class OrderItemController {

    private final OrderItemService orderItemService;
    private final UserService userService;
    private final OrderService orderService;

    // POST /api/cart -> Добавить товар в корзину
    @PostMapping
    public OrderItem addProductToCart(@RequestBody OrderItem orderItem, Principal principal) {
        User currentUser = userService.findByEmail(principal.getName()).orElseThrow(() -> new RuntimeException("Пользователь не найден"));
        Order cart = orderService.getOrCreateCartForUser(currentUser);
        return orderItemService.addItemToOrder(cart.getId(), orderItem);
    }

    // PUT /api/cart/items/{itemId} -> Изменить количество товара
    @PutMapping("/items/{itemId}")
    public ResponseEntity<OrderItem> updateCartItemQuantity(@PathVariable Long itemId, @RequestBody OrderItem itemDetails, Principal principal) {
        User currentUser = userService.findByEmail(principal.getName()).orElseThrow(() -> new RuntimeException("Пользователь не найден"));
        try {
            OrderItem updatedItem = orderItemService.updateItemQuantity(itemId, itemDetails.getQuantity(), currentUser);
            return ResponseEntity.ok(updatedItem);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // DELETE /api/cart/items/{itemId} -> Удалить товар из корзины
    @DeleteMapping("/items/{itemId}")
    public ResponseEntity<Void> deleteCartItem(@PathVariable Long itemId, Principal principal) {
        User currentUser = userService.findByEmail(principal.getName()).orElseThrow(() -> new RuntimeException("Пользователь не найден"));
        try {
            orderItemService.deleteItem(itemId, currentUser);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}