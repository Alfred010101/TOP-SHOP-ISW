package com.back_top_shop.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.back_top_shop.dto.ShoppingCartItemDTO;
import com.back_top_shop.model.ShoppingCart;
import com.back_top_shop.repository.ShoppingCartItemRepository;
import com.back_top_shop.repository.ShoppingCartRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ShoppingCartService 
{
    private final ShoppingCartRepository shoppingCartRepository;
    private final ShoppingCartItemRepository shoppingCartItemRepository;

    public void createCar(ShoppingCart car)
    {
        shoppingCartRepository.save(car);
    }
    public List<ShoppingCartItemDTO> getItemsByUserEmail(String email)
    {
        return shoppingCartItemRepository.getItemsByUserEmail(email);
    }

    public boolean updateItemAmount(String email, Integer fkTshirt, Integer delta) {
        return shoppingCartItemRepository.updateAmountByEmailAndTshirt(email, fkTshirt, delta) > 0;
    }
}
