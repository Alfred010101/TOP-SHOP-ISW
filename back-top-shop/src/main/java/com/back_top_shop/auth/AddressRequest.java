package com.back_top_shop.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor 
public class AddressRequest 
{
    private String streetName;
    private String exteriorNumber;
    private String interiorNumber;
    private String postalCode;
    private String references;

}
