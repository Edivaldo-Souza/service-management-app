package com.edv.servicemanagement.components.demand.api.mappers;

import com.edv.servicemanagement.components.demand.api.dtos.ProductTypeDto;
import com.edv.servicemanagement.components.demand.domain.entities.ProductType;
import org.springframework.stereotype.Component;

@Component
public class ProductTypeMapper {

    public ProductTypeDto productTypeToProductTypeDto(ProductType productType){
        return new ProductTypeDto(productType.getId(), productType.getName(), productType.getValue());
    }

}
