package com.edv.servicemanagement.components.demand.domain.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "tb_demand")
@Data
public class Demand {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;

    private Integer amount;

    @ManyToOne
    @JoinColumn(name = "product_type_id")
    private ProductType productType;

    @ManyToOne
    private DemandGroup demandGroup;

    private Double productLength;

    private Double productHeight;

    private BigDecimal value;

    private LocalDateTime created;

    private LocalDateTime updated;
}
