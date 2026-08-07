package com.edv.servicemanagement.commons.domain.services;

import com.edv.servicemanagement.components.demand.domain.entities.ProductType;
import com.edv.servicemanagement.components.demand.domain.repositories.ProductTypeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class InitialMetadaPopulationService {

    private final ProductTypeRepository productTypeRepository;

    public void populateProductType(){

        if(productTypeRepository.count()<1){
            List<ProductType> productTypeList = new ArrayList<>();
            productTypeList.add(new ProductType("Adesivo VINIL SEM recorte",true,40D));
            productTypeList.add(new ProductType("Adesivo VINIL COM recorte",true,45D));
            productTypeList.add(new ProductType("Adesivo VINIL promocional SEM recorte",true,35D));
            productTypeList.add(new ProductType("Adesivo VINIL promocional COM recorte",true,40D));
            productTypeList.add(new ProductType("Adesivo TRANSPARENTE SEM recorte",true,45D));
            productTypeList.add(new ProductType("Adesivo TRANSPARENTE COM recorte",true,50D));
            productTypeList.add(new ProductType("Adesivo BLACKOUT SEM recorte",true,45D));
            productTypeList.add(new ProductType("Adesivo BLACKOUT COM recorte",true,50D));
            productTypeList.add(new ProductType("Adesivo PERFURADO",true,60D));
            productTypeList.add(new ProductType("Banner lona",true,60D));
            productTypeList.add(new ProductType("Lona",true,40D));
            productTypeList.add(new ProductType("Banner papel",true,25D));
            productTypeList.add(new ProductType("Papel",true,25D));

            productTypeRepository.saveAll(productTypeList);
        }
    }

}
