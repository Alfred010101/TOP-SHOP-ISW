package com.back_top_shop.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.back_top_shop.dto.TicketBasicInfo;
import com.back_top_shop.dto.TicketDTO;
import com.back_top_shop.model.Ticket;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Integer>
{
    List<Ticket> findByFkUser(Integer fkUser);

    @Query(value = """
        SELECT 
            t.id AS id,
            t.date AS date,
            t.status AS status,
            SUM(i.amount) AS units,
            SUM(i.amount * i.price) AS total
        FROM tickets t
        JOIN ticket_items i ON t.id = i.fk_ticket
        JOIN users u ON t.fk_user = u.id
        WHERE u.email = :username
        GROUP BY t.id, t.date, t.status
        ORDER BY t.date DESC
    """, nativeQuery = true)
    List<TicketDTO> findAllByUsername(@Param("username") String username);

    @Query(value = """
        SELECT t.cart_name, t.cart_number, t.fk_user AS userId
        FROM tickets t
        WHERE t.id = :ticketId
        LIMIT 1
    """, nativeQuery = true)
    TicketBasicInfo findTicketBasicInfo(@Param("ticketId") Integer ticketId);


}
