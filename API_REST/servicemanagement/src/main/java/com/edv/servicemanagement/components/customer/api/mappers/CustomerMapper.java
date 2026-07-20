package com.edv.servicemanagement.components.customer.api.mappers;

import com.edv.servicemanagement.components.customer.api.dtos.CreateCustomerDto;
import com.edv.servicemanagement.components.customer.api.dtos.CustomerDto;
import com.edv.servicemanagement.components.customer.api.dtos.UpdateCustomerDto;
import com.edv.servicemanagement.components.customer.domain.entities.Customer;
import com.edv.servicemanagement.components.user.domain.entities.User;
import org.springframework.stereotype.Component;

@Component
public class CustomerMapper {

    public Customer createCustomerDtoToCustomer(CreateCustomerDto createCustomerDto) {
        Customer customer = new Customer();
        customer.setName(createCustomerDto.getName());
        customer.setPhone(createCustomerDto.getPhone());
        return customer;
    }

    public Customer updateCustomerDtoToCustomer(UpdateCustomerDto updateCustomerDto) {
        Customer customer = new Customer();
        customer.setId(updateCustomerDto.getId());
        customer.setName(updateCustomerDto.getName());
        customer.setPhone(updateCustomerDto.getPhone());
        return customer;
    }

    public CustomerDto customerToCustomerDto(Customer customer) {
        CustomerDto customerDto = new CustomerDto();
        customerDto.setId(customer.getId());
        customerDto.setName(customer.getName());
        customerDto.setPhone(customer.getPhone());
        return customerDto;
    }
}
