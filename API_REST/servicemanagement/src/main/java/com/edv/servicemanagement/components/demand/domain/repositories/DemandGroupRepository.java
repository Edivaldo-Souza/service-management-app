package com.edv.servicemanagement.components.demand.domain.repositories;

import com.edv.servicemanagement.components.demand.domain.entities.DemandGroup;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DemandGroupRepository extends JpaRepository<DemandGroup,Long> {
    Optional<DemandGroup> findFirstByCustomerIdAndClosedIsNullOrderByCreated(Long customerId);
    List<DemandGroup> findAllByClosedIsNullAndCustomerUserId(Long userId);
}
