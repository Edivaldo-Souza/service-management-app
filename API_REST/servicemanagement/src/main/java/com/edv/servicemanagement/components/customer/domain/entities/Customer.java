package com.edv.servicemanagement.components.customer.domain.entities;

import com.edv.servicemanagement.components.user.domain.entities.User;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "tb_customer")
@Data
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    private String name;

    private String phone;
}
