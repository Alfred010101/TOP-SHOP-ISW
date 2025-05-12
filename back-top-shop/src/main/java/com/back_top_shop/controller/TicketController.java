package com.back_top_shop.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.back_top_shop.dto.TicketDTO;
import com.back_top_shop.dto.TicketDetailsDTO;
import com.back_top_shop.service.TicketService;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/user/tickets")
@RequiredArgsConstructor
public class TicketController {
    private final TicketService ticketService;

    @GetMapping()
    public List<TicketDTO> getUserTickets(@RequestParam String username) 
    {
        return ticketService.findAllByUsername(username);
    }

    @GetMapping("/full/{id}")
    public ResponseEntity<TicketDetailsDTO> getFullTicket(@PathVariable("id") Integer ticketId) 
    {
        System.out.println(ticketId);
        try {
            TicketDetailsDTO dto = ticketService.getTicketDetails(ticketId);
            return ResponseEntity.ok(dto);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
