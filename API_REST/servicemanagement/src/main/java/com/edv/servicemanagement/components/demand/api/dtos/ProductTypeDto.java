package com.edv.servicemanagement.components.demand.api.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ProductTypeDto {
    private Long id;
    private String name;
    private Double price;
}
