package com.energytracker.energy_tracking_backend.controller;

import com.energytracker.energy_tracking_backend.model.Device;
import com.energytracker.energy_tracking_backend.model.DeviceStats;
import com.energytracker.energy_tracking_backend.service.DeviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/devices")
@CrossOrigin(origins = "*")
public class DeviceController {

    @Autowired
    private DeviceService deviceService;

    @GetMapping
    public ResponseEntity<List<Device>> getAllDevices() {
        return ResponseEntity.ok(deviceService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Device> getDeviceById(@PathVariable Long id) {
        return deviceService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Device> createDevice(@RequestBody Device device) {
        Device savedDevice = deviceService.save(device);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedDevice);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Device> updateDevice(@PathVariable Long id, @RequestBody Device device) {
        return deviceService.findById(id)
                .map(existingDevice -> {
                    device.setId(id);
                    return ResponseEntity.ok(deviceService.save(device));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDevice(@PathVariable Long id) {
        if (deviceService.findById(id).isPresent()) {
            deviceService.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/location/{locationId}")
    public ResponseEntity<List<Device>> getDevicesByLocation(@PathVariable Long locationId) {
        return ResponseEntity.ok(deviceService.findByLocationId(locationId));
    }

    @GetMapping("/energy-type/{energyTypeId}")
    public ResponseEntity<List<Device>> getDevicesByEnergyType(@PathVariable Long energyTypeId) {
        return ResponseEntity.ok(deviceService.findByEnergyTypeId(energyTypeId));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Device>> getDevicesByStatus(@PathVariable String status) {
        try {
            Device.DeviceStatus deviceStatus = Device.DeviceStatus.valueOf(status.toUpperCase());
            return ResponseEntity.ok(deviceService.findByStatus(deviceStatus));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/stats")
    public ResponseEntity<DeviceStats> getDeviceStats() {
        return ResponseEntity.ok(deviceService.getDeviceStats());
    }
}
