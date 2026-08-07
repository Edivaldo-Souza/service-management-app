package com.edv.servicemanagement.components.demand.domain.repositories;

import com.edv.servicemanagement.components.demand.domain.entities.ProductType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductTypeRepository extends JpaRepository<ProductType,Long> {
    List<ProductType> findAllByIsOutsourced(boolean isOutsourced);
}
