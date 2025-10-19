package com.energytracker.energy_tracking_backend.controller;

import com.energytracker.energy_tracking_backend.model.EnergySource;
import com.energytracker.energy_tracking_backend.service.EnergySourceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/energy-sources")
@CrossOrigin(origins = "*")
public class EnergySourceController {

    @Autowired
    private EnergySourceService energySourceService;

    @GetMapping
    public ResponseEntity<List<EnergySource>> getAllEnergySources() {
        return ResponseEntity.ok(energySourceService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EnergySource> getEnergySourceById(@PathVariable Long id) {
        return energySourceService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<EnergySource> createEnergySource(@RequestBody EnergySource energySource) {
        EnergySource savedEnergySource = energySourceService.save(energySource);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedEnergySource);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EnergySource> updateEnergySource(@PathVariable Long id, @RequestBody EnergySource energySource) {
        return energySourceService.findById(id)
                .map(existingEnergySource -> {
                    energySource.setId(id);
                    return ResponseEntity.ok(energySourceService.save(energySource));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEnergySource(@PathVariable Long id) {
        if (energySourceService.findById(id).isPresent()) {
            energySourceService.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/energy-type/{energyTypeId}")
    public ResponseEntity<List<EnergySource>> getEnergySourcesByType(@PathVariable Long energyTypeId) {
        return ResponseEntity.ok(energySourceService.findByEnergyTypeId(energyTypeId));
    }
}
