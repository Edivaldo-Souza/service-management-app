package com.edv.servicemanagement.components.demand.domain.services;

import com.edv.servicemanagement.components.demand.domain.entities.ProductType;

import java.util.List;

public interface ProductTypeService {
    List<ProductType> getByIsOutsourced(boolean isOutsourced);
    ProductType getById(Long id);
}
