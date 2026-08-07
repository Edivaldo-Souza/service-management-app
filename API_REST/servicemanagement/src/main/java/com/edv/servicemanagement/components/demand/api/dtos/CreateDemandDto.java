package com.edv.servicemanagement.components.demand.api.dtos;

import com.edv.servicemanagement.components.demand.domain.entities.DemandGroup;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class CreateDemandDto {

    private Long demandGroupId;

    private Long customerId;

    private Long productTypeId;

    private String description;

    private Integer amount;

    private Double productLength;

    private Double productHeight;

    private BigDecimal value;

}
