package com.edv.servicemanagement.components.authentication.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsGlobalConfig {

    @Value("${api.security.cors.allowed-origin}")
    private String allowedOrigin;

    @Configuration
    public class WebConfig implements WebMvcConfigurer{
        public void addCorsMappings(CorsRegistry corsRegistry){
            corsRegistry.addMapping("/**")
                    .allowedHeaders("*")
                    .allowedOriginPatterns(allowedOrigin)
                    .allowCredentials(true);
        }
    }
}
