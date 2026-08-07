package com.edv.servicemanagement.components.demand.domain.services;

import com.edv.servicemanagement.components.demand.domain.entities.DemandGroup;

public interface DemandGroupService {
    DemandGroup getById (Long id);
    DemandGroup getByCustomerId(Long customerId);
    DemandGroup create (DemandGroup demandGroup);
}
