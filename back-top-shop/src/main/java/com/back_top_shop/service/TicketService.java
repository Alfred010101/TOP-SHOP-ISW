package com.back_top_shop.service;

import org.springframework.stereotype.Service;

import com.back_top_shop.dto.PaymentRequestDTO;
import com.back_top_shop.model.Ticket;
import com.back_top_shop.model.User;
import com.back_top_shop.repository.TicketRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TicketService 
{
    private final TicketRepository ticketRepository;
    private final UserService userService;

    public void createTicket(PaymentRequestDTO request)
    {
        User user = userService.findByEmail(request.getUsername()).orElse(null);
        Ticket ticket = new Ticket();
        ticket.setFkUser(user.getId());
        ticket.setCartName(request.getCartName());
        ticket.setCartNumber(request.getCartNumber());
        ticket = ticketRepository.save(ticket); 
    }
}
