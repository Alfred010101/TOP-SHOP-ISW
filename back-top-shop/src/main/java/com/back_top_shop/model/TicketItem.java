package com.back_top_shop.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "ticket_items")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TicketItem 
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "fk_ticket")
    private Integer fkTicket;

    @Column(name = "fk_tshirt")
    private Integer fkTshirt;

    @Column(name = "title")
    private String title;

    @Column(name = "amount")
    private Integer amount;

    @Column(name = "price")
    private Double price;
}
