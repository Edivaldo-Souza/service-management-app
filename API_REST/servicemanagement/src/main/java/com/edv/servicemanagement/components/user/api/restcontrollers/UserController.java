package com.edv.servicemanagement.components.user.api.restcontrollers;

import com.edv.servicemanagement.commons.ApiResponse;
import com.edv.servicemanagement.commons.ResponseUtil;
import com.edv.servicemanagement.components.user.api.dtos.CreateUserDto;
import com.edv.servicemanagement.components.user.api.dtos.UserDto;
import com.edv.servicemanagement.components.user.api.mappers.UserMapper;
import com.edv.servicemanagement.components.user.domain.entities.User;
import com.edv.servicemanagement.components.user.domain.services.UserServiceImpl;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("v1/user")
@RequiredArgsConstructor
public class UserController {

    private final UserMapper userMapper;
    private final UserServiceImpl userService;

    @PostMapping
    private ResponseEntity<ApiResponse<UserDto>> createUser(HttpServletRequest request, @RequestBody CreateUserDto dto){

        User user = userMapper.createUserDtoToUser(dto);

        User newUser = userService.create(user);

        UserDto newUserDto = userMapper.UserToUserDto(newUser);

        ApiResponse<UserDto> response = ResponseUtil.success(newUserDto,"User created", request.getRequestURI());

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
}
