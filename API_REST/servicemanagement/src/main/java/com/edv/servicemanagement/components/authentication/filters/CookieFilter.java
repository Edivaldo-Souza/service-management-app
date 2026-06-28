package com.edv.servicemanagement.components.authentication.filters;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.edv.servicemanagement.components.authentication.services.TokenService;
import com.edv.servicemanagement.components.authentication.services.UserDetailsServiceImpl;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class CookieFilter extends OncePerRequestFilter {

    private final UserDetailsServiceImpl userDetailsService;

    private final TokenService tokenService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        Optional<String> jwt = extractJwtFromCookie(request);

        jwt.ifPresent(token ->{
            if(tokenService.validateToken(token)){

                DecodedJWT decodedJWT = tokenService.decodeToken(token);

                String userEmail = decodedJWT.getSignature();

                UserDetails userDetails = userDetailsService.loadUserByUsername(userEmail);

                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                    userDetails,
                    null,
                    userDetails.getAuthorities()
                );

                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(authentication);

            }
        });

        filterChain.doFilter(request,response);

    }

    private Optional<String> extractJwtFromCookie(HttpServletRequest request){

        if(request.getCookies()==null){

            return Optional.empty();

        }

        return Arrays.stream(request.getCookies())
                .filter(cookie -> "accessToken".equals(cookie.getName()))
                .map(Cookie::getValue)
                .findFirst();

    }
}
