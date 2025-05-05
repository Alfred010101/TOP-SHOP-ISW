package com.back_top_shop.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.back_top_shop.model.ShoppingCartItem;

public interface ShoppingCartItemRepository extends JpaRepository<ShoppingCartItem, Integer> {
    Optional<ShoppingCartItem> findByFkCartAndFkTshirt(Integer fkCart, Integer fkTshirt);
}