package com.edv.servicemanagement.components.demand.domain.services.impl;

import com.edv.servicemanagement.commons.exceptions.DomainException;
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
import java.math.RoundingMode;
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
    public Demand create(Demand demand, Long customerId, Long productTypeId){

        validateValues(demand,productTypeId);

        DemandGroup demandGroup = demandGroupService.getByCustomerId(customerId);

        if(productTypeId != null && (demand.getMeterValue()==null || demand.getMeterValue().doubleValue()==0D)){
            demand.setProductType(productTypeService.getById(productTypeId));
        }

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
    public Demand update(Demand demand, Long productTypeId){

        validateValues(demand,productTypeId);

        Demand demandToUpdate = getById(demand.getId());

        if(productTypeId!=null && (demand.getMeterValue()==null || demand.getMeterValue().doubleValue()==0D)){
            ProductType productType = productTypeService.getById(productTypeId);
            demandToUpdate.setProductType(productType);
        }

        if(demand.getMeterValue()!=null && demand.getMeterValue().doubleValue()!=0D){
            demandToUpdate.setProductType(null);
        }

        demandToUpdate.setUpdated(LocalDateTime.now());

        demandToUpdate.setAmount(demand.getAmount());
        demandToUpdate.setDescription(demand.getDescription());
        demandToUpdate.setProductLength(demand.getProductLength());
        demandToUpdate.setProductHeight(demand.getProductHeight());
        demandToUpdate.setMeterValue(demand.getMeterValue());

        return demandRepository.save(demandToUpdate);
    }

    @Override
    @Transactional
    public boolean delete(Long id){
        Demand demand = getById(id);
        demandRepository.delete(demand);
        return true;
    }

    private void validateValues(Demand demand, Long productTypeId){
        if(productTypeId==null && (demand.getMeterValue()==null || demand.getMeterValue().doubleValue()==0D)){
            throw new DomainException("O valor do metro quadrado precisa ser informado");
        }
    }
}
