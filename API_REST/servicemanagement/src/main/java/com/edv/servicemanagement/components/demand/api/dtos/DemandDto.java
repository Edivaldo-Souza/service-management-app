package com.edv.servicemanagement.components.demand.api.dtos;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
public class DemandDto {

    private Long id;

    private ProductTypeDto productTypeDto;

    private BigDecimal meterValue;

    private String description;

    private Integer amount;

    private Double productLength;

    private Double productHeight;

    private BigDecimal value;

    private LocalDateTime created;

    private LocalDateTime updated;

}
