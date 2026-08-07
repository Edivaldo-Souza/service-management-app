package com.edv.servicemanagement;

import com.edv.servicemanagement.commons.domain.services.InitialMetadaPopulationService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ServicemanagementApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServicemanagementApplication.class, args);
	}

	@Bean
	public CommandLineRunner commandLineRunner(
			InitialMetadaPopulationService populationService
	){
		return args -> {
			populationService.populateProductType();
		};
	}
}
