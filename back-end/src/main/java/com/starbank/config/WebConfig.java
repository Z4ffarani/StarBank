package com.starbank.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    private final String allowedOrigin = System.getenv().getOrDefault("FRONTEND_URL", "http://localhost:3000");

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        System.out.println("CORS allowed origin: " + allowedOrigin);

        registry.addMapping("/**")
                .allowedOrigins(allowedOrigin)
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*");
    }
}