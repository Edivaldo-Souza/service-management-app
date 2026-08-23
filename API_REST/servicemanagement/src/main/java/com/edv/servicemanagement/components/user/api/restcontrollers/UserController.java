package com.edv.servicemanagement.components.user.api.restcontrollers;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.edv.servicemanagement.commons.ApiResponse;
import com.edv.servicemanagement.commons.ResponseConstants;
import com.edv.servicemanagement.commons.ResponseUtil;
import com.edv.servicemanagement.components.authentication.services.TokenService;
import com.edv.servicemanagement.components.user.api.dtos.CreateUserDto;
import com.edv.servicemanagement.components.user.api.dtos.UpdateUserDto;
import com.edv.servicemanagement.components.user.api.dtos.UserDto;
import com.edv.servicemanagement.components.user.api.mappers.UserMapper;
import com.edv.servicemanagement.components.user.domain.entities.User;
import com.edv.servicemanagement.components.user.domain.services.impl.UserServiceImpl;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("v1/user")
@RequiredArgsConstructor
public class UserController {

    private final UserMapper userMapper;
    private final UserServiceImpl userService;
    private final TokenService tokenService;

    @GetMapping
    private ResponseEntity<ApiResponse<UserDto>> getUser (
            HttpServletRequest request,
            @CookieValue("accessToken") String token
    ){
        User currentUser = userService.getByToken(token);
        UserDto userDto = userMapper.UserToUserDto(currentUser);

        ApiResponse<UserDto> response = ResponseUtil.success(userDto,"User found",request.getRequestURI());

        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @PostMapping(consumes = {"multipart/form-data"})
    private ResponseEntity<ApiResponse<UserDto>> createUser(
            HttpServletRequest request,
            MultipartHttpServletRequest multipartRequest,
            @RequestPart("data") CreateUserDto dto
            ){

        MultipartFile file = multipartRequest.getFile("invoice");

        User user = userMapper.createUserDtoToUser(dto);

        User newUser = userService.create(user,file);

        UserDto newUserDto = userMapper.UserToUserDto(newUser);

        ApiResponse<UserDto> response = ResponseUtil.success(newUserDto,"User created", request.getRequestURI());

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PutMapping(consumes = {"multipart/form-data"})
    private ResponseEntity<ApiResponse<UserDto>> updateUser(
            HttpServletRequest request,
            MultipartHttpServletRequest multipartRequest,
            @RequestPart("data") UpdateUserDto dto){

        String currentEmail = userService.getById(dto.getId()).getEmail();

        Optional<String> token = tokenService.extractJwtFromCookie(request);

        if(token.isPresent()){

            DecodedJWT decodedJWT = tokenService.decodeToken(token.get());

            if(!currentEmail.equals(decodedJWT.getSubject())){
                throw new RuntimeException("Only the owner of the user data can modify his data");
            }
        }

        User user = userMapper.updateUserDtoToUser(dto);

        User updatedUser = userService.update(user,multipartRequest.getFile("invoice"));

        UserDto updatedUserDto = userMapper.UserToUserDto(updatedUser);

        ResponseEntity.BodyBuilder responseBuilder = ResponseEntity.ok();

        if(!updatedUserDto.getEmail().equals(currentEmail)){

            int maxAge = 7 * 24 * 60 * 60;

            String newToken = tokenService.generateToken(updatedUserDto.getEmail());

            ResponseCookie responseCookie = ResponseCookie.from("accessToken",newToken)
                    .httpOnly(true)
                    .secure(true)
                    .path("/")
                    .maxAge(maxAge)
                    .build();

            responseBuilder.header(HttpHeaders.SET_COOKIE,responseCookie.toString());
        }

        ApiResponse<UserDto> response = ResponseUtil.success(updatedUserDto,"User updated", request.getRequestURI());

        return responseBuilder.body(response);
    }
}
