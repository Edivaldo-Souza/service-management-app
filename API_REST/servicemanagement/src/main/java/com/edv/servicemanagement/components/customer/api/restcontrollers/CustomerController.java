package com.edv.servicemanagement.components.customer.api.restcontrollers;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.edv.servicemanagement.commons.ApiResponse;
import com.edv.servicemanagement.commons.ResponseUtil;
import com.edv.servicemanagement.components.authentication.services.TokenService;
import com.edv.servicemanagement.components.customer.api.dtos.CreateCustomerDto;
import com.edv.servicemanagement.components.customer.api.dtos.CustomerDto;
import com.edv.servicemanagement.components.customer.api.dtos.UpdateCustomerDto;
import com.edv.servicemanagement.components.customer.api.mappers.CustomerMapper;
import com.edv.servicemanagement.components.customer.domain.entities.Customer;
import com.edv.servicemanagement.components.customer.domain.services.CustomerServiceImpl;
import com.edv.servicemanagement.components.user.domain.entities.User;
import com.edv.servicemanagement.components.user.domain.services.UserService;
import com.edv.servicemanagement.components.user.domain.services.UserServiceImpl;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("v1/customer")
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerMapper customerMapper;
    private final CustomerServiceImpl customerService;
    private final TokenService tokenService;
    private final UserServiceImpl userService;

    @PostMapping
    private ResponseEntity<ApiResponse<CustomerDto>> create(HttpServletRequest request,
        @RequestBody CreateCustomerDto dto,
        @CookieValue("accessToken") String token) {

        Customer customer = customerMapper.createCustomerDtoToCustomer(dto);

        User currentUser = userService.getByToken(token);

        Customer newCustomer = customerService.create(customer, currentUser);
        CustomerDto newCustomerDto = customerMapper.customerToCustomerDto(newCustomer);
        ApiResponse<CustomerDto> response = ResponseUtil.success(newCustomerDto, "Customer created", request.getRequestURI());
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    private ResponseEntity<ApiResponse<CustomerDto>> getById(HttpServletRequest request, @PathVariable Long id) {
        Customer customer = customerService.getById(id);
        CustomerDto customerDto = customerMapper.customerToCustomerDto(customer);
        ApiResponse<CustomerDto> response = ResponseUtil.success(customerDto, "Customer found", request.getRequestURI());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/user")
    private ResponseEntity<ApiResponse<List<CustomerDto>>> getByUser(
            HttpServletRequest request,
            @CookieValue("accessToken") String token) {

        User currentUser = userService.getByToken(token);

        List<Customer> customers = customerService.getByUserId(currentUser.getId());

        List<CustomerDto> customerDtos = customers.stream()
                .map(customerMapper::customerToCustomerDto)
                .toList();

        ApiResponse<List<CustomerDto>> response = ResponseUtil.success(customerDtos, "Customers found", request.getRequestURI());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping
    private ResponseEntity<ApiResponse<CustomerDto>> update(
            HttpServletRequest request,
            @RequestBody UpdateCustomerDto dto,
            @CookieValue("accessToken") String token) {

        Customer customer = customerMapper.updateCustomerDtoToCustomer(dto);

        User currentUser = userService.getByToken(token);

        Customer updatedCustomer = customerService.update(customer,currentUser);

        CustomerDto updatedCustomerDto = customerMapper.customerToCustomerDto(updatedCustomer);
        ApiResponse<CustomerDto> response = ResponseUtil.success(updatedCustomerDto, "Customer updated", request.getRequestURI());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    private ResponseEntity<ApiResponse<Void>> delete(HttpServletRequest request, @PathVariable Long id) {
        customerService.delete(id);
        ApiResponse<Void> response = ResponseUtil.success(null, "Customer deleted", request.getRequestURI());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
