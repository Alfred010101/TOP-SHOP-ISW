package com.back_top_shop.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.back_top_shop.dto.TicketDTO;
import com.back_top_shop.service.TicketService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/user/tickets")
@RequiredArgsConstructor
public class TicketController {
    private final TicketService ticketService;

    @GetMapping()
        public List<TicketDTO> getUserTickets(@RequestParam String username) 
        {
            System.out.println(username);
            System.out.println(ticketService);
            return ticketService.findAllByUsername(username);
        }
}
