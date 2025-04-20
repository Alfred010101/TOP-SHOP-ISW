package com.back_top_shop.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.back_top_shop.model.User;
import com.back_top_shop.service.UserService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping()
    public void postMethodName(@RequestBody User user) 
    {
        userService.createUser(user);
    }

    @GetMapping
    public String welcome()
    {
        return "Welcome Spring Security... as user";
    }
    
}
