package com.edv.servicemanagement.components.demand.api.mappers;

import com.edv.servicemanagement.components.demand.api.dtos.CreateDemandDto;
import com.edv.servicemanagement.components.demand.api.dtos.DemandDto;
import com.edv.servicemanagement.components.demand.api.dtos.UpdateDemandDto;
import com.edv.servicemanagement.components.demand.domain.entities.Demand;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.math.RoundingMode;

@Component
@RequiredArgsConstructor
public class DemandMapper {

    private final ProductTypeMapper productTypeMapper;

    public Demand createDemandDtoToDemand(CreateDemandDto createDemandDto){
        Demand demand = new Demand();

        demand.setDescription(createDemandDto.getDescription());
        demand.setValue(createDemandDto.getValue().setScale(2, RoundingMode.HALF_UP));
        if(createDemandDto.getMeterValue()!=null){
            demand.setMeterValue(createDemandDto.getMeterValue());
        }
        demand.setAmount(createDemandDto.getAmount());
        demand.setProductHeight(createDemandDto.getProductHeight());
        demand.setProductLength(createDemandDto.getProductLength());

        return demand;
    }

    public Demand updateDemandDtoToDemand(UpdateDemandDto updateDemandDto){
        Demand demand = new Demand();

        demand.setId(updateDemandDto.getId());
        demand.setDescription(updateDemandDto.getDescription());
        demand.setValue(updateDemandDto.getValue().setScale(2, RoundingMode.HALF_UP));
        if(updateDemandDto.getMeterValue()!=null){
            demand.setMeterValue(updateDemandDto.getMeterValue());
        }
        demand.setAmount(updateDemandDto.getAmount());
        demand.setProductHeight(updateDemandDto.getProductHeight());
        demand.setProductLength(updateDemandDto.getProductLength());

        return demand;
    }

    public DemandDto demandToDemandDto(Demand demand){
        DemandDto demandDto = new DemandDto();

        demandDto.setId(demand.getId());
        demandDto.setProductTypeDto(productTypeMapper.productTypeToProductTypeDto(demand.getProductType()));
        demandDto.setMeterValue(demand.getMeterValue());
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
