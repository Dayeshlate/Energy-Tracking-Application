package com.energytracker.energy_tracking_backend.controller;

import com.energytracker.energy_tracking_backend.model.EnergyType;
import com.energytracker.energy_tracking_backend.service.EnergyTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/energy-types")
@CrossOrigin(origins = "*")
public class EnergyTypeController {

    @Autowired
    private EnergyTypeService energyTypeService;

    @GetMapping
    public ResponseEntity<List<EnergyType>> getAllEnergyTypes() {
        return ResponseEntity.ok(energyTypeService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EnergyType> getEnergyTypeById(@PathVariable Long id) {
        return energyTypeService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<EnergyType> createEnergyType(@RequestBody EnergyType energyType) {
        EnergyType savedEnergyType = energyTypeService.save(energyType);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedEnergyType);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EnergyType> updateEnergyType(@PathVariable Long id, @RequestBody EnergyType energyType) {
        return energyTypeService.findById(id)
                .map(existingEnergyType -> {
                    energyType.setId(id);
                    return ResponseEntity.ok(energyTypeService.save(energyType));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEnergyType(@PathVariable Long id) {
        if (energyTypeService.findById(id).isPresent()) {
            energyTypeService.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
