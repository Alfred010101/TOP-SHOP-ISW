package com.back_top_shop.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.back_top_shop.dto.ShoppingCartItemDTO;
import com.back_top_shop.model.ShoppingCart;
import com.back_top_shop.model.ShoppingCartItem;
import com.back_top_shop.model.User;
import com.back_top_shop.repository.ShoppingCartItemRepository;
import com.back_top_shop.repository.ShoppingCartRepository;
import com.back_top_shop.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ShoppingCartService 
{
    private final ShoppingCartRepository shoppingCartRepository;
    private final ShoppingCartItemRepository shoppingCartItemRepository;
    private final UserRepository userRepository ;

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

    public boolean deleteItemFromCart(String email, Integer fkTshirt) {
        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) return false;

        ShoppingCart cart = shoppingCartRepository.findByFkUser(user.getId()).orElse(null);
        if (cart == null) return false;

        ShoppingCartItem item = shoppingCartItemRepository.findByFkCartAndFkTshirt(cart.getId(), fkTshirt).orElse(null);
        if (item == null) return false;

        shoppingCartItemRepository.delete(item);
        return true;
    }

}
