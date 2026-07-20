package com.edv.servicemanagement.components.user.api.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UpdateUserDto {

    @NotNull(message = "Id can't be null")
    private Long id;

    @NotBlank(message = "Username can't be blank")
    private String name;

    private String password;

    @NotBlank(message = "Email can't be blank")
    private String email;

}
