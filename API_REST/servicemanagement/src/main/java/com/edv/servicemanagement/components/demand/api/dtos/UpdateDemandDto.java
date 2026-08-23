package com.edv.servicemanagement.components.demand.api.dtos;

import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateDemandDto {

    @NotNull
    private Long id;

    @NotNull(message = "Description cant be null")
    private String description;

    @NotNull
    private Long productTypeId;

    @NotNull
    private BigDecimal meterValue;

    @NotNull
    private Integer amount;

    @NotNull
    private Double productLength;

    @NotNull
    private Double productHeight;

    @NotNull
    private BigDecimal value;
}
