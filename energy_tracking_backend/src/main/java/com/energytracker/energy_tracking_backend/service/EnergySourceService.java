package com.energytracker.energy_tracking_backend.service;

import com.energytracker.energy_tracking_backend.model.EnergySource;
import com.energytracker.energy_tracking_backend.repository.EnergySourceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EnergySourceService {

    @Autowired
    private EnergySourceRepository energySourceRepository;

    public List<EnergySource> findAll() {
        return energySourceRepository.findAll();
    }

    public Optional<EnergySource> findById(Long id) {
        return energySourceRepository.findById(id);
    }

    public EnergySource save(EnergySource energySource) {
        return energySourceRepository.save(energySource);
    }

    public void deleteById(Long id) {
        energySourceRepository.deleteById(id);
    }

    public List<EnergySource> findByEnergyTypeId(Long energyTypeId) {
        return energySourceRepository.findByEnergyTypeId(energyTypeId);
    }
}
