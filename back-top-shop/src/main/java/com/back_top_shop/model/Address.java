package com.back_top_shop.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "address")
public class Address 
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "street_name", nullable = false, length = 100)
    private String streetName;

    @Column(name = "exterior_number", nullable = false, length = 10)
    private String exteriorNumber;

    @Column(name = "interior_number", nullable = true, length = 10)
    private String interiorNumber;

    @Column(name = "postal_code", nullable = false, length = 5)
    private String postalCode;

    @Column(name = "`references`", nullable = true, length = 255)
    private String references;

}
