package com.back_top_shop.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.back_top_shop.dto.AddressDTO;
import com.back_top_shop.dto.UserDTO;
import com.back_top_shop.dto.UserUpdateRequestDTO;
import com.back_top_shop.model.Address;
import com.back_top_shop.model.User;
import com.back_top_shop.service.AddressService;
import com.back_top_shop.service.UserService;

import lombok.RequiredArgsConstructor;

import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;




@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final AddressService addressService;

    @PostMapping()
    public void createUser(@RequestBody User user) 
    {
        userService.createUser(user);
    }

    @GetMapping
    public String welcome()
    {
        return "Welcome Spring Security... as user";
    }

    @GetMapping("/data")
    public ResponseEntity<UserDTO> getUserData(Authentication authentication) 
    {
        String email = authentication.getName(); 
        Optional<User> user = userService.findByEmail(email);

        if (user.isEmpty()) 
            return ResponseEntity.notFound().build();

        UserDTO dto;

        if (user.get().getAddressId() != null) 
        {
            Optional<Address> address = addressService.findById(user.get().getAddressId());

            if (address.isEmpty()) 
                return ResponseEntity.notFound().build();

            dto = new UserDTO(
                user.get().getFirstName(),
                user.get().getLastName(),
                user.get().getUsername(),
                user.get().getPhone(),
                new AddressDTO(
                    address.get().getStreetName(), 
                    address.get().getExteriorNumber(), 
                    address.get().getInteriorNumber(), 
                    address.get().getPostalCode(), 
                    address.get().getReferences())
            );
        }else{
            dto = new UserDTO(
                user.get().getFirstName(),
                user.get().getLastName(),
                user.get().getUsername(),
                user.get().getPhone(),
                new AddressDTO(
                    "", 
                    "",
                    "", 
                    "", 
                    ""
                )
            );
        }

        return ResponseEntity.ok(dto);
        
    }

    @PutMapping
    public ResponseEntity<?> update(Authentication authentication, @RequestBody UserUpdateRequestDTO request) {
        String email = authentication.getName(); 

        Optional<User> userOptional = userService.findByEmail(email);
        
        if (request.hasNull() ||  userOptional.isEmpty()) 
            return ResponseEntity.notFound().build();

        User user = userOptional.get();

        if (user.getAddressId() == null) 
        {
            ResponseEntity<Address> response = addressService.save(request.getObjAddress());
            if(response.getBody() != null)
                user.setAddressId(response.getBody().getId());
        }
        else
            addressService.update(addressService.findById(user.getAddressId()).get(), request.address());
        
        return userService.update(user, request);
    }

}
