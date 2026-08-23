package com.edv.servicemanagement.components.files.domain.entities;

import com.edv.servicemanagement.components.user.domain.entities.User;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "tb_file")
@Data
public class File {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String type;

    @OneToOne
    private User user;
}
