package com.edv.servicemanagement.components.demand.domain.services;

import com.edv.servicemanagement.components.demand.domain.entities.Demand;

public interface DemandService {
    Demand getById(Long id);
    Demand create(Demand demand, Long customerId,Long productTypeId);
    Demand update(Demand demand, Long productTypeId);
    boolean delete(Long id);
}
