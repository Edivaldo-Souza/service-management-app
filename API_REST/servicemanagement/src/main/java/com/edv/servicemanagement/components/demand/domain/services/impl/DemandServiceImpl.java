package com.edv.servicemanagement.components.demand.domain.services.impl;

import com.edv.servicemanagement.commons.exceptions.ResourceNotFoundException;
import com.edv.servicemanagement.components.customer.domain.entities.Customer;
import com.edv.servicemanagement.components.customer.domain.services.CustomerServiceImpl;
import com.edv.servicemanagement.components.demand.domain.entities.Demand;
import com.edv.servicemanagement.components.demand.domain.entities.DemandGroup;
import com.edv.servicemanagement.components.demand.domain.entities.ProductType;
import com.edv.servicemanagement.components.demand.domain.repositories.DemandRepository;
import com.edv.servicemanagement.components.demand.domain.services.DemandService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DemandServiceImpl implements DemandService {

    private final DemandRepository demandRepository;

    private final DemandGroupServiceImpl demandGroupService;

    private final CustomerServiceImpl customerService;

    private final ProductTypeServiceImpl productTypeService;

    @Override
    public Demand getById(Long id) {
        Optional<Demand> demandOptional = demandRepository.findById(id);

        if(demandOptional.isEmpty()){
            throw new ResourceNotFoundException("Unable to find demand with id: "+id);
        }

        return demandOptional.get();
    }

    @Override
    public Demand create(Demand demand, Long customerId, Long productTypeId) {

        DemandGroup demandGroup = demandGroupService.getByCustomerId(customerId);

        demand.setProductType(productTypeService.getById(productTypeId));

        if(demandGroup != null){

            demandGroup.setUpdated(LocalDateTime.now());

            demand.setDemandGroup(demandGroup);
        }
        else{

            DemandGroup newDemandGroup = new DemandGroup();

            Customer customer = customerService.getById(customerId);

            newDemandGroup.setCustomer(customer);

            newDemandGroup.setCreated(LocalDateTime.now());

            newDemandGroup.setUpdated(LocalDateTime.now());

            demand.setDemandGroup(demandGroupService.create(newDemandGroup));

        }

        demand.setCreated(LocalDateTime.now());

        demand.setUpdated(LocalDateTime.now());

        return demandRepository.save(demand);
    }

    @Override
    @Transactional
    public Demand update(Demand demand, Long productTypeId) {

        Demand demandToUpdate = getById(demand.getId());

        ProductType productType = productTypeService.getById(productTypeId);

        demandToUpdate.setUpdated(LocalDateTime.now());
        demandToUpdate.setProductType(productType);

        demandToUpdate.setAmount(demand.getAmount());
        demandToUpdate.setDescription(demand.getDescription());
        demandToUpdate.setProductLength(demand.getProductLength());
        demandToUpdate.setProductHeight(demand.getProductHeight());
        demandToUpdate.setMeterValue(demand.getMeterValue());
        demandToUpdate.setValue(demand.getValue());

        return demandRepository.save(demandToUpdate);
    }
}
