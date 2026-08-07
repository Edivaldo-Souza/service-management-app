package com.edv.servicemanagement.components.demand.domain.services.impl;

import com.edv.servicemanagement.commons.exceptions.ResourceNotFoundException;
import com.edv.servicemanagement.components.demand.domain.entities.ProductType;
import com.edv.servicemanagement.components.demand.domain.repositories.ProductTypeRepository;
import com.edv.servicemanagement.components.demand.domain.services.ProductTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductTypeServiceImpl implements ProductTypeService {

    private final ProductTypeRepository productTypeRepository;

    @Override
    public List<ProductType> getByIsOutsourced(boolean isOutsourced) {
        return productTypeRepository.findAllByIsOutsourced(isOutsourced);
    }

    @Override
    public ProductType getById(Long id){
        Optional<ProductType> productTypeOptional = productTypeRepository.findById(id);

        if(productTypeOptional.isEmpty()){
            throw new ResourceNotFoundException("Could not find productType with id:"+id);
        }

        return productTypeOptional.get();
    }
}
