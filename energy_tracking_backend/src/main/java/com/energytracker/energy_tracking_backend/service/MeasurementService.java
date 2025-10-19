package com.energytracker.energy_tracking_backend.service;

import com.energytracker.energy_tracking_backend.model.Measurement;
import com.energytracker.energy_tracking_backend.repository.MeasurementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MeasurementService {

    @Autowired
    private MeasurementRepository measurementRepository;

    public List<Measurement> findAll() {
        return measurementRepository.findAll();
    }

    public Optional<Measurement> findById(Long id) {
        return measurementRepository.findById(id);
    }

    public Measurement save(Measurement measurement) {
        return measurementRepository.save(measurement);
    }

    public void deleteById(Long id) {
        measurementRepository.deleteById(id);
    }

    public List<Measurement> findByUnit(String unit) {
        return measurementRepository.findByUnit(unit);
    }
}
