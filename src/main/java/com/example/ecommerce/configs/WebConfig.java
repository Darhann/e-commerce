package com.example.ecommerce.configs;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Разрешаем CORS для всех путей в приложении
                .allowedOrigins("http://localhost:3000") // Указываем домен вашего фронтенда
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Разрешаем все основные HTTP-методы
                .allowedHeaders("*") // Разрешаем все заголовки
                .allowCredentials(true); // Разрешаем передачу cookie и заголовков авторизации
    }
}