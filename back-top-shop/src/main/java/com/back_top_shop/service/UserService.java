package com.back_top_shop.service;

import org.springframework.stereotype.Service;

import com.back_top_shop.model.User;
import com.back_top_shop.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService 
{

    private final UserRepository userRepository;

    public void createUser(User user)
    {
        userRepository.save(user);
    }
}