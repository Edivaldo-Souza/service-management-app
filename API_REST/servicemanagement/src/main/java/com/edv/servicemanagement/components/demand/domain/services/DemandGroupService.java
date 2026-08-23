package com.edv.servicemanagement.components.demand.domain.services;

import com.edv.servicemanagement.components.demand.domain.entities.DemandGroup;
import com.edv.servicemanagement.components.user.domain.entities.User;

import java.math.BigDecimal;
import java.util.List;

public interface DemandGroupService {
    DemandGroup getById (Long id);
    DemandGroup getByCustomerId(Long customerId);
    List<DemandGroup> getAllNotClosedAndByUser(User user);
    DemandGroup create (DemandGroup demandGroup);
    DemandGroup update (DemandGroup demandGroup);
    void decreaseValue(BigDecimal reducedValue,Long id);
}
