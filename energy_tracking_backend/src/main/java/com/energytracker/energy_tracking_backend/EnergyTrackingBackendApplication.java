package com.energytracker.energy_tracking_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EnergyTrackingBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(EnergyTrackingBackendApplication.class, args);
        System.out.println("\n✅ Energy Tracking Backend is running on http://localhost:8080");
        System.out.println("📊 Swagger UI (if configured): http://localhost:8080/swagger-ui.html\n");
    }
}
