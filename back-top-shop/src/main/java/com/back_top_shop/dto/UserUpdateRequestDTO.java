package com.back_top_shop.dto;

import com.back_top_shop.model.Address;

public record UserUpdateRequestDTO(
    String firstName,
    String lastName,
    String phone,
    AddressDTO address
) {

    public boolean hasNull()
    {
        return firstName == null || firstName.trim().isEmpty() ||  
            lastName == null || lastName.trim().isEmpty() ||
            phone == null || phone.trim().isEmpty() ||
            address == null || 
            address.exteriorNumber() == null || address.exteriorNumber().trim().isEmpty() ||
            address.streetName() == null || address.streetName().trim().isEmpty() ||
            address.postalCode() == null || address.postalCode().trim().isEmpty() ||
            address.references() == null || address.references().trim().isEmpty();
    }

    public Address getObjAddress()
    {
        return Address
            .builder()
            //.id(0)
            .streetName(address.streetName())
            .exteriorNumber(address.exteriorNumber())
            .interiorNumber(address.interiorNumber())
            .postalCode(address.postalCode())
            .references(address.references())
            .build();
    }
}
