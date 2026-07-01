package com.edv.servicemanagement.components.authentication.api.restcontrollers;

import com.edv.servicemanagement.components.authentication.api.dtos.LoginDto;
import com.edv.servicemanagement.components.authentication.services.AuthenticationService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.edv.servicemanagement.commons.ResponseConstants;

@RestController
@RequestMapping("v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping
    private ResponseEntity<Void> signIn(HttpServletRequest request, @RequestBody LoginDto dto){

        String token = authenticationService.signIn(dto);

        ResponseCookie responseCookie = ResponseCookie.from("accessToken",token)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(ResponseConstants.TOKEN_MAX_AGE.ordinal())
                .build();

        return ResponseEntity.noContent().header(HttpHeaders.SET_COOKIE, responseCookie.toString()).build();

    }




}
