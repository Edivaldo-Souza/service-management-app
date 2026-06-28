package com.edv.servicemanagement.components.authentication.services;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.interfaces.DecodedJWT;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.Date;

@Service
@RequiredArgsConstructor
public class TokenService {

    @Value("${api.security.token.secret}")
    private String secret;

    private final Long EXPIRATION_TIME = 43200000L;

    private final UserDetailsService userDetailsService;

    public String generateToken(String email){
        try{
            Algorithm algorithm = Algorithm.HMAC512(secret);

            String uri = ServletUriComponentsBuilder.fromCurrentContextPath().toUriString();

            String token = JWT.create()
                    .withSubject(email)
                    .withExpiresAt(generateValidity())
                    .withIssuer(uri)
                    .sign(algorithm)
                    .strip();

            return token;
        }
        catch (JWTCreationException exception){
            throw new RuntimeException("Token creation failed: "+ exception);
        }
    }

    public boolean validateToken(String token){
        DecodedJWT decodedJWT = JWT.decode(token);
        try{
            return !decodedJWT.getExpiresAt().before(new Date());
        }
        catch (JWTDecodeException exception){
            throw new RuntimeException("Invalid Token",exception);
        }
    }

    public DecodedJWT decodeToken(String token){
        Algorithm algorithm = Algorithm.HMAC512(secret);
        JWTVerifier verifier = JWT.require(algorithm).build();
        return verifier.verify(token);
    }

    public Authentication getAuthentication(String token){
        DecodedJWT decodedJWT = JWT.decode(token);
        UserDetails userDetails = userDetailsService.loadUserByUsername(decodedJWT.getSubject());
        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }

    public Date generateValidity(){
        Date date = new Date();
        return new Date(date.getTime()+EXPIRATION_TIME);
    }
}
