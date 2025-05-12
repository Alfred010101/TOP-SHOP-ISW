package com.back_top_shop.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.back_top_shop.dto.ShoppingCartItemDTO;
import com.back_top_shop.model.ShoppingCartItem;

import jakarta.transaction.Transactional;

public interface ShoppingCartItemRepository extends JpaRepository<ShoppingCartItem, Integer> {
    List<ShoppingCartItem> findByFkCart(Integer fkCart);

    Optional<ShoppingCartItem> findByFkCartAndFkTshirt(Integer fkCart, Integer fkTshirt);

    @Query(value = """
    SELECT sci.id AS id,
           sci.fk_tshirt AS fkTshirt,
           sci.amount AS amount,
           t.title AS title,
           t.resource AS resource,
           t.description AS description,
           t.price AS price,
           t.existence
    FROM shopping_cart_items sci
    JOIN shopping_cart sc ON sci.fk_cart = sc.id
    JOIN users u ON sc.fk_user = u.id
    JOIN tshirts t ON sci.fk_tshirt = t.id
    WHERE u.email = :email
    """, nativeQuery = true)
    List<ShoppingCartItemDTO> getItemsByUserEmail(@Param("email") String email);

    @Modifying
    @Transactional
    @Query(value = """
        UPDATE shopping_cart_items
        SET amount = GREATEST(amount + :delta, 1)
        WHERE fk_cart = (
            SELECT sc.id
            FROM shopping_cart sc
            JOIN users u ON sc.fk_user = u.id
            WHERE u.email = :email
        )
        AND fk_tshirt = :fkTshirt
    """, nativeQuery = true)
    int updateAmountByEmailAndTshirt(
        @Param("email") String email,
        @Param("fkTshirt") Integer fkTshirt,
        @Param("delta") Integer delta
    );
}