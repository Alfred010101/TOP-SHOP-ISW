package com.back_top_shop.dto;

public record UserDTO(
    String firstName,
    String lastName,
    String email,
    String phone,
    AddressDTO address
) {}
