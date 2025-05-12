package com.back_top_shop.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.back_top_shop.dto.AddressDTO;
import com.back_top_shop.dto.AddressProjection;
import com.back_top_shop.dto.PaymentRequestDTO;
import com.back_top_shop.dto.TicketBasicInfo;
import com.back_top_shop.dto.TicketDTO;
import com.back_top_shop.dto.TicketDetailsDTO;
import com.back_top_shop.dto.TicketItemDTO;
import com.back_top_shop.model.ShoppingCart;
import com.back_top_shop.model.ShoppingCartItem;
import com.back_top_shop.model.TShirt;
import com.back_top_shop.model.Ticket;
import com.back_top_shop.model.TicketItem;
import com.back_top_shop.model.User;
import com.back_top_shop.repository.AddressRepository;
import com.back_top_shop.repository.ShoppingCartItemRepository;
import com.back_top_shop.repository.ShoppingCartRepository;
import com.back_top_shop.repository.TShirtRepository;
import com.back_top_shop.repository.TicketItemRepository;
import com.back_top_shop.repository.TicketRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TicketService 
{
    private final TicketRepository ticketRepository;
    private final UserService userService;
    private final ShoppingCartRepository shoppingCartRepository;    
    private final ShoppingCartItemRepository shoppingCartItemRepository;
    private final TShirtRepository tshirtRepository;
    private final TicketItemRepository ticketItemRepository;
    private final AddressRepository addressRepository;

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

    public List<TicketDTO> findAllByUsername(String username) 
    {
        return ticketRepository.findAllByUsername(username);
    }

    public TicketDetailsDTO getTicketDetails(Integer ticketId) {
        TicketBasicInfo info = ticketRepository.findTicketBasicInfo(ticketId);
        if (info == null) {
            throw new EntityNotFoundException("Ticket no encontrado");
        }
        
        AddressProjection address = addressRepository.findByUserId(info.getUserId());

        List<TicketItemDTO> items = ticketItemRepository.findByTicketId(ticketId).stream()
            .map(p -> new TicketItemDTO(p.getTitle(), p.getAmount(), p.getPrice(), p.getResource()))
            .toList();

        AddressDTO addressDTO = new AddressDTO(
            address.getStreetName(),
            address.getExteriorNumber(),
            address.getInteriorNumber(),
            address.getPostalCode(),
            address.getReferences()
        );

        return new TicketDetailsDTO(info.getCart_name(), info.getCart_number(), addressDTO, items);
    }
}
