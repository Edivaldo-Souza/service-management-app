package com.edv.servicemanagement.components.demand.api.dtos;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
public class MinDemandGroupDto {

    private Long id;

    private String customerName;

    private LocalDateTime created;

    private BigDecimal value;
}
