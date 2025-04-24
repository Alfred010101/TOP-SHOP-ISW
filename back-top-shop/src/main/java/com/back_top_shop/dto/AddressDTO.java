package com.back_top_shop.dto;

public record AddressDTO (
    String streetName,
    String exteriorNumber,
    String interiorNumber,
    String postalCode,
    String references
){}
