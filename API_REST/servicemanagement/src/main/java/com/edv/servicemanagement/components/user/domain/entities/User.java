package com.edv.servicemanagement.components.user.domain.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "tb_user")
@Data
public class User {

    @Id
    private Long id;

    private String name;

    private String password;

    private String email;

}
