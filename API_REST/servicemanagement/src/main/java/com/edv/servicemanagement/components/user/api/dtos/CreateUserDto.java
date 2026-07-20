package com.edv.servicemanagement.components.user.api.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Null;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CreateUserDto {

    @NotBlank(message = "Username can't be blank")
    @NotNull
    private String name;

    @NotBlank(message = "Password can't be blank")
    @NotNull
    private String password;

    @NotBlank(message = "Email can't be blank")
    @NotNull
    private String email;

}
