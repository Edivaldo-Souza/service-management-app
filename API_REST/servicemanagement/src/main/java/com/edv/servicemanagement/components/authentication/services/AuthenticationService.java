package com.edv.servicemanagement.components.authentication.services;

import com.edv.servicemanagement.components.authentication.api.dtos.LoginDto;
import com.edv.servicemanagement.components.user.domain.entities.User;
import com.edv.servicemanagement.components.user.domain.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final AuthenticationManager authenticationManager;

    private final TokenService tokenService;

    private final UserRepository userRepository;

    public String signIn(LoginDto loginDto){
        try{

            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginDto.getEmail(),loginDto.getPassword()));

            return loginDto.getEmail();

        }
        catch (AuthenticationException exception){

            throw new RuntimeException("Invalid credentials",exception);

        }
    }
}
