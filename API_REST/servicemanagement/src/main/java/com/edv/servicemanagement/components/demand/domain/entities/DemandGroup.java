package com.edv.servicemanagement.components.demand.domain.entities;

import com.edv.servicemanagement.components.customer.domain.entities.Customer;
import jakarta.persistence.*;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "tb_demand_group")
@Data
public class DemandGroup {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @OneToMany(mappedBy = "demandGroup", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Demand> demands;

    private BigDecimal reducedValue;

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime created;

    private LocalDateTime updated;

    private LocalDateTime closed;

}
