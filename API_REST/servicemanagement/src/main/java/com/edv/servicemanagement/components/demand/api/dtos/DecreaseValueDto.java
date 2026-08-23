package com.edv.servicemanagement.components.demand.api.dtos;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class DecreaseValueDto {
    private Long id;
    private BigDecimal reducedValue;
}
