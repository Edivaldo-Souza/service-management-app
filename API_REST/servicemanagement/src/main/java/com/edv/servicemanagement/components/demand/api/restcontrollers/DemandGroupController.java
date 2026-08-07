package com.edv.servicemanagement.components.demand.api.restcontrollers;

import com.edv.servicemanagement.commons.ApiResponse;
import com.edv.servicemanagement.commons.ResponseUtil;
import com.edv.servicemanagement.components.demand.api.dtos.DemandGroupDto;
import com.edv.servicemanagement.components.demand.api.dtos.MinDemandGroupDto;
import com.edv.servicemanagement.components.demand.api.mappers.DemandGroupMapper;
import com.edv.servicemanagement.components.demand.domain.entities.DemandGroup;
import com.edv.servicemanagement.components.demand.domain.services.impl.DemandGroupServiceImpl;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("v1/demand-group")
@RequiredArgsConstructor
public class DemandGroupController {

    private final DemandGroupServiceImpl demandGroupService;
    private final DemandGroupMapper demandGroupMapper;

    @GetMapping
    private ResponseEntity<ApiResponse<List<MinDemandGroupDto>>> getAll(HttpServletRequest request){

        List<DemandGroup> demandGroups = demandGroupService.getAllNotClosed();

        List<MinDemandGroupDto> minDemandGroupDtoList = demandGroups.stream()
                .map(demandGroupMapper::demandGroupToMinDemandGroupDto).toList();

        ApiResponse<List<MinDemandGroupDto>> response = ResponseUtil.success(minDemandGroupDtoList,"Demands found",request.getRequestURI());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    private ResponseEntity<ApiResponse<DemandGroupDto>> getById(HttpServletRequest request, @PathVariable("id") Long id){
        DemandGroup demandGroup = demandGroupService.getById(id);

        DemandGroupDto demandGroupDto = demandGroupMapper.demanGroupToDemandGroupDto(demandGroup);

        ApiResponse<DemandGroupDto> response = ResponseUtil.success(demandGroupDto,"DemandGroup found",request.getRequestURI());

        return new ResponseEntity<>(response,HttpStatus.OK);
    }
}
