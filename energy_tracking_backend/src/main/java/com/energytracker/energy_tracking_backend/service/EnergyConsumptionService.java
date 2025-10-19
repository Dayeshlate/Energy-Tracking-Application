package com.energytracker.energy_tracking_backend.service;

import com.energytracker.energy_tracking_backend.model.EnergyConsumption;
import com.energytracker.energy_tracking_backend.repository.EnergyConsumptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class EnergyConsumptionService {

    @Autowired
    private EnergyConsumptionRepository energyConsumptionRepository;

    public List<EnergyConsumption> findAll() {
        return energyConsumptionRepository.findAll();
    }

    public Optional<EnergyConsumption> findById(Long id) {
        return energyConsumptionRepository.findById(id);
    }

    public EnergyConsumption save(EnergyConsumption energyConsumption) {
        return energyConsumptionRepository.save(energyConsumption);
    }

    public void deleteById(Long id) {
        energyConsumptionRepository.deleteById(id);
    }

    public List<EnergyConsumption> findByDeviceId(Long deviceId) {
        return energyConsumptionRepository.findByDeviceId(deviceId);
    }

    public Double getTotalConsumptionByDevice(Long deviceId) {
        Double total = energyConsumptionRepository.getTotalConsumptionByDevice(deviceId);
        return total != null ? total : 0.0;
    }

    public List<EnergyConsumption> findByDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        return energyConsumptionRepository.findByRecordedAtBetween(startDate, endDate);
    }

    public List<EnergyConsumption> findByDeviceAndDateRange(Long deviceId, LocalDateTime startDate, LocalDateTime endDate) {
        return energyConsumptionRepository.findByDeviceAndDateRange(deviceId, startDate, endDate);
    }
}
