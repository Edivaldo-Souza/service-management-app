package com.edv.servicemanagement.components.customer.domain.services;

import com.edv.servicemanagement.components.customer.domain.entities.Customer;
import com.edv.servicemanagement.components.user.domain.entities.User;

import java.util.List;

public interface CustomerService {
    Customer getById(Long id);
    List<Customer> getByUserId(Long id);
    Customer create(Customer customer, User user);
    Customer update(Customer customer, User user);
    boolean delete (Long id);
}
