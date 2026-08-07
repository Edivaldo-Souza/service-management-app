package com.edv.servicemanagement.components.demand.api.mappers;

import com.edv.servicemanagement.components.demand.api.dtos.CreateDemandDto;
import com.edv.servicemanagement.components.demand.api.dtos.DemandDto;
import com.edv.servicemanagement.components.demand.domain.entities.Demand;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DemandMapper {

    private final ProductTypeMapper productTypeMapper;

    public Demand createDemandDtoToDemand(CreateDemandDto createDemandDto){
        Demand demand = new Demand();

        demand.setDescription(createDemandDto.getDescription());
        demand.setValue(createDemandDto.getValue());
        demand.setAmount(createDemandDto.getAmount());
        demand.setProductHeight(createDemandDto.getProductHeight());
        demand.setProductLength(createDemandDto.getProductLength());

        return demand;
    }

    public DemandDto demandToDemandDto(Demand demand){
        DemandDto demandDto = new DemandDto();

        demandDto.setId(demand.getId());
        demandDto.setProductTypeDto(productTypeMapper.productTypeToProductTypeDto(demand.getProductType()));
        demandDto.setDescription(demand.getDescription());
        demandDto.setAmount(demand.getAmount());
        demandDto.setProductHeight(demand.getProductHeight());
        demandDto.setProductLength(demand.getProductLength());
        demandDto.setValue(demand.getValue());
        demandDto.setCreated(demand.getCreated());
        demandDto.setUpdated(demand.getUpdated());

        return demandDto;
    }
}
