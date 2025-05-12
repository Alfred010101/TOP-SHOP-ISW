package com.back_top_shop.dto;

import java.time.LocalDateTime;

public interface TicketDTO {
    Long getId();
    LocalDateTime getDate();
    String getStatus();
    int getUnits();
    double getTotal();
}
