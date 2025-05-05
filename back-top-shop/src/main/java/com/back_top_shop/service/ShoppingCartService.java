package com.back_top_shop.service;

import org.springframework.stereotype.Service;

import com.back_top_shop.model.ShoppingCart;
import com.back_top_shop.repository.ShoppingCartRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ShoppingCartService 
{
    private final ShoppingCartRepository shoppingCartRepository;

    public void createCar(ShoppingCart car)
    {
        shoppingCartRepository.save(car);
    }
}
