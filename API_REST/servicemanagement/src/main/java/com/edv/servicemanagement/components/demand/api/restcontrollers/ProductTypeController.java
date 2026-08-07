package com.edv.servicemanagement.components.demand.api.restcontrollers;

import com.edv.servicemanagement.commons.ApiResponse;
import com.edv.servicemanagement.commons.ResponseUtil;
import com.edv.servicemanagement.components.demand.api.dtos.ProductTypeDto;
import com.edv.servicemanagement.components.demand.api.mappers.ProductTypeMapper;
import com.edv.servicemanagement.components.demand.domain.entities.ProductType;
import com.edv.servicemanagement.components.demand.domain.services.impl.ProductTypeServiceImpl;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("v1/product-type")
@RequiredArgsConstructor
public class ProductTypeController {

    private final ProductTypeServiceImpl productTypeService;
    private final ProductTypeMapper productTypeMapper;

    @GetMapping
    private ResponseEntity<ApiResponse<List<ProductTypeDto>>> getByIsOutsourced(@RequestParam Boolean isOutsourced,
                                                                                HttpServletRequest request){

        List<ProductType> productTypeList = productTypeService.getByIsOutsourced(isOutsourced);

        List<ProductTypeDto> productTypeDtoList = productTypeList.stream()
                .map(productTypeMapper::productTypeToProductTypeDto).toList();

        ApiResponse<List<ProductTypeDto>> response = ResponseUtil.success(
                productTypeDtoList,
                "ProductTypes found",
                request.getRequestURI());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    private ResponseEntity<ApiResponse<ProductTypeDto>> getById(HttpServletRequest request, @PathVariable("id") Long id){

        ProductType productType = productTypeService.getById(id);

        ProductTypeDto productTypeDto = productTypeMapper.productTypeToProductTypeDto(productType);

        ApiResponse<ProductTypeDto> response = ResponseUtil.success(productTypeDto,"Product type found",request.getRequestURI());

        return new ResponseEntity<>(response,HttpStatus.OK);
    }

}
