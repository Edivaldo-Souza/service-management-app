package com.edv.servicemanagement.components.demand.domain.services.impl;

import com.edv.servicemanagement.commons.exceptions.ResourceNotFoundException;
import com.edv.servicemanagement.components.demand.domain.entities.DemandGroup;
import com.edv.servicemanagement.components.demand.domain.repositories.DemandGroupRepository;
import com.edv.servicemanagement.components.demand.domain.services.DemandGroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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

    public List<DemandGroup> getAllNotClosed(){
        List<DemandGroup> demandGroupList = demandGroupRepository.findAllByClosedIsNull();

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
}
