package com.edv.servicemanagement.components.demand.domain.services.impl;

import com.edv.servicemanagement.commons.exceptions.ResourceNotFoundException;
import com.edv.servicemanagement.components.demand.domain.entities.Demand;
import com.edv.servicemanagement.components.demand.domain.entities.DemandGroup;
import com.edv.servicemanagement.components.demand.domain.repositories.DemandGroupRepository;
import com.edv.servicemanagement.components.demand.domain.services.DemandGroupService;
import com.edv.servicemanagement.components.user.domain.entities.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DemandGroupServiceImpl implements DemandGroupService {

    private final DemandGroupRepository demandGroupRepository;

    @Override
    public DemandGroup getById(Long id) {

        Optional<DemandGroup> demandGroup = demandGroupRepository.findById(id);

        if(demandGroup.isPresent()){

            demandGroup.get().getDemands().size();

            return demandGroup.get();

        }

        return null;
    }

    @Override
    public List<DemandGroup> getAllNotClosedAndByUser(User user){
        List<DemandGroup> demandGroupList = demandGroupRepository.findAllByClosedIsNullAndCustomerUserId(user.getId());

        demandGroupList.forEach(demandGroup -> demandGroup.getDemands().size());

        return demandGroupList;
    }

    @Override
    public DemandGroup getByCustomerId(Long customerId){
        Optional<DemandGroup> demandGroup = demandGroupRepository.findFirstByCustomerIdAndClosedIsNullOrderByCreated(customerId);

        return demandGroup.orElse(null);
    }

    @Override
    public DemandGroup create(DemandGroup demandGroup) {
        return demandGroupRepository.save(demandGroup);
    }

    @Override
    public DemandGroup update(DemandGroup demandGroup) { return demandGroupRepository.save(demandGroup);}

    @Override
    public void decreaseValue(BigDecimal reducedValue,Long id){

        DemandGroup demandGroup = getById(id);

        if(demandGroup.getReducedValue()==null){
            demandGroup.setReducedValue(reducedValue);
        }
        else{
            demandGroup.setReducedValue(demandGroup.getReducedValue().add(reducedValue));
        }

        BigDecimal demandGroupValue = demandGroup.getDemands().stream().map(Demand::getValue)
                .reduce(BigDecimal.ZERO,BigDecimal::add);

        if(demandGroupValue.subtract(demandGroup.getReducedValue()).doubleValue()<=0){
            demandGroup.setClosed(LocalDateTime.now());
        }

        demandGroupRepository.save(demandGroup);
    }
}
