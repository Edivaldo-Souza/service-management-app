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

    public String signIn(LoginDto loginDto) throws AuthenticationException{

        var userEmail = loginDto.getEmail();

        var password = loginDto.getPassword();

        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userEmail,password));

        return tokenService.generateToken(loginDto.getEmail());
    }
}
