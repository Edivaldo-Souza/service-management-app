package com.edv.servicemanagement.components.customer.domain.repositories;

import com.edv.servicemanagement.components.customer.domain.entities.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    List<Customer> findByUserId(Long userId);
}
