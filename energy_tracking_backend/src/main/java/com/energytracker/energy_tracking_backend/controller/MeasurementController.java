package com.energytracker.energy_tracking_backend.controller;

import com.energytracker.energy_tracking_backend.model.Measurement;
import com.energytracker.energy_tracking_backend.service.MeasurementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/measurements")
@CrossOrigin(origins = "*")
public class MeasurementController {

    @Autowired
    private MeasurementService measurementService;

    @GetMapping
    public ResponseEntity<List<Measurement>> getAllMeasurements() {
        return ResponseEntity.ok(measurementService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Measurement> getMeasurementById(@PathVariable Long id) {
        return measurementService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Measurement> createMeasurement(@RequestBody Measurement measurement) {
        Measurement savedMeasurement = measurementService.save(measurement);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedMeasurement);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Measurement> updateMeasurement(@PathVariable Long id, @RequestBody Measurement measurement) {
        return measurementService.findById(id)
                .map(existingMeasurement -> {
                    measurement.setId(id);
                    return ResponseEntity.ok(measurementService.save(measurement));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMeasurement(@PathVariable Long id) {
        if (measurementService.findById(id).isPresent()) {
            measurementService.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/unit/{unit}")
    public ResponseEntity<List<Measurement>> getMeasurementsByUnit(@PathVariable String unit) {
        return ResponseEntity.ok(measurementService.findByUnit(unit));
    }
}
