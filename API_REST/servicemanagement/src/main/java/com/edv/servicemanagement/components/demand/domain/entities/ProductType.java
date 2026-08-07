package com.edv.servicemanagement.components.demand.domain.entities;

import com.edv.servicemanagement.commons.domain.entities.Category;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name = "tb_product_type")
@Getter
@Setter
@NoArgsConstructor
public class ProductType extends Category {

    public ProductType(String name, Boolean isOutsourced, Double value){
        this.name  = name;
        this.isOutsourced = isOutsourced;
        this.value = value;
    }

    private Boolean isOutsourced;
    private Double value;
}
