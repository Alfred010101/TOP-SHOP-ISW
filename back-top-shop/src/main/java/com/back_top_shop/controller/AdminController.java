package com.back_top_shop.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/admin")
public class AdminController 
{
    @GetMapping
    public String welcome()
    {
        return "Welcome Spring Security... as admin";
    }
}
