package com.back_top_shop.dto;

import java.util.List;

public record TicketDetailsDTO(
    String cart_name,
    String cart_number,
    AddressDTO address,
    List<TicketItemDTO> items
) {}
