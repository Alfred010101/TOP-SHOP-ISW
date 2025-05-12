package com.back_top_shop.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.back_top_shop.dto.TicketItemProjection;
import com.back_top_shop.model.TicketItem;

@Repository
public interface TicketItemRepository extends JpaRepository<TicketItem, Long>  
{
    @Query(value = """
        SELECT ti.title, ti.amount, ti.price, t.resource
        FROM ticket_items ti
        JOIN tshirts t ON t.id = ti.fk_tshirt
        WHERE ti.fk_ticket = :ticketId
    """, nativeQuery = true)
    List<TicketItemProjection> findByTicketId(@Param("ticketId") Integer ticketId);
}
