package com.edv.servicemanagement.components.demand.api.restcontrollers;

import com.edv.servicemanagement.commons.ApiResponse;
import com.edv.servicemanagement.commons.ResponseUtil;
import com.edv.servicemanagement.components.demand.api.dtos.CreateDemandDto;
import com.edv.servicemanagement.components.demand.api.dtos.DemandDto;
import com.edv.servicemanagement.components.demand.api.mappers.DemandMapper;
import com.edv.servicemanagement.components.demand.domain.entities.Demand;
import com.edv.servicemanagement.components.demand.domain.services.impl.DemandGroupServiceImpl;
import com.edv.servicemanagement.components.demand.domain.services.impl.DemandServiceImpl;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("v1/demand")
@RequiredArgsConstructor
public class DemandController {

    private final DemandServiceImpl demandService;

    private final DemandMapper demandMapper;

    @PostMapping
    private ResponseEntity<ApiResponse<DemandDto>> create(HttpServletRequest request, @RequestBody CreateDemandDto dto){

        Demand newDemand = demandMapper.createDemandDtoToDemand(dto);

        Demand createdDemand = demandService.create(newDemand, dto.getCustomerId(), dto.getProductTypeId());

        DemandDto createdDemandDto = demandMapper.demandToDemandDto(createdDemand);

        ApiResponse<DemandDto> response = ResponseUtil.success(createdDemandDto,"Demand created",request.getRequestURI());

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

}
