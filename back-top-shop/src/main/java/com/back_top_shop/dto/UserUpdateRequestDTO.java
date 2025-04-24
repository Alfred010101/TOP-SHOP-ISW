package com.back_top_shop.dto;

public record UserUpdateRequestDTO(
    String firstName,
    String lastName,
    String phone,
    AddressDTO address
) {}
