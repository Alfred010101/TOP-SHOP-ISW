package com.back_top_shop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.back_top_shop.dto.AddressProjection;
import com.back_top_shop.model.Address;

@Repository
public interface AddressRepository extends JpaRepository<Address, Integer> 
{
    @Query(value = """
        SELECT a.street_name AS streetName, a.exterior_number AS exteriorNumber, a.interior_number AS interiorNumber, a.postal_code AS postalCode, a.references
        FROM users u
        JOIN address a ON u.fk_address = a.id
        WHERE u.id = :userId
        LIMIT 1
    """, nativeQuery = true)
    AddressProjection findByUserId(@Param("userId") Integer userId);
}
