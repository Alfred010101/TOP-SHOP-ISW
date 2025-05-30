package com.back_top_shop.auth;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.back_top_shop.model.User;
import com.back_top_shop.jwt.JwtService;
import com.back_top_shop.model.Role;
import com.back_top_shop.repository.UserRepository;
import com.back_top_shop.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService 
{

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final UserService userService;

    public ResponseEntity<?> login(LoginRequest request) 
    {
    //    authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        try {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
            );
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales incorrectas");
        }

        UserDetails user = userRepository.findByUsername(request.getUsername()).orElseThrow();

        return ResponseEntity.ok(AuthResponse.builder()
            .token(jwtService.getToken(user))
            .build()
        );
        /*return ResponseEntity.status(HttpStatus.OK).body(jwtService.getToken(user));
        return AuthResponse.builder()
            .token(jwtService.getToken(user))
            .build();*/
    }

    public AuthResponse register(RegisterRequest request) 
    {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("El usuario ya existe");
        }

        User user = User.builder()
            .username(request.getUsername())
            .password(passwordEncoder.encode(request.getPassword()))
            .firstName(request.getFirstName())
            .lastName(request.getLastName())
            .phone(request.getPhone())
            .role(Role.CUSTOMER)
            .build();

        userService.createUser(user);

        return AuthResponse.builder()
            .token(jwtService.getToken(user))
            .build();
    }
}
