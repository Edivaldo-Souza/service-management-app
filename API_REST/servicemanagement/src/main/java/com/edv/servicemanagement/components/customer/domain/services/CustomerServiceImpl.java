package com.edv.servicemanagement.components.customer.domain.services;

import com.edv.servicemanagement.commons.exceptions.ResourceNotFoundException;
import com.edv.servicemanagement.components.customer.domain.entities.Customer;
import com.edv.servicemanagement.components.customer.domain.repositories.CustomerRepository;
import com.edv.servicemanagement.components.user.domain.entities.User;
import com.edv.servicemanagement.components.user.domain.services.UserServiceImpl;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;
    private final UserServiceImpl userService;

    @Override
    public Customer getById(Long id) {
        Optional<Customer> customerOptional = customerRepository.findById(id);
        if (customerOptional.isEmpty()) {
            throw new ResourceNotFoundException("Unable to find customer with id = " + id);
        }
        return customerOptional.get();
    }

    @Override
    public List<Customer> getByUserId(Long id) {
        return customerRepository.findByUserId(id);
    }

    @Override
    public Customer create(Customer customer, User user) {

        customer.setUserId(user.getId());

        return customerRepository.save(customer);
    }

    @Override
    public Customer update(Customer customer, User user) {
        getById(customer.getId());

        customer.setUserId(user.getId());

        return customerRepository.save(customer);
    }

    @Override
    @Transactional
    public boolean delete(Long id) {
        Customer customer = getById(id);
        customerRepository.delete(customer);
        return true;
    }
}
