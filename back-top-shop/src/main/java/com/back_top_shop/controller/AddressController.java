package com.back_top_shop.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/address")
public class AddressController 
{
    @GetMapping("/data")
    public String getAddressData() {
        return new String();
    }
}
