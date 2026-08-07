package com.edv.servicemanagement.components.demand.api.dtos;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class DemandGroupDto {

    private Long id;

    private String customerName;

    private LocalDateTime created;

    private BigDecimal value;

    private List<DemandDto> demands;

}
