package com.edv.servicemanagement.components.customer.api.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UpdateCustomerDto {

    @NotNull
    private Long id;

    @NotBlank
    private String name;

    @NotBlank
    private String phone;

    @NotNull
    private Long userId;
}
