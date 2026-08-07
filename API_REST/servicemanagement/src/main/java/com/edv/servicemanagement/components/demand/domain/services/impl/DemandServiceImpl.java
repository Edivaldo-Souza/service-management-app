package com.edv.servicemanagement.components.demand.domain.services.impl;

import com.edv.servicemanagement.components.customer.domain.entities.Customer;
import com.edv.servicemanagement.components.customer.domain.services.CustomerServiceImpl;
import com.edv.servicemanagement.components.demand.domain.entities.Demand;
import com.edv.servicemanagement.components.demand.domain.entities.DemandGroup;
import com.edv.servicemanagement.components.demand.domain.repositories.DemandRepository;
import com.edv.servicemanagement.components.demand.domain.services.DemandService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class DemandServiceImpl implements DemandService {

    private final DemandRepository demandRepository;

    private final DemandGroupServiceImpl demandGroupService;

    private final CustomerServiceImpl customerService;

    private final ProductTypeServiceImpl productTypeService;

    @Override
    public Demand getById(Long id) {
        return null;
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
    public Demand update(Demand demand) {
        return null;
    }
}
