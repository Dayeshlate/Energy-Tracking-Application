package com.energytracker.energy_tracking_backend.service;

import com.energytracker.energy_tracking_backend.model.EnergyType;
import com.energytracker.energy_tracking_backend.repository.EnergyTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EnergyTypeService {

    @Autowired
    private EnergyTypeRepository energyTypeRepository;

    public List<EnergyType> findAll() {
        return energyTypeRepository.findAll();
    }

    public Optional<EnergyType> findById(Long id) {
        return energyTypeRepository.findById(id);
    }

    public EnergyType save(EnergyType energyType) {
        return energyTypeRepository.save(energyType);
    }

    public void deleteById(Long id) {
        energyTypeRepository.deleteById(id);
    }
}
