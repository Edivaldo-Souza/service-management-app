package com.edv.servicemanagement.components.demand.domain.repositories;

import com.edv.servicemanagement.components.demand.domain.entities.Demand;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DemandRepository extends JpaRepository<Demand,Long> {
}
