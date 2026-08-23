package com.edv.servicemanagement.components.demand.api.dtos;

import com.edv.servicemanagement.components.customer.api.dtos.CustomerDto;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class DemandGroupDto {

    private Long id;

    private CustomerDto customer;

    private LocalDateTime created;

    private BigDecimal value;

    private BigDecimal reducedValue;

    private List<DemandDto> demands;

}
