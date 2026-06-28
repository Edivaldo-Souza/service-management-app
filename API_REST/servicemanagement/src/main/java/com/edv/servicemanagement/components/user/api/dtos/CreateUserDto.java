package com.edv.servicemanagement.components.user.api.dtos;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CreateUserDto {

    private String name;

    private String password;

    private String email;

}
