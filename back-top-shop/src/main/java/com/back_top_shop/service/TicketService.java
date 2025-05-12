package com.back_top_shop.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.back_top_shop.dto.PaymentRequestDTO;
import com.back_top_shop.model.ShoppingCart;
import com.back_top_shop.model.ShoppingCartItem;
import com.back_top_shop.model.TShirt;
import com.back_top_shop.model.Ticket;
import com.back_top_shop.model.TicketItem;
import com.back_top_shop.model.User;
import com.back_top_shop.repository.ShoppingCartItemRepository;
import com.back_top_shop.repository.ShoppingCartRepository;
import com.back_top_shop.repository.TShirtRepository;
import com.back_top_shop.repository.TicketItemRepository;
import com.back_top_shop.repository.TicketRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TicketService 
{
    private final TicketRepository ticketRepository;
    private final UserService userService;
    private final TicketItemService ticketItemService;
    private final ShoppingCartRepository shoppingCartRepository;    
    private final ShoppingCartItemRepository shoppingCartItemRepository;
    private final TShirtRepository tshirtRepository;
    private final TicketItemRepository ticketItemRepository;

    public void createTicket(PaymentRequestDTO request)
    {
        User user = userService.findByEmail(request.getUsername()).orElse(null);
        Ticket ticket = new Ticket();
        ticket.setFkUser(user.getId());
        ticket.setCartName(request.getCartName());
        ticket.setCartNumber(request.getCartNumber());
        ticket = ticketRepository.save(ticket); 

        ShoppingCart cart = shoppingCartRepository.findByFkUser(user.getId()).orElseThrow();

        List<ShoppingCartItem> cartItems = shoppingCartItemRepository.findByFkCart(cart.getId());

        for (ShoppingCartItem item : cartItems) 
        {
            TShirt tshirt = tshirtRepository.findById(item.getFkTshirt()).orElseThrow();

            TicketItem ticketItem = new TicketItem();
            ticketItem.setFkTicket(ticket.getId());
            ticketItem.setFkTshirt(tshirt.getId());
            ticketItem.setTitle(tshirt.getTitle());
            ticketItem.setAmount(item.getAmount());
            ticketItem.setPrice(tshirt.getPrice());

            ticketItemRepository.save(ticketItem);
            if (tshirt.getExistence() < item.getAmount()) 
            {
                throw new RuntimeException("No hay suficiente stock de " + tshirt.getTitle());
            }
            
            tshirt.setExistence(tshirt.getExistence() - item.getAmount());
            tshirtRepository.save(tshirt);
        }
        shoppingCartItemRepository.deleteAll(cartItems);
    }
}
