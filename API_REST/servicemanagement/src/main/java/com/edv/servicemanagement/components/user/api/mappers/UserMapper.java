package com.edv.servicemanagement.components.user.api.mappers;

import com.edv.servicemanagement.components.user.api.dtos.CreateUserDto;
import com.edv.servicemanagement.components.user.api.dtos.UserDto;
import com.edv.servicemanagement.components.user.domain.entities.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {
    public User createUserDtoToUser(CreateUserDto createUserDto){
        User user = new User();
        user.setName(createUserDto.getName());
        user.setEmail(createUserDto.getEmail());
        user.setPassword(createUserDto.getPassword());

        return user;
    }

    public UserDto UserToUserDto (User user){
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setEmail(user.getEmail());
        userDto.setName(user.getName());

        return userDto;
    }
}
