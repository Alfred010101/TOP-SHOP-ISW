package com.back_top_shop.service;

import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.back_top_shop.dto.UserUpdateRequestDTO;
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

    public Optional<User> findByEmail(String email)
    {
        return userRepository.findByEmail(email);
    }

    public ResponseEntity<?> update(User user, UserUpdateRequestDTO body)
    {
        //User user = userRepository.findByEmail(email).get();
        user.setFirstName(body.firstName());
        user.setLastName(body.lastName());
        user.setPhone(body.phone());
        return ResponseEntity.ok(userRepository.save(user));
    }
}