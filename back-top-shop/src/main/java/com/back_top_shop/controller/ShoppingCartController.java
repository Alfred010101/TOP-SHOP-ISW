package com.back_top_shop.controller;

import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.back_top_shop.dto.AddToCartRequestDTO;
import com.back_top_shop.model.ShoppingCart;
import com.back_top_shop.model.ShoppingCartItem;
import com.back_top_shop.model.User;
import com.back_top_shop.repository.ShoppingCartItemRepository;
import com.back_top_shop.repository.ShoppingCartRepository;
import com.back_top_shop.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/user/shoppingCart")
@RequiredArgsConstructor
public class ShoppingCartController 
{
    private final UserRepository userRepository;
    private final ShoppingCartRepository cartRepository;
    private final ShoppingCartItemRepository itemRepository;

    @PostMapping("/add")
    public ResponseEntity<String> addToCart(@RequestBody AddToCartRequestDTO request) {
    Integer productId = request.getProductId();
    String email = request.getEmail();

        // Buscar usuario
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // Buscar o crear carrito
        Optional<ShoppingCart> cart = cartRepository.findByFkUser(user.getId());

        if(!cart.isPresent())
        {
            return ResponseEntity.ok("Fallo");
        }

        // Verificar si ya tiene el producto
        Optional<ShoppingCartItem> optionalItem = itemRepository.findByFkCartAndFkTshirt(cart.get().getId(), productId);

        if (optionalItem.isPresent()) {
            ShoppingCartItem item = optionalItem.get();
            item.setAmount(item.getAmount() + 1);
            itemRepository.save(item);
            return ResponseEntity.ok("Cantidad incrementada en el carrito");
        } else {
            ShoppingCartItem newItem = new ShoppingCartItem();
            newItem.setFkCart(cart.get().getId());
            newItem.setFkTshirt(productId);
            newItem.setAmount(1);
            itemRepository.save(newItem);
            return ResponseEntity.ok("Producto agregado al carrito");
        }
    }
}
