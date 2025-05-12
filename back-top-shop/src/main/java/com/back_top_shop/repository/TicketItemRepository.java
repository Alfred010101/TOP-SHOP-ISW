package com.back_top_shop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.back_top_shop.model.TicketItem;

@Repository
public interface TicketItemRepository extends JpaRepository<TicketItem, Long>  {
    
}
