package com.edv.servicemanagement.components.demand.api.mappers;

import com.edv.servicemanagement.components.customer.api.mappers.CustomerMapper;
import com.edv.servicemanagement.components.demand.api.dtos.DemandGroupDto;
import com.edv.servicemanagement.components.demand.api.dtos.MinDemandGroupDto;
import com.edv.servicemanagement.components.demand.domain.entities.Demand;
import com.edv.servicemanagement.components.demand.domain.entities.DemandGroup;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
@RequiredArgsConstructor
public class DemandGroupMapper {

    private final DemandMapper demandMapper;
    private final CustomerMapper customerMapper;

    public MinDemandGroupDto demandGroupToMinDemandGroupDto(DemandGroup demandGroup){
        MinDemandGroupDto minDemandGroupDto = new MinDemandGroupDto();

        minDemandGroupDto.setId(demandGroup.getId());

        minDemandGroupDto.setCustomerName(demandGroup.getCustomer().getName());

        minDemandGroupDto.setCreated(demandGroup.getCreated());

        minDemandGroupDto.setValue(demandGroup.getDemands().stream().map(Demand::getValue)
                .reduce(BigDecimal.ZERO,BigDecimal::add));

        minDemandGroupDto.setReducedValue(demandGroup.getReducedValue());

        return minDemandGroupDto;
    }

    public DemandGroupDto demanGroupToDemandGroupDto(DemandGroup demandGroup){
        DemandGroupDto demandGroupDto = new DemandGroupDto();

        demandGroupDto.setId(demandGroup.getId());

        demandGroupDto.setCustomer(customerMapper.customerToCustomerDto(demandGroup.getCustomer()));

        demandGroupDto.setCreated(demandGroup.getCreated());

        demandGroupDto.setValue(demandGroup.getDemands().stream().map(Demand::getValue)
                .reduce(BigDecimal.ZERO,BigDecimal::add));

        demandGroupDto.setDemands(demandGroup.getDemands().stream().map(demandMapper::demandToDemandDto).toList());

        demandGroupDto.setReducedValue(demandGroup.getReducedValue());

        return demandGroupDto;
    }

}
