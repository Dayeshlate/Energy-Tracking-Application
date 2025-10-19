package com.energytracker.energy_tracking_backend.controller;

import com.energytracker.energy_tracking_backend.model.EnergyConsumption;
import com.energytracker.energy_tracking_backend.service.EnergyConsumptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/consumptions")
@CrossOrigin(origins = "*")
public class EnergyConsumptionController {

    @Autowired
    private EnergyConsumptionService energyConsumptionService;

    @GetMapping
    public ResponseEntity<List<EnergyConsumption>> getAllConsumptions() {
        return ResponseEntity.ok(energyConsumptionService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EnergyConsumption> getConsumptionById(@PathVariable Long id) {
        return energyConsumptionService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<EnergyConsumption> createConsumption(@RequestBody EnergyConsumption energyConsumption) {
        EnergyConsumption savedConsumption = energyConsumptionService.save(energyConsumption);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedConsumption);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EnergyConsumption> updateConsumption(@PathVariable Long id, @RequestBody EnergyConsumption energyConsumption) {
        return energyConsumptionService.findById(id)
                .map(existingConsumption -> {
                    energyConsumption.setId(id);
                    return ResponseEntity.ok(energyConsumptionService.save(energyConsumption));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteConsumption(@PathVariable Long id) {
        if (energyConsumptionService.findById(id).isPresent()) {
            energyConsumptionService.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/device/{deviceId}")
    public ResponseEntity<List<EnergyConsumption>> getConsumptionsByDevice(@PathVariable Long deviceId) {
        return ResponseEntity.ok(energyConsumptionService.findByDeviceId(deviceId));
    }

    @GetMapping("/device/{deviceId}/total")
    public ResponseEntity<Double> getTotalConsumptionByDevice(@PathVariable Long deviceId) {
        return ResponseEntity.ok(energyConsumptionService.getTotalConsumptionByDevice(deviceId));
    }

    @GetMapping("/date-range")
    public ResponseEntity<List<EnergyConsumption>> getConsumptionsByDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {
        return ResponseEntity.ok(energyConsumptionService.findByDateRange(startDate, endDate));
    }

    @GetMapping("/device/{deviceId}/date-range")
    public ResponseEntity<List<EnergyConsumption>> getConsumptionsByDeviceAndDateRange(
            @PathVariable Long deviceId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {
        return ResponseEntity.ok(energyConsumptionService.findByDeviceAndDateRange(deviceId, startDate, endDate));
    }
}
