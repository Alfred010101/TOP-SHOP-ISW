package com.back_top_shop.repository;

import com.back_top_shop.model.TShirt;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TShirtRepository extends JpaRepository<TShirt, Long> {

    @Query(value = "SELECT * FROM tshirts ORDER BY id DESC LIMIT 6", 
        nativeQuery = true)
    List<TShirt> findLast();
}
